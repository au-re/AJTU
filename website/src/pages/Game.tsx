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
  Stack,
  Text,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Glitch } from "../components/Glitch";
import { AdventureImage } from "../components/Image";
import { StoryText } from "../components/StoryText";
import { useKeyPress } from "../hooks/useKeyPress";

const placeholderText = `
  The hero had been hurtling through the vast expanse of space in a sleek, state-of-the-art spaceship when disaster struck. 
  An unexpected gravitational anomaly sent the vessel spiraling out of control, and before the hero could react, 
  the ship careened into the atmosphere of an unknown planet. The impact was jarring, and the hero was tossed around the cockpit 
  like a rag doll, dazed and disoriented.

  For a moment, everything was a blur of flashing lights and deafening alarms, but as the smoke cleared, 
  the hero realized that the ship had crash-landed in the midst of a dense, jungle-like terrain. 
  The emergency systems were still online, but the engines were badly damaged, and the ship was in no condition to fly. 
  The hero knew that he would have to make do with what he had if he wanted to survive.

  The first thing the hero did was assess his injuries. Miraculously, he had survived the crash with only a few scrapes 
  and bruises, but he knew that the situation could change at any moment. He quickly gathered up all the supplies 
  he could find, including a first aid kit, some emergency rations, and a survival guide. He also grabbed a powerful 
  laser gun, just in case he encountered any hostile creatures.
`;

export const Game = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useKeyPress("Escape", onOpen);

  return (
    <Center>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Game Menu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Please note we currently don't save your progress</Text>
          </ModalBody>
          <ModalFooter>
            <Link to="/" style={{ flex: 1 }}>
              <Button>
                <Glitch text="> Quit" />
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Wrap direction="row" spacing="6" display="flex">
        <AdventureImage src="/images/crashed_spaceship.png" />
        <Stack spacing="8" width="420px">
          <StoryText text={placeholderText} />
          <Stack>
            <Button>action One</Button>
            <Button>action Two</Button>
          </Stack>
        </Stack>
      </Wrap>
    </Center>
  );
};
