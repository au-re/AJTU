import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChapterView } from "../components/ChapterView";
import { Glitch } from "../components/Glitch";
import { useKeyPress } from "../hooks/useKeyPress";
import { GameContext } from "../state/GameContext";

export const Game = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { currentChapterIndex, chapters, quitGame } = useContext(GameContext);
  const currentChapter = chapters[currentChapterIndex];

  useKeyPress("Escape", onOpen);

  useEffect(() => {
    if (!currentChapter) {
      navigate("/");
    }
  }, [currentChapter]);

  if (!currentChapter) {
    return null;
  }

  return (
    <Center>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Game Menu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Please note that we currently don't save your progress</Text>
          </ModalBody>
          <ModalFooter justifyContent={"start"}>
            <Button onClick={quitGame}>
              <Glitch text="> Quit" />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ChapterView chapter={currentChapter} />
    </Center>
  );
};
