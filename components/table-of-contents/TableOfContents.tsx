import React from "react";

import {
  SidebarContent,
  SidebarContentLabel,
  SidebarRoot,
  SidebarSubcontent,
  SidebarSubcontentItem,
} from "@/components/sidebar/Sidebar.Partials";

import { slugify } from "@/shared/utils";

import { HeadingNodeProps } from "@/prepublish/tasks/generate-toc";

import { renderHeadingNodes } from "./TableOfContents.Partials";

interface TableOfContentsProps {
  tocObject: HeadingNodeProps[];
}

const TableOfContents = ({ tocObject }: TableOfContentsProps) => {
  return (
    <SidebarRoot>
      <SidebarContent className="sticky top-4 gap-1">
        <SidebarContentLabel>İçindekiler</SidebarContentLabel>
        <div>
          {tocObject.map((node) => {
            const parsedText: string = slugify(node.text);
            return (
              <React.Fragment key={parsedText}>
                <SidebarSubcontentItem link={"#" + parsedText}>{node.text}</SidebarSubcontentItem>
                {node.children && node.children.length > 0 && (
                  <SidebarSubcontent>{renderHeadingNodes(node.children)}</SidebarSubcontent>
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
