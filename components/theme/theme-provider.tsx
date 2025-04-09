"use client";

import React from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeProvider = ({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" disableTransitionOnChange {...props}>
      {children}
    </NextThemesProvider>
  );
};

export { ThemeProvider };
