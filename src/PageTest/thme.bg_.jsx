import React from "react";

export const theme = {
  ligth: {
    foreground: "#0000000",
    background: "#eeeeeee",
  },
  dark: {
    foreground: "#fffffff",
    background: "#2222222",
  },
};
export const ThemeContext = React.createContext(theme.dark);
