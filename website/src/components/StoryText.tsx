import { Box, chakra, Flex, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/css";
import { useState } from "react";
import { Glitch } from "./Glitch";
import { useTypewriter } from "./Typewriter";

const BlinkCaret = keyframes`
  from, to { color: transparent }
  50% { color: #ffffffdd }
`;

export const AnimatedText = ({ text, onDone }: any) => {
  const { text: story, isDone } = useTypewriter(text, onDone);
  return (
    <Text overflow={"auto"} minHeight={"140px"} maxHeight={"360px"} lineHeight={"2rem"}>
      {story}
      <chakra.span lineHeight={"2rem"} animation={isDone ? `${BlinkCaret} 0.9s step-end infinite` : ""} fontSize="xl">
        ▮
      </chakra.span>
    </Text>
  );
};

export const StoryText = ({ text }: any) => {
  return (
    <Text overflow={"auto"} minHeight={"180px"} maxHeight={"360px"} lineHeight={"2rem"}>
      {text}
      <chakra.span lineHeight={"2rem"} animation={`${BlinkCaret} 0.9s step-end infinite`} fontSize="xl">
        ▮
      </chakra.span>
    </Text>
  );
};

export const ChapterText = ({ text, onComplete }: { text: string; onComplete: () => void }) => {
  const parts = text.split("\n");
  const [currentIndex, setIndex] = useState(0);
  return (
    <Box>
      <StoryText text={parts[currentIndex]} />
      <Flex marginTop="2" direction="row" justifyContent="space-between">
        {currentIndex !== 0 && (
          <Text
            cursor="pointer"
            fontSize="lg"
            onClick={() => {
              setIndex(currentIndex - 1);
            }}
          >
            <Glitch text="< previous" />
          </Text>
        )}
        {parts.length > currentIndex + 1 && (
          <Text
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
