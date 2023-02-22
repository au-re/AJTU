export const splitCommaSeparatedString = (string: string) => {
  return string
    .replace(/(\n|[0-9]\.)/g, "")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "");
};
