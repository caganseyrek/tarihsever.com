"use client";

import React from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { Components } from "@/types/globals";

const ThemeProvider = ({ children }: Components.BaseWrapperProps) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
