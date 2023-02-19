import { imageStyles, storyTypes, tone } from "./styles";

export const imagePrompt = (description: string) => {
  return `${description} ${imageStyles.scifi} ${imageStyles.digital} stanley kubrick`;
};
