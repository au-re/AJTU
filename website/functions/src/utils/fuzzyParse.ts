const safeParse = (input: string) => {
  try {
    return JSON.parse(input);
  } catch (e) {
    return input;
  }
};

export const fuzzyParse = (input: string) => {
  let res = safeParse(input);

  if (typeof res === "string") {
    res = safeParse(
      input
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/`/g, "")
    );
  }

  return res;
};
