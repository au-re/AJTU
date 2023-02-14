import { openai } from "./openai";
import fs from "fs";
import _ from "lodash";
import yargs from "yargs";

// read arguments from command line
const options = yargs(process.argv.slice(2))
  .usage("Usage: -p <some prompt>")
  .options({
    prompt: {
      alias: "p",
      description: "The prompt to use",
      type: "string",
      demandOption: true,
    },
    model: {
      alias: "m",
      description: "The model to use (default: text-davinci-003)",
      type: "string",
      default: "text-davinci-003",
      choices: ["text-davinci-003"],
    },
    maxTokens: {
      alias: "mt",
      description: "How many tokens should be generated (default: 48)",
      type: "number",
      default: 48,
    },
    temperature: {
      alias: "temp",
      description: "The temperature to use (default: 0)",
      type: "number",
      default: 0,
    },
    imageSize: {
      alias: "s",
      description: "The size of the image to generate (default: 1024x1024)",
      default: "1024x1024",
      choices: ["256x256", "512x512", "1024x1024"],
    },
  })
  .parseSync();

(async () => {
  const prompt = options.prompt;
  const createdText = await createCompletion(prompt);
  saveResults(prompt, createdText || "");
})();

async function createCompletion(prompt: string) {
  try {
    const completion = await openai.createCompletion({
      model: options.model,
      max_tokens: options.maxTokens,
      prompt,
      temperature: options.temperature,
    });
    return completion.data.choices[0].text || "";
  } catch (error) {
    console.log(error);
  }
}

async function createImage(prompt: string) {
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: options.imageSize as any,
    });
    return response.data.data[0].url || "";
  } catch (error) {
    console.log(error);
  }
}

async function saveResults(prompt: string, createdText: string) {
  const rawdata = fs.readFileSync(`${process.cwd()}/prompts/results.json`, { encoding: "utf8", flag: "r" });
  const results = JSON.parse(rawdata);
  const newResults = _.merge(results, { [prompt]: createdText });
  fs.writeFileSync(`${process.cwd()}/prompts/results.json`, JSON.stringify(newResults, null, 2));
}
