import {
  Button,
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
import { useContext } from "react";
import { useKeyPress } from "../hooks/useKeyPress";
import { GameContext } from "../state/GameContext";
import { Glitch } from "./Glitch";

export const GameMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { quitGame } = useContext(GameContext);

  useKeyPress("Escape", onOpen);

  return (
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
  );
};
