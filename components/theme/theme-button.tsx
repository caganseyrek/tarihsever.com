"use client";

import React from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/base/button";

import { cn } from "@/shared/utils";

const ThemeButton = ({ className, ...props }: React.ComponentProps<typeof Button>) => {
  const [mounted, setMounted] = React.useState<boolean>(false);
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className={cn("border bg-container-border size-9 min-w-9 rounded-md", className)}>&nbsp;</div>;
  }

  return (
    <Button
      className={cn("bg-container-inner-item-background", className)}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      {...props}>
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

export { ThemeButton };
