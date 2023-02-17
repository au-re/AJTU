import React from "react";
import { fetchChapter } from "./requests/fetchChapter";

export interface Chapter {
  text: string;
  imageUrl: string;
  actions: string[];
  title: string;
}

const defaultGameState = {
  started: false,
  inventory: [] as string[],
  chapters: [] as Chapter[],
  currentChapterIndex: 0,
  quitGame: () => {},
  startGame: () => {},
  setCurrentChapter: (currentChapterIndex: number) => {},
  takeAction: (action: string, currentChapterIndex: number) => {},
};

export const GameContext = React.createContext(defaultGameState);

export function GameContextProvider(props: any) {
  const [state, setState] = React.useState(defaultGameState);

  const startGame = async () => {
    const firstChapter = await fetchChapter(0);
    setState({ ...state, started: true, chapters: [firstChapter] });
  };

  const quitGame = () => {
    setState(defaultGameState);
  };

  const setCurrentChapter = (currentChapterIndex: number) => {
    setState({ ...state, currentChapterIndex });
  };

  const takeAction = async (action: string) => {
    const newChapter = await fetchChapter(state.currentChapterIndex + 1);
    setState({
      ...state,
      currentChapterIndex: state.currentChapterIndex + 1,
      chapters: [...state.chapters, newChapter],
    });
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        quitGame,
        startGame,
        setCurrentChapter,
        takeAction,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
