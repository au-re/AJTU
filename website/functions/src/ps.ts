import axios from "axios";
import { fuzzyParse } from "./utils/fuzzyParse";

interface GenerateSceneParams {
  previous_scene: string;
  last_action: string;
}

interface CreateConclusionParams {
  story: string;
}

const generate_scene_deployment = "dep_2cP7qgye5WS4Oj9suPOwq1ktWwi";
const generate_completion_deployment = "dep_2cPEWMr1OEnsFthkf9f7hQzBZwK";

export const generateScene = async (input: GenerateSceneParams) => {
  const { data } = await axios.post(
    `https://api.prompt.studio/api/v1/instructions/${generate_scene_deployment}/run`,
    { input },
    {
      headers: {
        Authorization: `Bearer ${process.env.PROMPT_STUDIO_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  try {
    return {
      actions: fuzzyParse(data.completion.user_actions) || [],
      scene_title: fuzzyParse(data.completion.new_scene).scene_title || "",
      scene_description: fuzzyParse(data.completion.new_scene).scene_description || "",
      image_description: data.completion.image_description,
    };
  } catch (e) {
    console.log(e);
    return {
      actions: [],
      scene_title: "",
      scene_description: "",
      image_description: "",
    };
  }
};

export const generateConclusion = async (params: CreateConclusionParams) => {
  const { data } = await axios.post(
    `https://api.prompt.studio/api/v1/instructions/${generate_completion_deployment}/run`,
    { input: params },
    {
      headers: {
        Authorization: `Bearer ${process.env.PROMPT_STUDIO_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  try {
    return {
      conclusion_scene: fuzzyParse(data.completion.conclusion).ending_scene || "",
      image_description: data.completion.conclusion_image,
      conclusion_type: fuzzyParse(data.completion.conclusion).ending_type || "",
    };
  } catch (e) {
    console.log(e);
    return {
      conclusion_scene: "",
      image_description: "",
      conclusion_type: "good",
    };
  }
};
