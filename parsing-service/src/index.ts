import express, { Request } from "express";
import { createCompletion, createImage } from "./openai";
import { placeholderActions, placeholderContext, placeholderLastEvent } from "./placeholders";
import { actionMotivationPrompt } from "./prompts/actionMotivationPrompt";
import { actionNarrationPrompt } from "./prompts/actionNarrationPrompt";
import { availableActionsPrompt } from "./prompts/availableActionsPrompt";
import { eventDescriptionPrompt } from "./prompts/eventDescriptionPrompt";
import { eventScenePrompt } from "./prompts/eventScenePrompt";
import { imagePrompt } from "./prompts/imagePrompt";
import { GetChapterRequest } from "./types";

const app = express();
const port = 8080;

app.get("/chapter/image", (req, res) => {
  res.send("Hello World!");
});

// TESTING IMAGE PROMPTS
app.get("/chapter", async (req: Request<GetChapterRequest>, res) => {
  const description = await createCompletion(eventScenePrompt(placeholderLastEvent));
  const image = await createImage(imagePrompt(description));
  res.send({ prompt: imagePrompt(description), image });
});

app.get("/prompts", async (req: Request<GetChapterRequest>, res) => {
  res.send({
    eventDescriptionPrompt: eventDescriptionPrompt(placeholderContext),
    availableActionsPrompt: availableActionsPrompt(placeholderContext),
    actionMotivationPrompt: actionMotivationPrompt(placeholderContext, placeholderActions),
    actionNarrationPrompt: actionNarrationPrompt(placeholderContext, placeholderActions),
    eventScenePrompt: eventScenePrompt(placeholderLastEvent),
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
