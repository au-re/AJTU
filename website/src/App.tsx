import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Game } from "./pages/Game";
import { GameOver } from "./pages/GameOver";
import { MainMenu } from "./pages/MainMenu";

export function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<MainMenu />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game_over" element={<GameOver />} />
      </Routes>
    </Layout>
  );
}
