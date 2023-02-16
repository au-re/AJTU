import React from "react";

export function useTypewriter(str: string) {
  const [index, setIndex] = React.useState(0);
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (index < str.length) {
        setText(text + str[index]);
        setIndex(index + 1);
      }
    }, 20 + Math.random() * 20);

    return () => clearTimeout(timer);
  }, [index, setText, setIndex]);

  return text;
}
