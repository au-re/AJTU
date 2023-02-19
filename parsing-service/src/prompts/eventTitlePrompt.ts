import { instructions } from "./styles";

export const eventTitlePrompt = (narration: string) => {
  return `${narration}
Write a short title for the scene above.
${instructions.avoid}
${instructions.shortDescription}`;
};
