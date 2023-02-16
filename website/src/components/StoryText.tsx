import { chakra, Text } from "@chakra-ui/react";
import { useTypewriter } from "./Typewriter";

export const StoryText = ({ text }: any) => {
  const story = useTypewriter(text);
  return (
    <Text minHeight={"140px"}>
      {story}
      <chakra.span fontSize="lg">▮</chakra.span>
    </Text>
  );
};
