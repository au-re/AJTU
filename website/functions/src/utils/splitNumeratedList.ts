export const splitNumeratedList = (string: string) => {
  return string
    .split(/\d+\./g)
    .map((item) => item.trim().replace(/\,$/, "."))
    .filter((item) => item !== "");
};
