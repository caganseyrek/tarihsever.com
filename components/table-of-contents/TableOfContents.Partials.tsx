import React from "react";

import { SidebarSubcontent, SidebarSubcontentItem } from "@/components/sidebar/Sidebar.Partials";

import { slugify } from "@/shared/utils";

import { HeadingNodeProps } from "@/prepublish/tasks/generate-toc";

const renderHeadingNodes = (nodes: HeadingNodeProps[]) => {
  return nodes.map((node) => {
    const parsedText: string = slugify(node.text);
    return (
      <React.Fragment key={parsedText}>
        <SidebarSubcontentItem link={"#" + parsedText}>{node.text}</SidebarSubcontentItem>
        {node.children && node.children.length > 0 && (
          <SidebarSubcontent>{renderHeadingNodes(node.children)}</SidebarSubcontent>
        )}
      </React.Fragment>
    );
  });
};

export { renderHeadingNodes };
