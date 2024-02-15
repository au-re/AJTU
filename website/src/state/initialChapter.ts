import { Chapter } from "./types";

export const defaultProtagonist = "You are a smuggler pilot on the run from the law";

export const initialChapter: Chapter = {
  title: "The gravitational anomaly",
  text: `asd`,
  image_url: "/images/crashed_spaceship.png",
  image_caption: "The wreckage of your ship",
  actions: [
    {
      action_name: "Search for supplies",
      action_description: "I need to search for supplies and see what I can find.",
    },
    {
      action_name: "Investigate the crash site",
      action_description: "I should investigate the crash site to see if there's anything useful.",
    },
    {
      action_name: "Wait for help",
      action_description: "I hope help arrives soon, but until then, I have to be prepared to wait it out.",
    },
  ],
};
