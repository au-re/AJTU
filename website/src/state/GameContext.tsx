import React from "react";
import { initialChapter } from "./initialChapter";
import { fetchNextChapter } from "./requests/fetchChapter";
import { Action, Chapter, Conclusion } from "./types";
import { fetchConclusion } from "./requests/fetchConclusion";

const defaultGameState = {
  path: "0",
  started: false,
  gameOver: false,
  inventory: { items: [] },
  chapters: [] as Chapter[],
  currentChapterIndex: 0,
  isLoadingChapter: false,
  conclusion: null as Conclusion | null,
  quitGame: () => {},
  startGame: () => {},
  setCurrentChapter: (currentChapterIndex: number) => {},
  takeAction: (action: Action, idx: number) => {},
};

export const GameContext = React.createContext(defaultGameState);

export function GameContextProvider(props: any) {
  const [isLoadingChapter, setLoadingChapter] = React.useState(false);
  const [state, setState] = React.useState(defaultGameState);

  const startGame = async () => {
    setLoadingChapter(true);
    setState({ ...defaultGameState, started: true, chapters: [initialChapter] });
    setLoadingChapter(false);
  };

  const quitGame = () => {
    setState(defaultGameState);
  };

  const setCurrentChapter = (currentChapterIndex: number) => {
    setState({ ...state, currentChapterIndex });
  };

  const takeAction = async (action: Action, idx: number) => {
    setLoadingChapter(true);

    if (state.currentChapterIndex >= 2) {
      const conclusion = await fetchConclusion({
        path: state.path,
        events: state.chapters.map((chapter) => chapter.text),
      });

      if (!conclusion) return;
      setState({ ...state, conclusion, gameOver: true });
      setLoadingChapter(false);
      return;
    }

    const path = state.path + "." + (idx + 1);

    const [newChapterResponse] = await Promise.all([
      fetchNextChapter({
        path,
        action: action.action_name,
        events: state.chapters.map((chapter) => chapter.text),
      }),
      // wait at least 1.5 seconds to show the narration
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]);

    if (!newChapterResponse) {
      setLoadingChapter(false);
      // something went wrong
      return;
    }

    const newChapter: Chapter = {
      title: newChapterResponse.eventTitle,
      text: newChapterResponse.eventDescription,
      image_url: newChapterResponse.imageUrl,
      image_caption: newChapterResponse.scenePrompt,
      actions: newChapterResponse.actions,
    };

    setState({
      ...state,
      path,
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
