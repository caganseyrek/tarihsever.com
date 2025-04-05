import React from "react";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupSub,
  SidebarItem,
  SidebarRoot,
} from "@/components/sidebars/sidebar.common";
import { renderHeadingNodes } from "@/components/sidebars/table-of-contents.partials";

import { slugify } from "@/shared/utils";

import { Components } from "@/types/globals";

const TableOfContents = ({ tocObject }: Components.TableOfContentsProps) => {
  return (
    <SidebarRoot>
      <SidebarContent className="sticky top-4 gap-1">
        <SidebarGroup>
          <SidebarGroupLabel>İçindekiler</SidebarGroupLabel>
          <SidebarGroupContent className="max-h-[calc(100dvh-4.5rem)] overflow-scroll">
            {tocObject.map((node) => {
              const parsedText: string = slugify(node.text);
              return (
                <React.Fragment key={parsedText}>
                  <SidebarItem link={"#" + parsedText}>{node.text}</SidebarItem>
                  {node.children && node.children.length > 0 && (
                    <SidebarGroupSub>{renderHeadingNodes(node.children)}</SidebarGroupSub>
                  )}
                </React.Fragment>
              );
            })}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarRoot>
  );
};

export default TableOfContents;
