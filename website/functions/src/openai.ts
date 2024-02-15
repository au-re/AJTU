import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

const defaultImageOptions = {
  imageSize: "1024x1024",
};

export async function createImage(prompt: string, options = defaultImageOptions) {
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: options.imageSize as any,
  });
  return response.data.data[0].url || "";
}
