import {
  Box,
  Button,
  Center,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Progress,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Glitch } from "../components/Glitch";
import { AdventureImage } from "../components/Image";
import { AnimatedText } from "../components/StoryText";
import { GameContext } from "../state/GameContext";

const description = `This is an AI driven text based adventure game, where you explore an alien world and make choices 
that will affect the outcome of the story. All content in this game is generated by AI.`;

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
      <Modal isCentered onClose={() => {}} isOpen={isLoading}>
        <ModalOverlay />
        <ModalContent>
          <Text>starting adventure</Text>
          <Progress bg="background.MID" colorScheme="teal" size="sm" isIndeterminate />
        </ModalContent>
      </Modal>
      <Wrap direction="row" spacing="6" display="flex">
        <Box width="48px" /> {/* hack to align pages */}
        <AdventureImage src="/images/bg_thumbnail_placeholder.png" />
        <Stack spacing="8" width="420px">
          <Heading size="2xl">A Journey through the Unknown</Heading>
          <AnimatedText height="240px" text={description}></AnimatedText>
          <Button isLoading={isLoading} onClick={onStartGameClick} size="lg">
            <Glitch text="> Start a new Adventure" />
          </Button>
        </Stack>
      </Wrap>
    </Center>
  );
};
