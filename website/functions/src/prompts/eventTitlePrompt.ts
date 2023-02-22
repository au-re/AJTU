import { writingStyle } from "./styles";

export const eventTitlePrompt = (narration: string) => {
  return `Write a title for the scene below, the title should be a single sentence.
${writingStyle.neruda}

Scene: """
${narration}
"""

A:`;
};
