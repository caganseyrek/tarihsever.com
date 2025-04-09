import React from "react";

import { ChevronDown } from "lucide-react";

import { AccordionContent, AccordionTrigger } from "@/components/base/accordion";
import { Button } from "@/components/base/button";
import { SidebarGroupSub, SidebarItem as SidebarGroupSubItem } from "@/components/base/sidebar";

import type { Components } from "@/types/globals";

const SubtopicToggleButton = ({ subtopicTitle }: Components.SubtopicToggleButtonProps) => {
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

const SubtopicToggleArticles = ({ subtopicArticles }: Components.SubtopicToggleArticleProps) => {
  return (
    <AccordionContent>
      <SidebarGroupSub className="text-sm py-0.5">
        {subtopicArticles.map((article) => (
          <SidebarGroupSubItem key={article.key} link={article.path}>
            {article.title}
          </SidebarGroupSubItem>
        ))}
      </SidebarGroupSub>
    </AccordionContent>
  );
};

export { SubtopicToggleButton, SubtopicToggleArticles };
