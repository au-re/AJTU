import { getRandomElement } from "../utils/getRandomElement";
import { MAX_CHAPTERS, possibleConclusions } from "./constants";
import { Action, ConclusionType } from "../../../src/state/types";

/**
 * Based on the current chapter number, enhance the available actions with a conclusion
 *
 */
export function getActionsFromStoryManager(chapterNumber: number, availableActions: Action[]) {
  if (chapterNumber >= MAX_CHAPTERS) {
    return availableActions.map((action) => ({
      ...action,
      conclusion: getRandomElement<ConclusionType>(possibleConclusions),
    }));
  }
  return availableActions;
}
