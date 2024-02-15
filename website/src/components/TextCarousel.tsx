import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Glitch } from "./Glitch";
import { StoryText } from "./StoryText";

function splitText(text: string) {
  const n = 3;
  const sentences = text
    .split(".")
    .reduce((r, e, i) => (i % n ? r[r.length - 1].push(e) : r.push([e])) && r, [] as any)
    .map((e: string[]) => e.join(".") + ".")
    .filter((e: string) => e.length > 1);
  return sentences;
}

export const TextCarousel = ({ text, onComplete }: { text: string; onComplete: () => void }) => {
  const parts = splitText(text);
  const [currentIndex, setIndex] = useState(0);

  // reset the index when the text changes
  useEffect(() => {
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex === parts.length - 1) {
      onComplete();
    }
  }, [currentIndex, onComplete, parts.length]);

  return (
    <>
      <StoryText text={parts[currentIndex]} />
      <Flex marginBottom="6" marginTop="6" direction="row" justifyContent="space-between">
        {currentIndex !== 0 ? (
          <Text
            _hover={{ color: "teal.400" }}
            cursor="pointer"
            fontSize="lg"
            onClick={() => {
              setIndex(currentIndex - 1);
            }}
          >
            <Glitch text="< previous" />
          </Text>
        ) : (
          <Box />
        )}
        {parts.length > currentIndex + 1 && (
          <Text
            _hover={{ color: "teal.400" }}
            cursor="pointer"
            fontSize="lg"
            onClick={() => {
              setIndex(currentIndex + 1);
            }}
          >
            <Glitch text="next >" />
          </Text>
        )}
      </Flex>
    </>
  );
};
