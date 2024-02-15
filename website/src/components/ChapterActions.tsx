import { Button, Text, Tooltip, Wrap } from "@chakra-ui/react";
import { Action, Chapter } from "../state/types";
import { Glitch } from "./Glitch";

interface ChapterActionsProps {
  chapter: Chapter;
  isLoading: boolean;
  onActionClick: (action: Action, index: number) => void;
}

export const ChapterActions = (props: ChapterActionsProps) => {
  const { chapter, isLoading, onActionClick } = props;
  return (
    <Wrap direction="column">
      <Text>What do you do?</Text>
      {chapter.actions.map((action, index) => {
        return (
          <Tooltip placement="left" key={action.action_name} label={action.action_description}>
            <Button height="fit-content" isLoading={isLoading} onClick={() => onActionClick(action, index)}>
              <Glitch text={action.action_name} />
            </Button>
          </Tooltip>
        );
      })}
    </Wrap>
  );
};
