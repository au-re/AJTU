import cors from "cors";
import express from "express";
import functions from "firebase-functions";
import { placeholderAction, placeholderActions, placeholderContext, placeholderLastEvent } from "./placeholders";
import { actionMotivationPrompt } from "./prompts/actionMotivationPrompt";
import { actionNarrationPrompt } from "./prompts/actionNarrationPrompt";
import { availableActionsPrompt } from "./prompts/availableActionsPrompt";
import { eventDescriptionPrompt } from "./prompts/eventDescriptionPrompt";
import { eventScenePrompt } from "./prompts/eventScenePrompt";
import { eventTitlePrompt } from "./prompts/eventTitlePrompt";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

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
