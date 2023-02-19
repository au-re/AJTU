import cors from "cors";
import express, { Request } from "express";
import { createCompletion, createImage } from "./openai";
import {
  placeholderAction,
  placeholderActions,
  placeholderContext,
  placeholderLastEvent,
  placeholderNarration,
  placeholderScenePrompt,
} from "./placeholders";
import { actionMotivationPrompt } from "./prompts/actionMotivationPrompt";
import { actionNarrationPrompt } from "./prompts/actionNarrationPrompt";
import { availableActionsPrompt } from "./prompts/availableActionsPrompt";
import { eventDescriptionPrompt } from "./prompts/eventDescriptionPrompt";
import { eventScenePrompt } from "./prompts/eventScenePrompt";
import { eventTitlePrompt } from "./prompts/eventTitlePrompt";
import { imagePrompt } from "./prompts/imagePrompt";
import { GetChapterRequest, StoryContext } from "./types";
import { splitCommaSeparatedString } from "./utils/splitCommaSeparatedString";
import { splitMapSentence } from "./utils/splitMapSentence";
import { trimIncompleteSentence } from "./utils/trimIncompleteSentence";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// TODO: IMPORTANT, add a caching layer to avoid hitting the OpenAI API too much
// TODO: download image (url is only available for an hour)

app.get("/test", async (req, res) => {
  res.send({ original: placeholderNarration, text: splitMapSentence(placeholderNarration) });
});

app.get("/test/image", async (req, res) => {
  res.send({
    prompt: imagePrompt(placeholderScenePrompt),
    imageUrl: await createImage(imagePrompt(placeholderScenePrompt)),
  });
});

/**
 * This endpoint is used create a new chapter of the story, given an action taken by the protagonist
 * and the events that have happened so far.
 *
 */
app.post("/chapter", async (req: Request<GetChapterRequest>, res) => {
  const { action, protagonist, events } = req.body;
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

  res.send({
    imageUrl,
    eventTitle: eventTitle.replace(/"/g, ""),
    scenePrompt,
    original: {
      actionNarrations,
      actionMotivations,
      eventDescription,
      availableActions,
    },
    actionNarrations: splitCommaSeparatedString(actionNarrations),
    actionMotivations: splitCommaSeparatedString(actionMotivations),
    eventDescription: trimIncompleteSentence(eventDescription),
    availableActions: splitCommaSeparatedString(availableActions),
  });
});

app.get("/prompts", async (req: Request<GetChapterRequest>, res) => {
  res.send({
    eventDescriptionPrompt: eventDescriptionPrompt(placeholderContext, placeholderAction),
    availableActionsPrompt: availableActionsPrompt(placeholderContext),
    actionMotivationPrompt: actionMotivationPrompt(placeholderContext, placeholderActions),
    actionNarrationPrompt: actionNarrationPrompt(placeholderContext, placeholderActions),
    eventScenePrompt: eventScenePrompt(placeholderLastEvent),
    eventTitlePrompt: eventTitlePrompt(placeholderLastEvent),
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
