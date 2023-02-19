import { StoryContext } from "../types";
import { storyContext } from "./storyContext";
import { instructions } from "./styles";

export const availableActionsPrompt = (context: StoryContext) => {
  return `${storyContext(context)}
Given what just happened, what actions are available to the protagonist?
Create up to 4 concrete actions that the protagonist can take next.
${instructions.commaSeparatedList}
${instructions.shortDescription}`;
};
