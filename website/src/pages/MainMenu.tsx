import { Button, Center, Heading, Progress, Stack, Wrap } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Glitch } from "../components/Glitch";
import { AdventureImage } from "../components/Image";
import { AnimatedText } from "../components/StoryText";
import { GameContext } from "../state/GameContext";

const description =
  "An AI driven text based adventure game, where you explore an alien world and make choices that will affect the outcome of the story.";

export const MainMenu = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { startGame } = useContext(GameContext);

  const onStartGameClick = async () => {
    setLoading(true);
    await startGame();
    navigate("/game");
  };

  return (
    <Center>
      <Progress size="xs" isIndeterminate />
      <Wrap direction="row" spacing="6" display="flex">
        <AdventureImage src="/images/bg_thumbnail_placeholder.png" />
        <Stack spacing="8" width="420px">
          <Heading>A Journey through the Unknown</Heading>
          <AnimatedText text={description}></AnimatedText>
          <Button isLoading={isLoading} onClick={onStartGameClick} size="lg">
            <Glitch text="> Start New Adventure" />
          </Button>
        </Stack>
      </Wrap>
    </Center>
  );
};
