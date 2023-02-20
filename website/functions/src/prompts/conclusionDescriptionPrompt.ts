import { ConclusionType } from "../../../src/state/types";
import { StoryContext } from "../types";
import { storyContext } from "./storyContext";
import { narrationStyles, storyTypes, tone } from "./styles";

export const conclusionDescriptionPrompt = (context: StoryContext, conclusion: ConclusionType) => {
  return `${narrationStyles.secondPerson}
${storyTypes.scifi}
${tone.suspense}
${storyContext(context)}

Write a paragraph concluding the story. The story ending should be ${conclusion}.`;
};
