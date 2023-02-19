import { StoryContext } from "../types";

export const storyContext = ({ protagonist = "", summary = "" }: StoryContext) => `${
  protagonist &&
  `The protagonist of the story is:
${protagonist}.`
}
${
  summary &&
  `Previously, the following events have unfolded:
${summary}.`
}`;
