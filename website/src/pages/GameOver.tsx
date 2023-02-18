import { Button, Center, Heading, Stack, Text, Wrap } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameMenu } from "../components/GameMenu";
import { Glitch } from "../components/Glitch";
import { AdventureImage } from "../components/Image";
import { GameContext } from "../state/GameContext";

export const GameOver = () => {
  const navigate = useNavigate();
  const { gameOver, recap, quitGame } = useContext(GameContext);

  useEffect(() => {
    if (!gameOver || !recap) {
      navigate("/");
    }
  }, [gameOver, recap, navigate]);

  return (
    <Center flexDirection="column">
      <GameMenu />
      <Stack spacing="6" alignItems="center">
        <Heading>The sad ending</Heading>
        <Wrap direction="row" spacing="6" display="flex">
          <AdventureImage height={"480px"} width={"480px"} fades src={recap?.imageUrl} />
          <Text overflow="auto" paddingRight="6" maxHeight="480px" width={"480px"}>
            {recap?.text}
          </Text>
        </Wrap>
        <Button onClick={quitGame}>
          <Glitch text="> Game Over" />
        </Button>
      </Stack>
    </Center>
  );
};
