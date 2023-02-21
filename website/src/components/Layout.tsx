import { Center, chakra, Text, Wrap } from "@chakra-ui/react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Center flex={1} padding="2px">
      <Wrap marginBottom="12" direction="row" spacing="6" display="flex">
        {children}
      </Wrap>
      <Text fontSize={[12, 14]} opacity=".6" padding="4" bottom="0" right="0" position="absolute">
        Made with <chakra.span color="white">♥</chakra.span> and AI by{" "}
        <chakra.a _hover={{ opacity: ".9" }} href="https://github.com/au-re/AJTU">
          Aurélien Franky
        </chakra.a>{" "}
        for the{" "}
        <chakra.a _hover={{ opacity: ".9" }} href="https://itch.io/jam/allbyai">
          All by AI
        </chakra.a>{" "}
        game jam
      </Text>
    </Center>
  );
};
