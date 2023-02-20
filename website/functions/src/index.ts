import cors from "cors";
import express, { Request } from "express";
import * as functions from "firebase-functions";
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

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

/**
 * This endpoint is used create a new chapter of the story, given an action taken by the protagonist
 * and the events that have happened so far.
 *
 */
app.post("/chapter", async (req: Request<any, any, PostChapterBody>, res) => {
  const { action, protagonist, events, currentChapterNumber, path } = req.body;

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

  res.send({
    chapterNumber: currentChapterNumber + 1,
    imageUrl,
    actions,
    eventDescription: trimIncompleteSentence(eventDescription),
    eventTitle: eventTitle.replace(/"/g, ""),
    scenePrompt,
    original: {
      actionNarrations,
      actionMotivations,
      eventDescription,
      availableActions,
    },
  });
});

/**
 * This endpoint is used to create a conclusion for the story, given the events that have happened
 *
 */
app.post("/conclusion", async (req: Request<any, any, PostConclusionBody>, res) => {
  const { protagonist, events, conclusion } = req.body;
  const storyContext: StoryContext = { protagonist, summary: events.join("\n") };

  const text = await createCompletion(conclusionDescriptionPrompt(storyContext, conclusion));
  const scenePrompt = await createCompletion(eventScenePrompt(text));
  const imageUrl = await createImage(imagePrompt(scenePrompt));

  res.send({ text, imageUrl, conclusion });
});

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

const api = functions.https.onRequest(app);

module.exports = { api };
