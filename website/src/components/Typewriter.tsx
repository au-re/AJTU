import React, { useEffect } from "react";

export function useTypewriter(str: string, onDone?: () => void) {
  const [index, setIndex] = React.useState(0);
  const [text, setText] = React.useState("");
  const isDone = text === str;

  useEffect(() => {
    setText("");
  }, [str, setText]);

  useEffect(() => {
    if (isDone) {
      setIndex(0);
      onDone?.();
    }
  }, [isDone, onDone, setIndex]);

  useEffect(() => {
    if (isDone) return;

    const timer = setTimeout(() => {
      if (index < str.length) {
        setText(text + str[index]);
        setIndex(index + 1);
      }
    }, 20 + Math.random() * 20);

    return () => clearTimeout(timer);
  }, [isDone, str, text, index, setText, setIndex]);

  return { text, isDone };
}
