import React from "react";

import { SidebarGroupSub, SidebarItem as SidebarGroupSubItem } from "@/components/sidebars/sidebar.common";

import { slugify } from "@/shared/utils";

import { Globals } from "@/types/globals";

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

export { renderHeadingNodes };
