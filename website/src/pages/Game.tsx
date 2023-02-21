import { Box, Heading, Wrap } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChapterActions } from "../components/ChapterActions";
import { ChapterImage } from "../components/ChapterImage";
import { ChapterList } from "../components/ChapterList";
import { ChapterLoadingModal } from "../components/ChapterLoadingModal";
import { GameMenu } from "../components/GameMenu";
import { TextCarousel } from "../components/TextCarousel";
import { GameContext } from "../state/GameContext";
import { Action } from "../state/types";

export const Game = () => {
  const navigate = useNavigate();
  const [canPerformActions, setCanPerformActions] = useState(false);
  const [selectedActionIndex, setSelectedActionIndex] = useState<number | null>(null);
  const { gameOver, currentChapterIndex, chapters, takeAction, isLoadingChapter } = useContext(GameContext);
  const currentChapter = chapters[currentChapterIndex];
  const currentNarration = selectedActionIndex === null ? "" : currentChapter?.actions[selectedActionIndex]?.narration;

  const onActionClick = async (action: Action, index: number) => {
    setSelectedActionIndex(index);
    await takeAction(action, index);
    setCanPerformActions(false);
  };

  useEffect(() => {
    if (gameOver) {
      navigate("/game_over");
    }
  }, [navigate, gameOver]);

  useEffect(() => {
    if (!currentChapter) {
      navigate("/");
    }
  }, [navigate, currentChapter]);

  if (!currentChapter) {
    return null;
  }

  return (
    <>
      <GameMenu />
      <ChapterLoadingModal narration={currentNarration} isLoadingChapter={isLoadingChapter} />
      <Box>
        <Box
          maxWidth="calc(100vw - 4px)"
          height={{ base: "480px", xl: "720px" }}
          width={{ base: "calc(100vw - 4px)", xl: "720px" }}
        >
          <ChapterImage caption={currentChapter.imageCaption} fades src={currentChapter.imageUrl} />
        </Box>
        <Box padding="2">
          <ChapterList chapters={chapters} currentChapterIndex={currentChapterIndex} />
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection="column"
        paddingLeft={{ base: "1", sm: "6", xl: "0" }}
        paddingRight={{ base: "1", sm: "6", xl: "0" }}
        width={{ base: "100%", xl: "420px" }}
        minWidth={{ base: "240px", sm: "420px" }}
      >
        <Heading size="2xl" marginBottom={{ base: "2", md: "8" }}>
          {currentChapter.title}
        </Heading>
        <TextCarousel onComplete={() => setCanPerformActions(true)} text={currentChapter.text} />
        {canPerformActions ? (
          <ChapterActions onActionClick={onActionClick} chapter={currentChapter} isLoading={isLoadingChapter} />
        ) : null}
        <Wrap height="16" />
      </Box>
    </>
  );
};
