import { Image, Stack, Tooltip } from "@chakra-ui/react";
import { Chapter } from "../state/types";

interface ChapterListProps {
  chapters: Chapter[];
  currentChapterIndex: number;
}

export const ChapterList = ({ chapters, currentChapterIndex }: ChapterListProps) => {
  return (
    <Stack direction="row">
      {chapters.map((chapter: Chapter, index: number) => (
        <Tooltip key={index} label={chapter.title}>
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
