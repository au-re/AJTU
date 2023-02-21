import { Button, Center, Heading, Stack, Text, Wrap } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameMenu } from "../components/GameMenu";
import { Glitch } from "../components/Glitch";
import { AdventureImage } from "../components/Image";
import { GameContext } from "../state/GameContext";

export const GameOver = () => {
  const navigate = useNavigate();
  const { gameOver, conclusion, quitGame } = useContext(GameContext);

  useEffect(() => {
    if (!gameOver || !conclusion) {
      navigate("/");
    }
  }, [gameOver, conclusion, navigate]);

  return (
    <Center flexDirection="column">
      <GameMenu />
      <Stack spacing="6" alignItems="center">
        <Heading>A {conclusion?.conclusion} ending</Heading>
        <Wrap direction="row" spacing="6" display="flex">
          <AdventureImage fades src={conclusion?.imageUrl} />
          <Text overflow="auto" paddingRight="6" maxHeight="480px" width={"480px"}>
            {conclusion?.text}
          </Text>
        </Wrap>
        <Button onClick={quitGame}>
          <Glitch text="> Game Over" />
        </Button>
      </Stack>
    </Center>
  );
};
