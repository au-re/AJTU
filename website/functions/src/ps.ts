interface GenerateSceneParams {
  context: string;
  last_action: string;
}

export const generateScene = async (params: GenerateSceneParams) => {
  return {
    new_scene: `{
      "scene_title": "scene_title",
      "scene_description": "scene_description"
    }`,
    user_actions: `[
      {
        "action_name": "action_name",
        "action_description": "action_description"
      }
    ]`,
    image_description: "image_description",
  };
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
