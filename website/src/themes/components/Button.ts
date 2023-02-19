import { defineStyleConfig } from "@chakra-ui/react";

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    minHeight: "2.5rem",
    borderRadius: "0",
    whiteSpace: "normal",
    _hover: {
      _light: {
        bg: "background.HIGHLIGHT",
      },
      _dark: {
        bg: "background.HIGHLIGHT",
      },
    },
    _light: {
      color: "teal.500",
      bg: "background.MID",
    },
    _dark: {
      color: "teal.300",
      bg: "background.MID",
    },
  },
});
