import { Image, keyframes, Tooltip } from "@chakra-ui/react";
import { shadows } from "../themes/shadows";

interface ChapterImageProps {
  src: string;
  fades?: boolean;
  caption?: string;
}

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export const ChapterImage = ({ src, fades, caption }: ChapterImageProps) => {
  return (
    <Tooltip label={caption}>
      <Image
        height="100%"
        width="100%"
        animation={fades ? `${fadeIn} 1s` : ""}
        objectFit={"cover"}
        boxShadow={shadows.PRIMARY}
        src={src}
        flex={1}
      />
    </Tooltip>
  );
};
