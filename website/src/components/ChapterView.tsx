import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Progress,
  Stack,
  Text,
  Tooltip,
  Wrap,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Action, Chapter, GameContext, Inventory as InventoryType } from "../state/GameContext";
import { Glitch } from "./Glitch";
import { AdventureImage } from "./Image";
import { Inventory } from "./Inventory";
import { TextCarousel } from "./TextCarousel";

interface ChapterProps {
  inventory: InventoryType;
  chapter: Chapter;
}

export const ChapterView = (props: ChapterProps) => {
  const [isLoading, setLoading] = useState(false);
  const [selectedActionIndex, setSelectedActionIndex] = useState<number | null>(null);
  const { takeAction, isLoadingChapter } = useContext(GameContext);
  const [canPerformActions, setCanPerformActions] = useState(false);
  const { chapter, inventory } = props;

  const onActionClick = async (action: Action, index: number) => {
    setLoading(true);
    setSelectedActionIndex(index);
    await takeAction(action);
    setCanPerformActions(false);
    setLoading(false);
  };

  return (
    <Wrap direction="row" spacing="6" display="flex">
      <Modal isCentered onClose={() => {}} isOpen={isLoadingChapter}>
        <ModalOverlay />
        <ModalContent>
          {selectedActionIndex !== null && <Text padding="6">{chapter.actions[selectedActionIndex].narration}</Text>}
          <Progress bg="background.MID" colorScheme="teal" size="sm" isIndeterminate />
        </ModalContent>
      </Modal>
      <AdventureImage fades src={chapter.imageUrl} caption={chapter.imageCaption} />
      <Stack width="420px" flex={1} minWidth={"420px"}>
        <Flex direction="column" flex={1} justifyContent="space-between" marginBottom="6">
          <Heading size="lg">{chapter.title}</Heading>
          <Stack spacing="6">
            <Box alignSelf="flex-end">
              <TextCarousel text={chapter.text} onComplete={() => setCanPerformActions(true)} />
            </Box>
            {canPerformActions ? (
              <Wrap height={"220px"} direction="column">
                <Text>What do you do?</Text>
                {chapter.actions.map((action, index) => {
                  return (
                    <Tooltip placement="left" key={action.name} label={action.motivation}>
                      <Button height="fit-content" isLoading={isLoading} onClick={() => onActionClick(action, index)}>
                        <Glitch text={action.name} />
                      </Button>
                    </Tooltip>
                  );
                })}
              </Wrap>
            ) : (
              <Wrap height={"220px"} />
            )}
          </Stack>
        </Flex>
        <Inventory inventory={inventory} />
      </Stack>
    </Wrap>
  );
};
