import { Box, Button, Heading, Wrap } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChapterImage } from "../components/ChapterImage";
import { Glitch } from "../components/Glitch";
import { AnimatedText } from "../components/StoryText";
import { GameContext } from "../state/GameContext";

const title = "A Journey Through the Unknown";
const description = `A text adventure game entirely generated by AI. You explore an alien world and make choices that 
will affect the outcome of a story as it unfolds in front of you. Your choices will lead you across any one of 819 
possible unique events, but what will they be?`;

export const MainMenu = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { startGame } = useContext(GameContext);

  const onStartGameClick = async () => {
    setLoading(true);
    await startGame();
    navigate("/game");
  };

  return (
    <>
      <Box>
        <Box
          maxWidth="calc(100vw - 4px)"
          height={{ base: "480px", xl: "720px" }}
          width={{ base: "calc(100vw - 4px)", xl: "720px" }}
        >
          <ChapterImage caption={""} fades src={"/images/bg_thumbnail_placeholder.png"} />
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
        <Heading size="2xl">{title}</Heading>
        <Wrap direction="column" marginTop="6" marginBottom="6">
          <Button isLoading={isLoading} onClick={onStartGameClick} size="lg">
            <Glitch text="> Start a new Adventure" />
          </Button>
        </Wrap>
        <Box marginBottom="6">
          <AnimatedText text={description} />
        </Box>
      </Box>
    </>
  );
};
