import { StoryContext } from "../types";
import { storyContext } from "./storyContext";
import { instructions, narrationStyles } from "./styles";

export const actionMotivationPrompt = (context: StoryContext, actions: string) => {
  return `${storyContext(context)}
${narrationStyles.protagonist}
Given the following actions that are available to you:
${actions}
Describe in first person why you are considering each action.
${instructions.commaSeparatedList}`;
};
