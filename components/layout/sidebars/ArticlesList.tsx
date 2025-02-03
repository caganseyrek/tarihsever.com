"use client";

import React from "react";

import Link from "next/link";

import { ArticleMapProps, articlesMap } from "@/lib/mapper/generated/articlesMap";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../base/sidebar";
import { userSelectionContext } from "../../context/SelectionContext";

const ArticlesList = () => {
  const { userSelection } = React.useContext(userSelectionContext);
  const articles: ArticleMapProps[] = articlesMap.filter(
    (article) => userSelection.currentTopic && userSelection.currentTopic.key === article.topic,
  );

  if (!articles || articles.length <= 0) {
    return null;
  }

  return (
    <SidebarGroup className="pb-1">
      <SidebarGroupLabel>Yazılar</SidebarGroupLabel>
      <SidebarGroupContent>
        {articles.map((article) => (
          <SidebarMenuItem key={article.key}>
            <SidebarMenuButton
              className="h-auto"
              isActive={!!(userSelection.currentArticle && userSelection.currentArticle.key === article.key)}>
              <Link href={"/konular/" + article.topic + "/" + article.key} className="text-[0.95rem]">
                {article.title}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default ArticlesList;
