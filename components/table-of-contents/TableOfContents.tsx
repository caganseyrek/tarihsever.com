import React from "react";

import {
  SidebarContent,
  SidebarContentLabel,
  SidebarRoot,
  SidebarSubcontent,
  SidebarSubcontentItem,
} from "@/components/sidebar/Sidebar.Partials";
import TocGenerator, { HeadingNode } from "@/components/table-of-contents/tableOfContents.generator";

import { ShareDialog } from "./TableOfContents.Partials";
import { parseText, renderNodes } from "./TableOfContents.Utils";

export interface TocSidebarProps {
  pageContent: React.ReactNode;
}

const TableOfContents = () => {
  const headingNodes: HeadingNode[] = TocGenerator.generateNodes([]);

  return (
    <SidebarRoot className="border-0 bg-transparent">
      <ShareDialog />
      <SidebarContent className="sticky top-2">
        <SidebarContentLabel>İçindekiler</SidebarContentLabel>
        <div>
          {headingNodes.map((node) => {
            const parsedText: string = parseText(node.text);
            return (
              <React.Fragment key={parsedText}>
                <SidebarSubcontentItem link={"#" + parsedText}>{node.text}</SidebarSubcontentItem>
                {node.children && node.children.length > 0 && (
                  <SidebarSubcontent>{renderNodes(node.children)}</SidebarSubcontent>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </SidebarContent>
    </SidebarRoot>
  );
};

export default TableOfContents;
