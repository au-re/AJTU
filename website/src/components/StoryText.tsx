import { chakra, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/css";
import { useTypewriter } from "./Typewriter";

const BlinkCaret = keyframes`
  from, to { color: transparent }
  50% { color: #ffffffdd }
`;

export const AnimatedText = ({ text, onDone, ...props }: any) => {
  const { text: story, isDone } = useTypewriter(text, onDone);
  return (
    <Text overflow={"auto"} lineHeight={"2rem"} {...props}>
      {story}
      <chakra.span lineHeight={"2rem"} animation={isDone ? `${BlinkCaret} 0.9s step-end infinite` : ""} fontSize="xl">
        ▮
      </chakra.span>
    </Text>
  );
};

export const StoryText = ({ text }: any) => {
  return (
    <Text overflow={"auto"} maxHeight={"240px"} lineHeight={"1.8rem"}>
      {text}
      <chakra.span lineHeight={"1.8rem"} animation={`${BlinkCaret} 0.9s step-end infinite`} fontSize="xl">
        ▮
      </chakra.span>
    </Text>
  );
};
