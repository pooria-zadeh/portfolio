import React from "react";
import { ThemeProvider, Global, css } from "@emotion/react";
import themeObject from "./themeObject";

interface Props {
  children: React.ReactNode;
}

export default function AppThemeProvider({ children }: Props) {
  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            font-family: Monsterrat;
          }

          html,
          body {
            width: 100%;
            height: 100%;
            min-height: 100%;
            padding: 0;
            margin: 0;
          }
        `}
      />
      <ThemeProvider theme={themeObject}>{children}</ThemeProvider>
    </>
  );
}
