export interface Chapter {
  chapterNumber: number;
  text: string;
  imageUrl: string;
  imageCaption?: string;
  actions: Action[];
  title: string;
}

export interface Conclusion {
  text: string;
  conclusion: ConclusionType;
  imageUrl: string;
}

export interface Action {
  name: string;
  narration: string;
  motivation: string;
  conclusion?: ConclusionType;
}

export interface Item {
  name: string;
  imageUrl: string;
}

export interface Inventory {
  items: Item[];
}

export type ConclusionType = "sad" | "happy" | "neutral";
