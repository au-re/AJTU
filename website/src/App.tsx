import { Center, Container, Flex } from "@chakra-ui/react";
import { Link, Route, Routes } from "react-router-dom";
import { Game } from "./pages/Game";
import { MainMenu } from "./pages/MainMenu";

export function App() {
  return (
    <Center flex={1}>
      <Routes>
        <Route index element={<MainMenu />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Center>
  );
}
