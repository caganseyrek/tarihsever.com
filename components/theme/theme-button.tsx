"use client";

import React from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/base/button";

import { cn } from "@/shared/utils";

import type { Components } from "@/types/globals";

const ThemeButton = ({ className }: Components.SearchDialogInputProps) => {
  const [mounted, setMounted] = React.useState<boolean>(false);
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className={cn("border bg-container-inner-item-background size-9 min-w-9 rounded-md", className)}>&nbsp;</div>
    );
  }

  return (
    <Button
      className={cn("bg-container-inner-item-background", className)}
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
