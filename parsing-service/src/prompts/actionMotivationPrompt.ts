import { StoryContext } from "../types";
import { functional } from "./functional";
import { narrationStyles } from "./styles";

export const actionMotivationPrompt = (context: StoryContext, actions: string) => {
  return `${functional.storyContext(context)}
${narrationStyles.protagonist}
Given the following actions that are available to you:
${actions}
Describe in first person why you are considering each action.
${functional.commaSeparatedList}`;
};
