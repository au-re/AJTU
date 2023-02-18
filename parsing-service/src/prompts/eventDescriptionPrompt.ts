import { StoryContext } from "../types";
import { functional } from "./functional";
import { narrationStyles, storyTypes, tone, writingStyle } from "./styles";

// TODO: we could pass specific constraints for what could possibly happen next

export const eventDescriptionPrompt = (context: StoryContext) => {
  return `${narrationStyles.narrator}
${storyTypes.scifi}
${tone.suspense}
${writingStyle.asimov}
${functional.storyContext(context)}
Describe what happens next in the story, within a paragraph of 80 words or less.`;
};
