import axios from "axios";
import { baseUrl } from "../../constants";
import { Conclusion } from "../types";

interface NextChapterRequest {
  path: string;
  events: string[];
}

export const fetchConclusion = async (payload: NextChapterRequest): Promise<Conclusion | null> => {
  try {
    const res = await axios.post(`${baseUrl}/conclusion`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
