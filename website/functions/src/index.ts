import "dotenv/config";

import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import cors from "cors";
import express, { Request } from "express";
import * as functions from "firebase-functions";
import { Action, Chapter, Conclusion } from "../../src/state/types";
import { db } from "./firebase";
import { createImage } from "./openai";
import { generateConclusion, generateScene } from "./ps";
import { PostChapterBody, PostConclusionBody } from "./types";
import { uploadImageFromUrl } from "./utils/uploadImageFromUrl";

interface NextChapterResponse {
  imageUrl: string;
  eventTitle: string;
  scenePrompt: string;
  actions: Action[];
  eventDescription: string;
}

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new Sentry.Integrations.Http({ tracing: true }), new Tracing.Integrations.Express({ app })],
  tracesSampleRate: 1.0,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

/**
 * This endpoint is used create a new chapter of the story, given an action taken by the protagonist
 * and the events that have happened so far.
 *
 */
app.post("/chapter", async (req: Request<any, any, PostChapterBody>, res) => {
  const { action, events, path } = req.body;

  const storedChapter = await db.collection("chapters").doc(path).get();

  // remove cache
  if (storedChapter.exists) {
    const { chapter, original } = storedChapter.data() as { chapter: Chapter; original: any };
    res.send({
      imageUrl: chapter?.image_url,
      actions: chapter?.actions,
      eventDescription: chapter?.text,
      eventTitle: chapter?.title,
      scenePrompt: chapter?.image_caption,
      original,
    });
    return;
  }

  try {
    const { scene_title, scene_description, actions, image_description } = await generateScene({
      previous_scene: events.join("\n"),
      last_action: action,
    });

    const image_url = image_description ? await createImage(image_description) : "";

    const chapter: Chapter = {
      actions,
      text: scene_description,
      image_url,
      image_caption: image_description,
      title: scene_title,
    };

    res.send({
      imageUrl: image_url,
      actions,
      eventDescription: scene_description,
      eventTitle: scene_title,
      scenePrompt: image_description,
    } as NextChapterResponse);

    const cacheURL = await uploadImageFromUrl(image_url, `chapters/${path}.png`);

    db.collection("chapters")
      .doc(path)
      .set({ chapter: { ...chapter, image_url: cacheURL } });
  } catch (e) {
    res.status(500).send({ e });
  }
});

/**
 * This endpoint is used to create a conclusion for the story, given the events that have happened
 */
app.post("/conclusion", async (req: Request<any, any, PostConclusionBody>, res) => {
  const { events, path } = req.body;

  const storedConclusion = await db.collection("conclusions").doc(path).get();

  if (storedConclusion.exists) {
    const { conclusion } = storedConclusion.data() as { conclusion: Conclusion };
    res.send(conclusion);
    return;
  }

  const { conclusion_scene, image_description, conclusion_type } = await generateConclusion({
    story: events.join("\n"),
  });

  const text = conclusion_scene;

  const image_url = await createImage(image_description);

  res.send({ text, image_url, conclusion: conclusion_type });

  const cacheURL = await uploadImageFromUrl(image_url, `conclusions/${path}.png`);

  db.collection("conclusions")
    .doc(path)
    .set({ conclusion: { text, image_url: cacheURL, conclusion: conclusion_type } });
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(Sentry.Handlers.errorHandler());

const api = functions.https.onRequest(app);

module.exports = { api };
