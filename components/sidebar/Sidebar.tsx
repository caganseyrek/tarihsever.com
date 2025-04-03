"use client";

import React from "react";

import {
  AccordionContent as SubtopicArticlesContainer,
  AccordionTrigger as SubtopicTrigger,
  Accordion as TopicSection,
  AccordionItem as TopicSectionItem,
} from "@/components/base/accordion";
import { Button } from "@/components/base/button";

// FIXME after site is ready
import { articleNav } from "@/prepublish/temp/topic-links.temp";

import {
  SidebarContent,
  SidebarContentItem,
  SidebarRoot,
  SidebarSubcontentItem,
  SidebarSubcontent as SubtopicArticlesList,
  SidebarContentLabel as TopicSectionLabel,
} from "./Sidebar.Partials";

const Sidebar = () => {
  return (
    <SidebarRoot>
      <SidebarContent>
        {articleNav.map((topic) => (
          <TopicSection key={topic.key} type="single" collapsible>
            <TopicSectionLabel>{topic.title}</TopicSectionLabel>
            {topic.subtopics.map((subtopic) => (
              <TopicSectionItem key={subtopic.key} value={subtopic.key} className="w-full">
                <SubtopicTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground data-[state=open]:bg-primary/10 data-[state=open]:text-primary-foreground">
                    <SidebarContentItem title={subtopic.title} />
                  </Button>
                </SubtopicTrigger>
                <SubtopicArticlesContainer>
                  <SubtopicArticlesList>
                    {subtopic.articles.map((article) => (
                      <SidebarSubcontentItem key={article.key} link={article.path}>
                        {article.title}
                      </SidebarSubcontentItem>
                    ))}
                  </SubtopicArticlesList>
                </SubtopicArticlesContainer>
              </TopicSectionItem>
            ))}
          </TopicSection>
        ))}
      </SidebarContent>
    </SidebarRoot>
  );
};

export default Sidebar;
