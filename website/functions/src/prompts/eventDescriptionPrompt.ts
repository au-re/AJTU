import { StoryContext } from "../types";
import { storyContext } from "./storyContext";
import { instructions, narrationStyles, storyTypes, tone } from "./styles";

// TODO: we could pass specific constraints for what could possibly happen next

export const eventDescriptionPrompt = (context: StoryContext, action: string) => {
  return `${narrationStyles.secondPerson}
${storyTypes.scifi}
${tone.suspense}
${storyContext(context)}

Lastly, the protagonist did the following action:
${action}.

Describe what happens next in the story, within a paragraph of 80 words or less.
${instructions.avoid}`;
};
