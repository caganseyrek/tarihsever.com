import React from "react";

import { Accordion, AccordionItem } from "@/components/base/accordion";
import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarRoot } from "@/components/base/sidebar";
import { SubtopicToggleArticles, SubtopicToggleButton } from "@/components/partials/article-list.partials";

import { articleNav } from "@/contents/__generated__/article-nav";

import { cn } from "@/shared/utils";

import type { Components } from "@/types/globals";

const ArticleListContent = ({ forMobileSidebar }: Components.ArticleListProps) => {
  return (
    <>
      {articleNav.map((topic) => (
        <Accordion key={topic.key} type="multiple">
          <SidebarGroup>
            <SidebarGroupLabel
              title={topic.title}
              className={cn(forMobileSidebar && "bg-container-inner-item-background")}>
              {topic.title}
            </SidebarGroupLabel>
            {topic.subtopics.map((subtopic) => (
              <AccordionItem key={subtopic.key} value={subtopic.key} className="w-full">
                <SubtopicToggleButton subtopicTitle={subtopic.title} />
                <SubtopicToggleArticles subtopicArticles={subtopic.articles} />
              </AccordionItem>
            ))}
          </SidebarGroup>
        </Accordion>
      ))}
    </>
  );
};

const ArticleList = ({ forMobileSidebar }: Components.ArticleListProps) => {
  if (forMobileSidebar) {
    return <ArticleListContent forMobileSidebar />;
  }

  return (
    <SidebarRoot>
      <SidebarContent>
        <ArticleListContent />
      </SidebarContent>
    </SidebarRoot>
  );
};

export { ArticleList };
