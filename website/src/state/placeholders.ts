import { Chapter, Inventory, Recap } from "./GameContext";

export const chapter1: Chapter = {
  title: "Part 1: Crashlanding",
  text: `The hero had been hurtling through the vast expanse of space in a sleek, state-of-the-art spaceship when disaster struck. 
    An unexpected gravitational anomaly sent the vessel spiraling out of control, and before the hero could react, the ship careened into the atmosphere of an unknown planet. 
    The impact was jarring, and the hero was tossed around the cockpit like a rag doll, dazed and disoriented.
    For a moment, everything was a blur of flashing lights and deafening alarms, but as the smoke cleared, the hero realized that the ship had crash-landed in the midst of a dense, jungle-like terrain. 
    The emergency systems were still online, but the engines were badly damaged, and the ship was in no condition to fly. 
    The hero knew that he would have to make do with what he had if he wanted to survive.
    The first thing the hero did was assess his injuries. Miraculously, he had survived the crash with only a few scrapes and bruises, but he knew that the situation could change at any moment. 
    He also grabbed a powerful laser gun, just in case he encountered any hostile creatures.`,
  imageUrl: "/images/crashed_spaceship.png",
  actions: [
    { name: "Search for supplies" },
    { name: "Investigate the crash site" },
    { name: "Wait for help" },
    { name: "Lose game", isFinalAction: true },
  ],
};

export const chapter2 = {
  title: "Part 2: Searching for supplies",
  text: `After the crash, the hero stumbled out of the wreckage and surveyed the scene. The once sleek and advanced spaceship was now a crumpled, smoking mess. 
    Undeterred, the hero began searching for supplies, sifting through the rubble for anything that might be useful. 
    With each passing moment, the realization set in that the hero was alone on a foreign planet with only their own ingenuity to rely on.`,
  imageUrl: "/images/investigate_wreckage.png",
  actions: [
    { name: "Win game", isFinalAction: true },
    { name: "Lose game", isFinalAction: true },
  ],
};

export const placeholderChapters = [chapter1, chapter2];

export const placeholderInventory: Inventory = {
  items: [
    {
      name: "Laser gun",
      imageUrl: "/images/laser_gun.png",
    },
  ],
};

export const placeholderRecap: Recap = {
  text: "You have been on a great adventure. You have seen many things and met many people. You have learned many things. You have grown as a person. You have been on a great adventure. You have seen many things and met many people. You have learned many things. You have grown as a person You have been on a great adventure. You have seen many things and met many people. You have learned many things. You have grown as a person You have been on a great adventure. You have seen many things and met many people. You have learned many things. You have grown as a person You have been on a great adventure. \n You have been on a great adventure. You have seen many things and met many people. You have learned many things. You have grown as a personYou have been on a great adventure. You have seen many things and met many people. You have learned many things. You have grown as a personYou have been on a great adventure. You have seen many things and met many people. You have learned many things. You have grown as a person You have seen many things and met many people. You have learned many things. You have grown as a person You have been on a great adventure. You have seen many things and met many people. You have learned many things. You have grown as a person. You have been on a great adventure. You have seen many things and met many people. You have learned many things. You have grown as a person You have been on a great adventure. You have seen many things and met many people. You have learned many things. You have grown as a person You have been on a great adventure. You have seen many things and met many people. You have learned many things. You have grown as a person You have been on a great adventure. \n You have been on a great adventure. You have seen many things and met many people. You have learned many things. You have grown as a personYou have been on a great adventure. You have seen many things and met many people. You have learned many things. You have grown as a personYou have been on a great adventure. You have seen many things and met many people. You have learned many things. You have grown as a person You have seen many things and met many people. You have learned many things. You have grown as a person",
  imageUrl: "/images/bg_thumbnail_placeholder.png",
};
