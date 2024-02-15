import axios from "axios";

interface GenerateSceneParams {
  previous_scene: string;
  last_action: string;
}

export const generateScene = async (input: GenerateSceneParams) => {
  const { data } = await axios.post(
    `https://api.prompt.studio/api/v1/instructions/dep_2cOnnP4IAT86sBqwUJxJu7mM1ES/run`,
    { input },
    {
      headers: {
        Authorization: `Bearer ${process.env.PROMPT_STUDIO_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  try {
    console.log(data);
    return {
      actions: JSON.parse(data.user_actions) || [],
      scene_title: JSON.parse(data.new_scene).scene_title || "",
      scene_description: JSON.parse(data.new_scene).scene_description || "",
      image_description: data.image_description,
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

interface CreateConclusionParams {
  context: string;
}

export const generateConclusion = async (params: CreateConclusionParams) => {
  return {
    conclusion_scene: "conclusion_scene",
    image_description: "image_description",
    conclusion_type: "conclusion_type",
  };
};
