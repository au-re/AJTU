import { Center, chakra, Text } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { Game } from "./pages/Game";
import { GameOver } from "./pages/GameOver";
import { MainMenu } from "./pages/MainMenu";

export function App() {
  return (
    <>
      <Center flex={1}>
        <Routes>
          <Route index element={<MainMenu />} />
          <Route path="/game" element={<Game />} />
          <Route path="/game_over" element={<GameOver />} />
        </Routes>
        <Text opacity=".25" right="6" bottom="2" position="absolute">
          Made with <chakra.span color="white">♥</chakra.span> and AIs by <a>Aurélien Franky</a> for the{" "}
          <a href="https://itch.io/jam/allbyai">All by AI</a> game jam
        </Text>
      </Center>
    </>
  );
}
