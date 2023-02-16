import { defineStyleConfig } from "@chakra-ui/react";

export const modalTheme = defineStyleConfig({
  baseStyle: {
    dialog: {
      borderRadius: "0",
      bg: "background.BASE",
    },
  },
});
