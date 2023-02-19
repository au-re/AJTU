export interface GetChapterRequest {
  action: string;
  protagonist: string;
  summary: string;
  events: string[];
}

export interface StoryContext {
  summary: string;
  protagonist: string;
}
