export const trimIncompleteSentence = (string: string) => {
  const lastPeriodIndex = string.lastIndexOf(".");
  return string.slice(0, lastPeriodIndex + 1);
};
