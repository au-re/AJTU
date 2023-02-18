import { Box, Button, Flex, Heading, Stack, Text, Wrap } from "@chakra-ui/react";
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
  const { takeAction } = useContext(GameContext);
  const [canPerformActions, setCanPerformActions] = useState(false);
  const { chapter, inventory } = props;

  const onActionClick = async (action: Action) => {
    setLoading(true);
    await takeAction(action);
    setCanPerformActions(false);
    setLoading(false);
  };

  return (
    <Wrap direction="row" spacing="6" display="flex">
      <AdventureImage fades src={chapter.imageUrl} />
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
                {chapter.actions.map((action) => {
                  return (
                    <Button isLoading={isLoading} onClick={() => onActionClick(action)} key={action.name}>
                      <Glitch text={action.name} />
                    </Button>
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
