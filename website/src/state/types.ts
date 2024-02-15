export interface Chapter {
  title: string;
  text: string;
  image_url: string;
  image_caption?: string;
  actions: Action[];
}

export interface Conclusion {
  text: string;
  conclusion: ConclusionType;
  image_url: string;
}

export interface Action {
  action_name: string;
  action_description: string;
}

export type ConclusionType = "sad" | "happy" | "neutral";

export interface NextChapterRequest {
  path: string;
  action: string;
  events: string[];
}

export interface NextChapterResponse {
  imageUrl: string;
  eventTitle: string;
  scenePrompt: string;
  actions: Action[];
  eventDescription: string;
}
