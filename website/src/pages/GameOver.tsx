import { Box, Button, Heading, Wrap } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChapterImage } from "../components/ChapterImage";
import { ChapterList } from "../components/ChapterList";
import { GameMenu } from "../components/GameMenu";
import { Glitch } from "../components/Glitch";
import { AnimatedText } from "../components/StoryText";
import { GameContext } from "../state/GameContext";

export const GameOver = () => {
  const navigate = useNavigate();
  const { gameOver, conclusion, quitGame, chapters, currentChapterIndex } = useContext(GameContext);

  useEffect(() => {
    if (!gameOver || !conclusion) {
      navigate("/");
    }
  }, [gameOver, conclusion, navigate]);

  if (!conclusion) {
    return null;
  }

  return (
    <>
      <GameMenu />
      <Box>
        <Box
          maxWidth="calc(100vw - 4px)"
          height={{ base: "480px", xl: "720px" }}
          width={{ base: "calc(100vw - 4px)", xl: "720px" }}
        >
          <ChapterImage caption={""} fades src={conclusion.imageUrl} />
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
          A {conclusion?.conclusion} ending
        </Heading>
        <Box>
          <AnimatedText text={conclusion.text} />
        </Box>
        <Wrap direction="column">
          <Button onClick={quitGame}>
            <Glitch text="> Game Over" />
          </Button>
        </Wrap>
        <Wrap height="16" />
      </Box>
    </>
  );
};
