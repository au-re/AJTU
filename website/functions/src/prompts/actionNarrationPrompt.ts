import { StoryContext } from "../types";
import { storyContext } from "./storyContext";
import { narrationStyles, storyTypes, tone } from "./styles";

export const actionNarrationPrompt = (context: StoryContext, actions: string) => {
  return `${narrationStyles.narrator}
${storyTypes.scifi}
${tone.suspense}
${storyContext(context)}
Given the following actions that the protagonist can take next:
${actions}
Narrate from what the protagonist is doing for each action in a few sentences.
Write each of your answers on a new line.`;
};
