import React from "react";

import { SidebarSubcontent, SidebarSubcontentItem } from "@/components/sidebar/Sidebar.Partials";
import { HeadingNode } from "@/components/table-of-contents/tableOfContents.generator";

const parseText = (text: string): string =>
  text
    .replace(/[/()'",.;]/g, "")
    .replaceAll(" ", "-")
    .toLowerCase();

const renderNodes = (nodes: HeadingNode[]) => {
  return nodes.map((node) => {
    const parsedText: string = parseText(node.text);
    return (
      <React.Fragment key={parsedText}>
        <SidebarSubcontentItem link={"#" + parsedText}>{node.text}</SidebarSubcontentItem>
        {node.children && node.children.length > 0 && (
          <SidebarSubcontent>{renderNodes(node.children)}</SidebarSubcontent>
        )}
      </React.Fragment>
    );
  });
};

export { parseText, renderNodes };
