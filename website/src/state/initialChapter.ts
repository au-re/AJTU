import { Chapter } from "./GameContext";

export const defaultProtagonist = "Toran, a smuggler pilot on the run from the law";

export const initialChapter: Chapter = {
  title: "The gravitational anomaly",
  text: `You are Toran, a smuggler pilot on the run from the law. Chased by bounty hunters you have been hurtling through the vast expanse of space in a sleek, state-of-the-art spaceship when disaster struck. 
An unexpected gravitational anomaly sent the vessel spiraling out of control. Before you could react, the ship careened into the atmosphere of an unknown planet. 
The impact was jarring, and you were tossed around the cockpit like a rag doll, dazed and disoriented.
For a moment, everything was a blur of flashing lights and deafening alarms, but as the smoke cleared, you realized that the ship had crash-landed in the midst of a desolate wasteland. 
The emergency systems were still online, but the engines were badly damaged, and the ship is in no condition to fly. 
The first thing you do is assess your injuries. Miraculously, you have survived the crash with only a few scrapes and bruises, but you know that the situation could change at any moment.`,
  imageUrl: "/images/crashed_spaceship.png",
  imageCaption: "The wreckage of your ship",
  actions: [
    {
      name: "Search for supplies",
      narration: "I need to search for supplies and see what I can find.",
      motivation: "I need to be self-sufficient and have access to basic necessities to survive.",
    },
    {
      name: "Investigate the crash site",
      narration: "I should investigate the crash site to see if there's anything useful.",
      motivation:
        "I need to know what caused the accident and if there's anything salvageable that could help me survive.",
    },
    {
      name: "Wait for help",
      narration: "I hope help arrives soon, but until then, I have to be prepared to wait it out.",
      motivation:
        "I know that it's possible someone will come looking for me, and I don't want to wander too far from the crash site and potentially make it harder for rescuers to find me.",
    },
  ],
};
