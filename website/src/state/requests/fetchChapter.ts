import axios from "axios";
import { baseUrl } from "../../constants";
import { NextChapterRequest, NextChapterResponse } from "../types";

export const fetchNextChapter = async (payload: NextChapterRequest): Promise<NextChapterResponse | null> => {
  try {
    const res = await axios.post(`${baseUrl}/chapter`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
