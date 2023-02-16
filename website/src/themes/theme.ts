import { extendTheme } from "@chakra-ui/react";

import { colors } from "./colors";
import { buttonTheme } from "./components/Button";
import { modalTheme } from "./components/Modal";
import { fonts } from "./fonts";
import { globalStyles } from "./foundations/global";

export const AJTUTheme = extendTheme({
  colors,
  fonts,
  styles: globalStyles,
  components: {
    Button: buttonTheme,
    Modal: modalTheme,
  },
});
