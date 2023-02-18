import { StoryContext } from "../types";
import { functional } from "./functional";

export const availableActionsPrompt = (context: StoryContext) => {
  return `${functional.storyContext(context)}
Given what just happened, what actions are available to the protagonist?
Create up to 4 concrete actions that the protagonist can take next.
${functional.commaSeparatedList}
${functional.shortDescription}`;
};
