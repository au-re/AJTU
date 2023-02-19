import { Image, Stack, Tooltip } from "@chakra-ui/react";
import { Chapter } from "../state/GameContext";

export const ChapterList = ({ chapters, currentChapterIndex }: any) => {
  return (
    <Stack direction="column" margin="2">
      {chapters.map((chapter: Chapter, index: number) => (
        <Tooltip label={chapter.title}>
          <Image
            border={currentChapterIndex === index ? "2px solid white" : ""}
            objectFit="cover"
            width={"48px"}
            height={"48px"}
            key={chapter.title + index}
            src={chapter.imageUrl}
          />
        </Tooltip>
      ))}
    </Stack>
  );
};
