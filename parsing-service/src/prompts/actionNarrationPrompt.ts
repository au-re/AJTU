import { StoryContext } from "../types";
import { functional } from "./functional";
import { narrationStyles, storyTypes, tone, writingStyle } from "./styles";

export const actionNarrationPrompt = (context: StoryContext, actions: string) => {
  return `${narrationStyles.narrator}
${storyTypes.scifi}
${tone.suspense}
${writingStyle.asimov}
${functional.storyContext(context)}
Given the following actions that the protagonist can take next:
${actions}
Narrate from the point of view of the protagonist in a short sentence what the protagonist is thinking when performing each action.
${functional.commaSeparatedList}`;
};
