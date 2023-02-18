import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Glitch } from "./Glitch";
import { StoryText } from "./StoryText";

export const TextCarousel = ({ text, onComplete }: { text: string; onComplete: () => void }) => {
  const parts = text.split("\n");
  const [currentIndex, setIndex] = useState(0);

  // reset the index when the text changes
  useEffect(() => {
    setIndex(0);
  }, [text]);

  return (
    <Box>
      <StoryText text={parts[currentIndex]} />
      <Flex marginBottom="2" marginTop="6" direction="row" justifyContent="space-between">
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
              if (currentIndex + 1 === parts.length - 1) {
                onComplete();
              }
            }}
          >
            <Glitch text="next >" />
          </Text>
        )}
      </Flex>
    </Box>
  );
};
