import { StoryContext } from "../types";
import { storyContext } from "./storyContext";
import { instructions, narrationStyles, storyTypes, tone } from "./styles";

export const actionNarrationPrompt = (context: StoryContext, actions: string) => {
  return `${narrationStyles.narrator}
${storyTypes.scifi}
${tone.suspense}
${storyContext(context)}
Given the following actions that the protagonist can take next:
${actions}
Narrate from the point of view of the protagonist in a short sentence what the protagonist is thinking when performing each action.
Write each of your answers on a new line.`;
};
