import { StoryContext } from "../types";

export const functional = {
  commaSeparatedList: "Write your answers in a comma separated list.",
  shortDescription: "Keep the description of each action short and to the point.",
  storyContext: ({ protagonist = "", summary = "", lastEvent = "" }: StoryContext) => `${
    protagonist &&
    `The protagonist of the story is:
${protagonist}.`
  }
  ${
    summary &&
    `Previously, the following events have unfolded:
${summary}.`
  }
  ${
    lastEvent &&
    `The last thing that happened was:
${lastEvent}.`
  }`,
};
