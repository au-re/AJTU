import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

const defaultCompletionOptions = {
  model: "text-davinci-003",
  maxTokens: 124,
  temperature: 0,
};

const defaultImageOptions = {
  imageSize: "1024x1024",
};

export async function createCompletion(prompt: string, options = defaultCompletionOptions) {
  const completion = await openai.createCompletion({
    model: options.model,
    max_tokens: options.maxTokens,
    prompt,
    temperature: options.temperature,
  });
  return completion.data.choices[0].text || "";
}

export async function createImage(prompt: string, options = defaultImageOptions) {
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: options.imageSize as any,
  });
  return response.data.data[0].url || "";
}
