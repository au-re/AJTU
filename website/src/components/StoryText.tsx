import { chakra, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/css";
import { useTypewriter } from "../hooks/useTypewriter";

const BlinkCaret = keyframes`
  from, to { color: transparent }
  50% { color: #ffffffdd }
`;

export const AnimatedText = ({ text, onDone, ...props }: any) => {
  const { text: story, isDone } = useTypewriter(text, onDone);
  return (
    <Text flex="1" overflow={"auto"} lineHeight={"1.8rem"} {...props}>
      {story}
      <chakra.span lineHeight={"2rem"} animation={isDone ? `${BlinkCaret} 0.9s step-end infinite` : ""} fontSize="xl">
        ▮
      </chakra.span>
    </Text>
  );
};

interface StoryTextProps {
  text: string;
}

export const StoryText = ({ text }: StoryTextProps) => {
  return (
    <Text flex="1" overflow={"auto"} lineHeight={"1.8rem"}>
      {text}
      <chakra.span lineHeight={"1.8rem"} animation={`${BlinkCaret} 0.9s step-end infinite`} fontSize="xl">
        ▮
      </chakra.span>
    </Text>
  );
};
