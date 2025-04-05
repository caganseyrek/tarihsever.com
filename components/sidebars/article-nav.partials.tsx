"use client";

import React from "react";

import { ChevronDown } from "lucide-react";

import { AccordionContent, AccordionTrigger } from "@/components/base/accordion";
import { Button } from "@/components/base/button";
import { SidebarGroupSub, SidebarItem as SidebarGroupSubItem } from "@/components/sidebars/sidebar.common";

import { Components } from "@/types/globals";

const SubtopicToggle = ({ subtopicTitle }: Components.SubtopicToggleProps) => {
  return (
    <AccordionTrigger asChild>
      <Button
        variant="ghost"
        className="w-full justify-start text-muted-foreground data-[state=open]:bg-primary-hover-background data-[state=open]:text-primary-lighter">
        <div className="w-full flex flex-row items-center justify-between [&[data-state=open]_svg]:rotate-180 transition-transform">
          <span className="max-w-[12.75rem] truncate" title={subtopicTitle}>
            {subtopicTitle}
          </span>
          <ChevronDown />
        </div>
      </Button>
    </AccordionTrigger>
  );
};

const SubtopicArticles = ({ articles }: Components.SubtopicArticlesProps) => {
  return (
    <AccordionContent>
      <SidebarGroupSub className="text-sm py-0.5">
        {articles.map((article) => (
          <SidebarGroupSubItem key={article.key} link={article.path}>
            {article.title}
          </SidebarGroupSubItem>
        ))}
      </SidebarGroupSub>
    </AccordionContent>
  );
};

export { SubtopicToggle, SubtopicArticles };
