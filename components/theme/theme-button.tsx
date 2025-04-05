"use client";

import React from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/base/button";

const ThemeButton = () => {
  const [mounted, setMounted] = React.useState<boolean>(false);
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className="bg-container-inner-item-background size-9 min-w-9 rounded-md">&nbsp;</div>;
  }

  return (
    <Button
      className="bg-container-inner-item-background border-0"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {resolvedTheme === "dark" ? (
        <>
          <Sun /> <span className="sr-only">Aydınlık temaya geç</span>
        </>
      ) : (
        <>
          <Moon /> <span className="sr-only">Karanlık temaya geç</span>
        </>
      )}
    </Button>
  );
};

export default ThemeButton;
