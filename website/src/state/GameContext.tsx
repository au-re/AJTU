import React from "react";
import { defaultProtagonist, initialChapter } from "./initialChapter";
import { fetchNextChapter } from "./requests/fetchChapter";
import { fetchConclusion } from "./requests/fetchConclusion";
import { Action, Chapter, Conclusion } from "./types";

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

    if (action.conclusion) {
      const conclusion = await fetchConclusion({
        protagonist: defaultProtagonist,
        events: state.chapters.map((chapter) => chapter.text),
        conclusion: action.conclusion,
      });

      if (!conclusion) return;
      setState({ ...state, conclusion, gameOver: true });
      setLoadingChapter(false);
      return;
    }

    const path = state.path + "." + idx;

    const newChapterResponse = await fetchNextChapter({
      path,
      currentChapterNumber: state.chapters[state.currentChapterIndex].chapterNumber,
      action: action.name,
      events: state.chapters.map((chapter) => chapter.text),
      protagonist: defaultProtagonist,
    });

    if (!newChapterResponse) {
      setLoadingChapter(false);
      // something went wrong
      return;
    }

    const newChapter = {
      chapterNumber: newChapterResponse.chapterNumber,
      title: newChapterResponse.eventTitle,
      text: newChapterResponse.eventDescription,
      imageUrl: newChapterResponse.imageUrl,
      imageCaption: newChapterResponse.scenePrompt,
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
