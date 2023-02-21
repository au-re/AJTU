import { ConclusionType } from "../../../src/state/types";

// The number of possible chapters is (N^L-1) / (N-1)  where N is the number of possible actions and L is the number of
// chapters in the story. With 4 possible actions and 6 chapters, this is 819 possible chapters
export const MAX_CHAPTERS = 6;
export const possibleConclusions: ConclusionType[] = ["sad", "happy", "neutral"];
