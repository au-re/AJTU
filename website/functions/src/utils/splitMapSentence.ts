export const splitMapSentence = (string: string) => {
  return string
    .replace(/(\n|:)/g, "|")
    .split("|")
    .filter((_, i) => i % 2 !== 0)
    .map((s) => s.trim().replace(/\.$/, "."));
};
