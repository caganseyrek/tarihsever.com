"use client";

import React from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "../../base/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../base/dropdown-menu";

/* eslint-disable react-hooks/exhaustive-deps */

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    const savedTheme: string | null = localStorage.getItem("theme");
    if (!savedTheme) {
      localStorage.setItem("theme", "dark");
      return setTheme("dark");
    }
    return setTheme(savedTheme);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Temayı Değiştir</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem
          onClick={() => {
            setTheme("light");
            localStorage.setItem("theme", "light");
          }}
          checked={theme === "light"}
          className="text-[0.95rem]">
          Aydınlık
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          onClick={() => {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
          }}
          checked={theme === "dark"}
          className="text-[0.95rem]">
          Karanlık
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          onClick={() => {
            setTheme("system");
            localStorage.setItem("theme", "system");
          }}
          checked={theme === "system"}
          className="text-[0.95rem]">
          Sistem
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
