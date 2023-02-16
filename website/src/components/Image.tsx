import { Image } from "@chakra-ui/react";
import { shadows } from "../themes/shadows";

export const AdventureImage = ({ src }: any) => {
  return <Image objectFit={"cover"} width={720} height={720} boxShadow={shadows.PRIMARY} src={src} flex={1} />;
};
