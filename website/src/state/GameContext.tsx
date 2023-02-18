import React from "react";
import { placeholderInventory } from "./placeholders";
import { fetchChapter } from "./requests/fetchChapter";
import { fetchRecap } from "./requests/fetchRecap";

export interface Chapter {
  text: string;
  imageUrl?: string;
  actions: Action[];
  title: string;
}

export interface Recap {
  text: string;
  imageUrl?: string;
}

export interface Action {
  name: string;
  isFinalAction?: boolean;
}

export interface Item {
  name: string;
  imageUrl: string;
}

export interface Inventory {
  items: Item[];
}

const defaultGameState = {
  started: false,
  gameOver: false,
  inventory: placeholderInventory,
  chapters: [] as Chapter[],
  currentChapterIndex: 0,
  isLoadingChapter: false,
  recap: null as Recap | null,
  quitGame: () => {},
  startGame: () => {},
  setCurrentChapter: (currentChapterIndex: number) => {},
  takeAction: (action: Action) => {},
};

export const GameContext = React.createContext(defaultGameState);

export function GameContextProvider(props: any) {
  const [isLoadingChapter, setLoadingChapter] = React.useState(false);
  const [state, setState] = React.useState(defaultGameState);

  const startGame = async () => {
    setLoadingChapter(true);
    const firstChapter = await fetchChapter(0);
    setState({ ...defaultGameState, started: true, chapters: [firstChapter] });
    setLoadingChapter(false);
  };

  const quitGame = () => {
    setState(defaultGameState);
  };

  const setCurrentChapter = (currentChapterIndex: number) => {
    setState({ ...state, currentChapterIndex });
  };

  const takeAction = async (action: Action) => {
    setLoadingChapter(true);
    if (action.isFinalAction) {
      const recap = await fetchRecap();
      setState({ ...state, recap, gameOver: true });
      setLoadingChapter(false);
      return;
    }

    const newChapter = await fetchChapter(state.currentChapterIndex + 1);
    setState({
      ...state,
      currentChapterIndex: state.currentChapterIndex + 1,
      chapters: [...state.chapters, newChapter],
    });
    setLoadingChapter(false);
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        isLoadingChapter,
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
