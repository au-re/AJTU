import { splitNumeratedList } from "./splitNumeratedList";

const openaiLists = [
  "1. Approach the settlement cautiously, looking for signs of life.2. Search the settlement for supplies and resources.3. Try to find someone who can help repair the ship.4. Look for clues that could lead to a way off the planet.",
  "1. Explore the alien structures,2. Search for the mysterious cargo,3. Gather supplies for the journey back,4. Prepare the ship for takeoff.",
  "1. Explore the research facility further to learn more about the alien technology.2. Search the surrounding area for any clues or resources that could help in the mission.3. Contact allies for assistance in protecting the technology.4. Prepare the ship for takeoff and leave the planet.",
];

test("can split the different variations of openai lists", () => {
  openaiLists.forEach((openaiList) => {
    console.log(splitNumeratedList(openaiList));
    expect(splitNumeratedList(openaiList).length).toBe(4);
  });
});
