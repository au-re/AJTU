import axios from "axios";
import { baseUrl } from "../../constants";
import { Action } from "../types";

interface NextChapterRequest {
  path: string;
  action: string;
  protagonist: string;
  events: string[];
  currentChapterNumber: number;
}

interface NextChapterResponse {
  chapterNumber: number;
  imageUrl: string;
  eventTitle: string;
  scenePrompt: string;
  actions: Action[];
  eventDescription: string;
  original: {
    actionNarrations: string;
    actionMotivations: string;
    eventDescription: string;
    availableActions: string;
  };
}

export const fetchNextChapter = async (payload: NextChapterRequest): Promise<NextChapterResponse | null> => {
  try {
    const res = await axios.post(`${baseUrl}/chapter`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
