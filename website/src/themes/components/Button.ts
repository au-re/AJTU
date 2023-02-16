import { defineStyleConfig } from "@chakra-ui/react";

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    borderRadius: "0",
    _hover: {
      _light: {
        bg: "background.HIGHLIGHT",
      },
      _dark: {
        bg: "background.HIGHLIGHT",
      },
    },
    _light: {
      bg: "background.MID",
    },
    _dark: {
      bg: "background.MID",
    },
  },
  defaultProps: {
    size: "lg",
  },
});
