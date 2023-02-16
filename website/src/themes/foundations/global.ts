import { mode } from "@chakra-ui/theme-tools";

export const globalStyles = {
  global: (props: any) => ({
    "::selection": {
      color: "font.PRIMARY",
      background: "teal.300",
    },
    body: {
      display: "flex",
      height: "100vh",
      bg: "background.BASE",
      color: "font.PRIMARY",
    },
    "#root": { height: "100vh", display: "flex", flex: 1 },
    a: {
      color: mode("teal.500", "teal.300")(props),
    },
  }),
};
