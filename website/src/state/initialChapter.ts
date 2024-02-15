import { Chapter } from "./types";

export const initialChapter: Chapter = {
  title: "The gravitational anomaly",
  text: `In the vast expanse of space, you, a seasoned smuggler pilot, are suddenly thrust into peril when a gravitational anomaly sends your ship careening toward an unknown planet. The crash is violent, jarring you around in the cockpit amidst a cacophony of alarms and shattering glass. When the dust settles, you find yourself in a desolate wasteland, your ship a wrecked shell, unable to fly. Miraculously, you've survived with mere scrapes, but the real challenge begins now: stranded and alone on an alien terrain, you must rely on your wits and experience in this unexpected fight for survival`,
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
