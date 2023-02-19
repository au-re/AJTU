import axios from "axios";

const baseUrl = "http://localhost:8080";

interface NextChapterRequest {
  action: string;
  protagonist: string;
  events: string[];
}

interface NextChapterResponse {
  imageUrl: string;
  eventTitle: string;
  scenePrompt: string;
  actionNarrations: string[];
  actionMotivations: string[];
  eventDescription: string;
  availableActions: string[];
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
