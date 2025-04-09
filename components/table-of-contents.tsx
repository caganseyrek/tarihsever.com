import React from "react";

import { ChevronDown, List } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/base/accordion";
import { Button } from "@/components/base/button";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupSub,
  SidebarItem as SidebarGroupSubItem,
  SidebarItem,
  SidebarRoot,
} from "@/components/base/sidebar";

import { slugify } from "@/shared/utils";

import type { Components, Globals } from "@/types/globals";

const TableOfContentsItems = ({ tocObject }: Components.TableOfContentsProps) => {
  const renderHeadingNodes = (nodes: Globals.Data.HeadingNodeProps[]) => {
    return nodes.map((node) => {
      const parsedText: string = slugify(node.text);
      return (
        <React.Fragment key={parsedText}>
          <SidebarGroupSubItem link={"#" + parsedText}>{node.text}</SidebarGroupSubItem>
          {node.children && node.children.length > 0 && (
            <SidebarGroupSub>{renderHeadingNodes(node.children)}</SidebarGroupSub>
          )}
        </React.Fragment>
      );
    });
  };
  return tocObject.map((node) => {
    const parsedText: string = slugify(node.text);
    return (
      <React.Fragment key={parsedText}>
        <SidebarItem link={"#" + parsedText}>{node.text}</SidebarItem>
        {node.children && node.children.length > 0 && (
          <SidebarGroupSub>{renderHeadingNodes(node.children)}</SidebarGroupSub>
        )}
      </React.Fragment>
    );
  });
};

const TableOfContents = ({ forMobileToggle, tocObject }: Components.TableOfContentsProps) => {
  if (forMobileToggle) {
    return (
      <Accordion type="single" collapsible className="mb-4 hidden max-[1000px]:inline-block">
        <AccordionItem value="table-of-contents">
          <AccordionTrigger asChild>
            <Button className="w-full justify-between text-sm">
              <span className="flex flex-row items-center justify-start gap-2">
                <List />
                İçindekiler
              </span>
              <ChevronDown />
            </Button>
          </AccordionTrigger>
          <AccordionContent className="border rounded-md bg-container-background p-2 mt-2 text-sm [&_a]:rounded-sm">
            <TableOfContentsItems tocObject={tocObject} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <SidebarRoot>
      <SidebarContent className="sticky top-4 gap-1">
        <SidebarGroup>
          <SidebarGroupLabel title="İçindekiler">İçindekiler</SidebarGroupLabel>
          <SidebarGroupContent className="max-h-[calc(100dvh-4.5rem)] overflow-auto">
            <TableOfContentsItems tocObject={tocObject} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarRoot>
  );
};

export { TableOfContents };
