import { DarkTheme as RNDarkTheme, Theme as RNTheme } from "@react-navigation/native";
import { palette } from "./colors";

export const NavigationDarkTheme: RNTheme = {
  ...RNDarkTheme,
  colors: {
    ...RNDarkTheme.colors,
    primary: palette.primary,
    background: palette.background,
    card: palette.card,
    text: palette.text,
    border: palette.border,
    notification: palette.accent,
  },
};

export { palette };
