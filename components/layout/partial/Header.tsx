"use client";

import React from "react";

import Link from "next/link";

import { userSelectionContext } from "@/components/context/SelectionContext";

import { navigationMap } from "@/data/staticMaps";

import { Button } from "../../base/button";
import TarihseverIcon from "../../TarihseverIcon";
import ThemeSelector from "./ThemeSelector";

const Header = () => {
  const { userSelection } = React.useContext(userSelectionContext);

  return (
    <header className="w-full border-b bg-accent/90 dark:bg-transparent">
      <div className="w-[76rem] max-[1248px]:w-full max-[1248px]:px-4 m-auto py-4 px-2 flex items-center justify-between">
        <section className="inline-flex items-center gap-2">
          <TarihseverIcon />
          <h1 className="text-3xl font-semibold tracking-tighter select-none">
            Tarih
            <span className="text-[#D89236]">sever</span>
          </h1>
        </section>
        <nav className="inline-flex items-center gap-2 max-[820px]:hidden">
          {navigationMap.map((item) => (
            <Link href={item.key === "ana-sayfa" ? "/" : "/" + item.key} key={item.key}>
              <Button
                variant="menuButton"
                className={`text-[0.95rem] ${
                  !!(
                    (userSelection.currentPage && userSelection.currentPage.key === item.key) ||
                    ((userSelection.currentTopic || userSelection.currentArticle) && item.key === "konular")
                  )
                    ? "bg-border"
                    : ""
                }`}>
                <item.icon />
                {item.title}
              </Button>
            </Link>
          ))}
          <ThemeSelector />
        </nav>
      </div>
    </header>
  );
};

export default Header;
