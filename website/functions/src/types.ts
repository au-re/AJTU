import { ConclusionType } from "../../src/state/types";

export interface PostChapterBody {
  action: string;
  protagonist: string;
  events: string[];
  currentChapterNumber: number;
  path: string;
}

export interface PostConclusionBody {
  path: string;
  protagonist: string;
  events: string[];
  conclusion: ConclusionType;
}

export interface StoryContext {
  summary: string;
  protagonist: string;
}
