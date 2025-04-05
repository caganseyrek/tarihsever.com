"use client";

import React from "react";

import { Accordion, AccordionItem } from "@/components/base/accordion";
import { SubtopicArticles, SubtopicToggle } from "@/components/sidebars/article-nav.partials";
import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarRoot } from "@/components/sidebars/sidebar.common";

import { articleNav } from "@/content/generated/article-nav";

const ArticleNav = () => {
  return (
    <SidebarRoot>
      <SidebarContent>
        {articleNav.map((topic) => (
          <Accordion key={topic.key} type="single" collapsible>
            <SidebarGroup>
              <SidebarGroupLabel>{topic.title}</SidebarGroupLabel>
              {topic.subtopics.map((subtopic) => (
                <AccordionItem key={subtopic.key} value={subtopic.key} className="w-full">
                  <SubtopicToggle subtopicTitle={subtopic.title} />
                  <SubtopicArticles articles={subtopic.articles} />
                </AccordionItem>
              ))}
            </SidebarGroup>
          </Accordion>
        ))}
      </SidebarContent>
    </SidebarRoot>
  );
};

export default ArticleNav;
