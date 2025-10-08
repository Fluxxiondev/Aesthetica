export const palette = {
  // Neutrals
  black: "#0B0F14",
  nearBlack: "#0E131A",
  darkGray: "#161C24",
  gray: "#1C2430",
  midGray: "#222B38",
  lightGray: "#2C3747",
  softerGray: "#3B4B60",

  primary: "#6C9EFF", // electric indigo/azure
  primaryHover: "#88B2FF",
  secondary: "#8A7BFF", // soft violet
  accent: "#00E0A4", // teal accent for success/active
  warning: "#FFC65A",
  danger: "#FF6B6B",

  // Surface & content
  background: "#0E131A",
  surface: "#121923",
  card: "#151E29",
  overlay: "#0B0F14AA",

  // Text
  text: "#E6EDF5",
  textSecondary: "#ACB7C4",
  muted: "#7D8CA1",

  // Borders & dividers
  border: "#1E2733",
  outline: "#2A3545",

  // Tab bar specifics
  tabBar: "#0F1620",
  tabIconActive: "#6C9EFF",
  tabIconInactive: "#6B778C",

  // Gradients
  gradient1Start: "#0E131A",
  gradient1End: "#151E29",
  gradient2Start: "#101722",
  gradient2End: "#182233",
} as const;

export type Palette = typeof palette;
