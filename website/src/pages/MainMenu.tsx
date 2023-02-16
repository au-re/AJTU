import { Button, Center, Container, Flex, Heading, Image, Stack, Text, Wrap } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Glitch } from "../components/Glitch";
import { AdventureImage } from "../components/Image";
import { StoryText } from "../components/StoryText";
import { useTypewriter } from "../components/Typewriter";
import { shadows } from "../themes/shadows";

const description =
  "An AI driven text based adventure game, where you explore an alien world and make choices that will affect the outcome of the story.";

export const MainMenu = () => {
  return (
    <Center>
      <Wrap direction="row" spacing="6" display="flex">
        <AdventureImage src="/images/bg_thumbnail_placeholder.png" />
        <Stack spacing="8" width="420px">
          <Heading>A Journey through the Unknown</Heading>
          <StoryText text={description}></StoryText>
          <Link to="/game">
            <Button>
              <Glitch text="> Start New Adventure" />
            </Button>
          </Link>
        </Stack>
      </Wrap>
    </Center>
  );
};
