import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import cors from "cors";
import express, { Request } from "express";
import * as functions from "firebase-functions";
import { Chapter, Conclusion } from "../../src/state/types";
import { db } from "./firebase";
import { createCompletion, createImage } from "./openai";
import { placeholderAction, placeholderActions, placeholderContext, placeholderLastEvent } from "./placeholders";
import { actionMotivationPrompt } from "./prompts/actionMotivationPrompt";
import { actionNarrationPrompt } from "./prompts/actionNarrationPrompt";
import { availableActionsPrompt } from "./prompts/availableActionsPrompt";
import { conclusionDescriptionPrompt } from "./prompts/conclusionDescriptionPrompt";
import { eventDescriptionPrompt } from "./prompts/eventDescriptionPrompt";
import { eventScenePrompt } from "./prompts/eventScenePrompt";
import { eventTitlePrompt } from "./prompts/eventTitlePrompt";
import { imagePrompt } from "./prompts/imagePrompt";
import { getActionsFromStoryManager } from "./storyManager.ts/getActionsFromStoryManager";
import { PostChapterBody, PostConclusionBody, StoryContext } from "./types";
import { splitCommaSeparatedString } from "./utils/splitCommaSeparatedString";
import { trimIncompleteSentence } from "./utils/trimIncompleteSentence";
import { uploadImageFromUrl } from "./utils/uploadImageFromUrl";

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
 * TODO: split this function so the different requests can resolve sooner
 */
app.post("/chapter", async (req: Request<any, any, PostChapterBody>, res) => {
  const { action, protagonist, events, currentChapterNumber, path } = req.body;

  const storedChapter = await db.collection("chapters").doc(path).get();

  if (storedChapter.exists) {
    const { chapter, original } = storedChapter.data() as { chapter: Chapter; original: any };
    res.send({
      chapterNumber: chapter?.chapterNumber,
      imageUrl: chapter?.imageUrl,
      actions: chapter?.actions,
      eventDescription: chapter?.text,
      eventTitle: chapter?.title,
      scenePrompt: chapter?.imageCaption,
      original,
    });
    return;
  }

  const storyContext: StoryContext = { protagonist, summary: events.join("\n") };

  const eventDescription = await createCompletion(eventDescriptionPrompt(storyContext, action));

  const [availableActions, eventTitle, scenePrompt] = await Promise.all([
    createCompletion(availableActionsPrompt({ ...storyContext, summary: [...events, eventDescription].join("\n") })),
    createCompletion(eventTitlePrompt(eventDescription)),
    createCompletion(eventScenePrompt(eventDescription)),
  ]);

  const [actionNarrations, actionMotivations, imageUrl] = await Promise.all([
    createCompletion(actionNarrationPrompt(storyContext, availableActions)),
    createCompletion(actionMotivationPrompt(storyContext, availableActions)),
    createImage(imagePrompt(scenePrompt)),
  ]);

  const actionList = splitCommaSeparatedString(availableActions).map((availableAction, index) => ({
    name: availableAction,
    narration: splitCommaSeparatedString(actionNarrations)[index],
    motivation: splitCommaSeparatedString(actionMotivations)[index],
  }));

  const actions = getActionsFromStoryManager(currentChapterNumber, actionList);
  const text = trimIncompleteSentence(eventDescription);
  const title = eventTitle.replace(/"/g, "");
  const chapterNumber = currentChapterNumber + 1;
  const chapter: Chapter = {
    actions,
    chapterNumber,
    text,
    imageUrl,
    imageCaption: scenePrompt,
    title,
  };
  const original = {
    actionNarrations,
    actionMotivations,
    eventDescription,
    availableActions,
  };

  // TODO: cleanup this API
  res.send({
    chapterNumber,
    imageUrl,
    actions,
    eventDescription: text,
    eventTitle: title,
    scenePrompt,
    original,
  });

  const cacheURL = await uploadImageFromUrl(imageUrl, `chapters/${path}.png`);

  db.collection("chapters")
    .doc(path)
    .set({ chapter: { ...chapter, imageUrl: cacheURL }, original });
});

/**
 * This endpoint is used to create a conclusion for the story, given the events that have happened
 */
app.post("/conclusion", async (req: Request<any, any, PostConclusionBody>, res) => {
  const { protagonist, events, conclusion, path } = req.body;
  const storyContext: StoryContext = { protagonist, summary: events.join("\n") };

  const storedConclusion = await db.collection("conclusions").doc(path).get();

  if (storedConclusion.exists) {
    const { conclusion } = storedConclusion.data() as { conclusion: Conclusion };
    res.send(conclusion);
    return;
  }

  const text = await createCompletion(conclusionDescriptionPrompt(storyContext, conclusion));
  const scenePrompt = await createCompletion(eventScenePrompt(text));
  const imageUrl = await createImage(imagePrompt(scenePrompt));

  res.send({ text, imageUrl, conclusion });

  const cacheURL = await uploadImageFromUrl(imageUrl, `conclusions/${path}.png`);

  db.collection("conclusions")
    .doc(path)
    .set({ conclusion: { text, imageUrl: cacheURL, conclusion } });
});

/**
 * this endpoint is used for debugging purposes, to see what the prompts look like
 */
app.get("/prompts", async (req, res) => {
  res.send({
    eventDescriptionPrompt: eventDescriptionPrompt(placeholderContext, placeholderAction),
    availableActionsPrompt: availableActionsPrompt(placeholderContext),
    actionMotivationPrompt: actionMotivationPrompt(placeholderContext, placeholderActions),
    actionNarrationPrompt: actionNarrationPrompt(placeholderContext, placeholderActions),
    eventScenePrompt: eventScenePrompt(placeholderLastEvent),
    eventTitlePrompt: eventTitlePrompt(placeholderLastEvent),
  });
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(Sentry.Handlers.errorHandler());

const api = functions.https.onRequest(app);

module.exports = { api };
