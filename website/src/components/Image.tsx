import { Image, keyframes } from "@chakra-ui/react";
import { shadows } from "../themes/shadows";

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export const AdventureImage = ({ src, fades, ...props }: any) => {
  return (
    <Image
      animation={fades ? `${fadeIn} 1s` : ""}
      objectFit={"cover"}
      width={720}
      height={720}
      boxShadow={shadows.PRIMARY}
      src={src}
      flex={1}
      {...props}
    />
  );
};
