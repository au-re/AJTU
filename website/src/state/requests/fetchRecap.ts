import { Recap } from "../GameContext";
import { placeholderRecap } from "../placeholders";

export const fetchRecap = (): Promise<Recap> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // a recap of the adventure so far
      resolve(placeholderRecap);
    }, 1000);
  });
};
