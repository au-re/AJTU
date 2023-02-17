import { Button, Divider, Heading, Stack, Wrap } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Chapter, GameContext } from "../state/GameContext";
import { Glitch } from "./Glitch";
import { AdventureImage } from "./Image";
import { ChapterText } from "./StoryText";

interface ChapterProps {
  chapter: Chapter;
}

export const ChapterView = (props: ChapterProps) => {
  const [isLoading, setLoading] = useState(false);
  const { takeAction } = useContext(GameContext);
  const [canPerformActions, setCanPerformActions] = useState(false);
  const { chapter } = props;

  const onActionClick = async (action: string) => {
    setLoading(true);
    await takeAction(action, 0);
    setLoading(false);
  };

  return (
    <Wrap direction="row" spacing="6" display="flex">
      <AdventureImage src={chapter.imageUrl} />
      <Stack spacing="6" width="420px" flex={1} minWidth={"420px"}>
        <Heading size="md">{chapter.title}</Heading>
        <ChapterText text={chapter.text} onComplete={() => setCanPerformActions(true)} />
        <Divider />
        {canPerformActions && (
          <Wrap direction="column">
            {chapter.actions.map((action) => {
              return (
                <Button isLoading={isLoading} onClick={() => onActionClick(action)} key={action}>
                  <Glitch text={action} />
                </Button>
              );
            })}
          </Wrap>
        )}
      </Stack>
    </Wrap>
  );
};
