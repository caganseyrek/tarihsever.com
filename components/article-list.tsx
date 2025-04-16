"use client";

import React from "react";

import { usePathname } from "next/navigation";

import { ChevronDown } from "lucide-react";

import { Button, LinkedButton } from "@/components/base/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/base/collapsible";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarItem,
  SidebarItemSub,
} from "@/components/partials/sidebar.partials";

import { contentTree } from "@/content/data/__generated__/content-tree";

import { cn } from "@/shared/utils";

interface ArticleListProps {
  mobile?: boolean;
}

const ArticleList = ({ mobile = false }: ArticleListProps) => {
  const pathSections: string[] = usePathname().replace("/", "").split("/");
  const currentSubtopic: string = pathSections[2];
  const currentArticle: string = pathSections[3];
  return (
    <>
      {contentTree.map((topic) => (
        <SidebarGroup key={topic.key}>
          <SidebarGroupLabel title={topic.title} className={cn(mobile && "bg-container-inner-item-background")}>
            {topic.title}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {topic.subtopics.map((subtopic) => {
              const isCurrentSubtopic: boolean = subtopic.key === currentSubtopic;
              return (
                <SidebarItem key={subtopic.key}>
                  <Collapsible className="w-full" defaultOpen={isCurrentSubtopic}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn("w-full justify-between", isCurrentSubtopic && "text-primary")}>
                        <span className="max-w-[12.75rem] truncate" title={subtopic.title}>
                          {subtopic.title}
                        </span>
                        <ChevronDown />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-down">
                      <SidebarItemSub>
                        {subtopic.articles.map((article) => {
                          const isCurrentArticle: boolean = isCurrentSubtopic && article.key === currentArticle;
                          return (
                            <LinkedButton
                              key={article.key}
                              link={"/" + article.path}
                              className={cn(isCurrentArticle && "text-primary")}>
                              {article.title}
                            </LinkedButton>
                          );
                        })}
                      </SidebarItemSub>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarItem>
              );
            })}
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
};

export { ArticleList };
