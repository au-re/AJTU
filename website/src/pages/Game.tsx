import { Center, Modal, ModalContent, ModalOverlay, Progress, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChapterList } from "../components/ChapterList";
import { ChapterView } from "../components/ChapterView";
import { GameMenu } from "../components/GameMenu";
import { GameContext } from "../state/GameContext";

export const Game = () => {
  const navigate = useNavigate();
  const { gameOver, currentChapterIndex, chapters, inventory, isLoadingChapter } = useContext(GameContext);
  const currentChapter = chapters[currentChapterIndex];

  useEffect(() => {
    if (gameOver) {
      navigate("/game_over");
    }
  }, [gameOver]);

  useEffect(() => {
    if (!currentChapter) {
      navigate("/");
    }
  }, [navigate, currentChapter]);

  if (!currentChapter) {
    return null;
  }

  return (
    <Center>
      <Modal isCentered onClose={() => {}} isOpen={isLoadingChapter}>
        <ModalOverlay />
        <ModalContent>
          <Text padding="6">You step out of the rocket and start exploring the debris</Text>
          <Progress bg="background.MID" colorScheme="teal" size="sm" isIndeterminate />
        </ModalContent>
      </Modal>
      <GameMenu />
      <ChapterList chapters={chapters} currentChapterIndex={currentChapterIndex} />
      <ChapterView inventory={inventory} chapter={currentChapter} />
    </Center>
  );
};
