import React from "react";

import Link from "next/link";

import { AlignLeft } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/base/sidebar";

import Toc, { HeadingNode } from "@/lib/toc";

import ShareDialog from "./ShareDialog";

interface TocSidebarProps {
  pageContent: string;
}

const parseText = (text: string): string =>
  text
    .replace(/[\/()'"]/g, "")
    .replaceAll(" ", "-")
    .toLowerCase();

const renderNodes = (nodes: HeadingNode[]) => {
  return nodes.map((node) => {
    const parsedText: string = parseText(node.text);
    return (
      <SidebarMenuSub key={parsedText} className="gap-0">
        <SidebarMenuSubItem>
          <Link href={"#" + parsedText} passHref legacyBehavior>
            <SidebarMenuSubButton className="h-auto py-1 text-[0.95rem]">{node.text}</SidebarMenuSubButton>
          </Link>
          {node.children && node.children.length > 0 && renderNodes(node.children)}
        </SidebarMenuSubItem>
      </SidebarMenuSub>
    );
  });
};

const TocSidebar = ({ pageContent }: TocSidebarProps) => {
  const headings: string[] = pageContent.split("\n").filter((items) => items.startsWith("#"));
  const headingNodes: HeadingNode[] = Toc.generateNodes(headings);

  return (
    <Sidebar collapsible="none" className="bg-transparent">
      <SidebarHeader className="pt-1">
        <ShareDialog />
        <div className="w-full border h-9 px-3 py-2 flex flex-row items-center justify-start gap-2 rounded-md shadow-sm text-[0.95rem]">
          <AlignLeft className="w-4 h-4 min-w-4 min-h-4" />
          İçindekiler
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0">
              {headingNodes.map((node) => {
                const parsedText: string = parseText(node.text);
                return (
                  <SidebarMenuItem key={parsedText}>
                    <Link href={"#" + parsedText} passHref legacyBehavior>
                      <SidebarMenuButton className="h-auto py-1 text-[0.95rem]">{node.text}</SidebarMenuButton>
                    </Link>
                    {node.children && node.children.length > 0 && renderNodes(node.children)}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default TocSidebar;
