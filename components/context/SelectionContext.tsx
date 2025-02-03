"use client";

import React from "react";

import { ArticleMapProps } from "@/lib/mapper/generated/articlesMap";

import { NavigationMapProps, TopicMapProps } from "@/data/staticMaps";

interface SelectionContextProviderProps {
  children?: React.ReactNode;
}

interface UserSelectionProps {
  currentPage: Omit<NavigationMapProps, "icon"> | null;
  currentTopic: TopicMapProps | null;
  currentArticle: ArticleMapProps | null;
}

export const userSelectionContext = React.createContext<{
  userSelection: UserSelectionProps;
  setUserSelection: React.Dispatch<React.SetStateAction<UserSelectionProps>>;
}>({
  userSelection: {
    currentPage: null,
    currentTopic: null,
    currentArticle: null,
  },
  setUserSelection: () => {},
});

export const SelectionContextProvider = ({ children }: SelectionContextProviderProps) => {
  const [userSelection, setUserSelection] = React.useState<UserSelectionProps>({
    currentPage: null,
    currentTopic: null,
    currentArticle: null,
  });

  return (
    <userSelectionContext.Provider value={{ userSelection, setUserSelection }}>
      {children}
    </userSelectionContext.Provider>
  );
};
