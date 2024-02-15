import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const defaultImageOptions = {
  imageSize: "1024x1024",
};

export async function createImage(prompt: string, options = defaultImageOptions) {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: options.imageSize as any,
  });

  return response.data[0].url || "";
}
