import { Chapter } from "../GameContext";
import { placeholderChapters } from "../placeholders";

// in the future we should pass current game state to generate a prompt to create a new chapter
export const fetchChapter = (index: number): Promise<Chapter> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        placeholderChapters[index] || placeholderChapters[Math.floor(Math.random() * placeholderChapters.length)]
      );
    }, 1000);
  });
};
