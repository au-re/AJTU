import { Center } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { Game } from "./pages/Game";
import { GameOver } from "./pages/GameOver";
import { MainMenu } from "./pages/MainMenu";

export function App() {
  return (
    <Center flex={1}>
      <Routes>
        <Route index element={<MainMenu />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game_over" element={<GameOver />} />
      </Routes>
    </Center>
  );
}
