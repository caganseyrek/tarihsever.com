"use client";

import React from "react";

import { usePathname } from "next/navigation";

import {
  AccordionContent as SubtopicArticlesContainer,
  AccordionTrigger as SubtopicTrigger,
  Accordion as TopicSection,
  AccordionItem as TopicSectionItem,
} from "@/components/base/accordion";
import { Button } from "@/components/base/button";
import TarihseverIcon from "@/components/TarihseverIcon";

import { navigationLinks } from "@/shared/data/navigationLinks";
import { topicLinks } from "@/shared/data/topicLinks";
import { cn } from "@/shared/twUtils";

import {
  SearchDialog,
  SidebarContent,
  SidebarContentItem,
  SidebarHeader,
  SidebarHeaderNav,
  SidebarHeaderNavItem,
  SidebarHeaderTitle,
  SidebarRoot,
  SidebarSubcontentItem,
  SidebarSubcontent as SubtopicArticlesList,
  SidebarContentLabel as TopicSectionLabel,
} from "./Sidebar.Partials";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <SidebarRoot>
      <SidebarHeader>
        <SidebarHeaderTitle>
          <TarihseverIcon />
          <h1>
            Tarih<span>sever</span>
          </h1>
        </SidebarHeaderTitle>
        <SearchDialog />
        <SidebarHeaderNav>
          {navigationLinks.map((item) => (
            <SidebarHeaderNavItem
              key={item.key}
              linkDetails={item}
              className={cn(item.path === pathname && "bg-primary/10 text-primary-foreground")}
            />
          ))}
        </SidebarHeaderNav>
      </SidebarHeader>
      <SidebarContent>
        {topicLinks.map((topic) => (
          <TopicSection key={topic.key} type="single" collapsible>
            <TopicSectionLabel>{topic.title}</TopicSectionLabel>
            {topic.subtopics.map((subtopic) => (
              <TopicSectionItem key={subtopic.key} value={subtopic.key} className="w-full">
                <SubtopicTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start data-[state=open]:bg-primary/10 data-[state=open]:text-primary-foreground">
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
