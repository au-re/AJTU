import { storyTypes, tone } from "./styles";

export const eventScenePrompt = (narration: string) => {
  return `${storyTypes.scifi}
${narration}
Describe the scene above for an image generator in a few words. 
${tone.neutral}`;
};
