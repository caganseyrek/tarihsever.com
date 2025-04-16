"use client";

import React from "react";

import { LinkedButton as SidebarLink } from "@/components/base/button";

import { SidebarItem, SidebarItemSub } from "@/components/partials/sidebar.partials";

import { slugify } from "@/shared/utils";

import type { TableOfContentsProps } from "@/types/globals";

const TableOfContents = ({ tocObject }: TableOfContentsProps) => {
  // const [activeId, setActiveId] = React.useState<string | null>(null);

  // React.useEffect(() => {
  //   const observer: IntersectionObserver = new IntersectionObserver(
  //     (entries) => {
  //       const visibleHeadings: IntersectionObserverEntry[] = entries
  //         .filter((entry) => entry.isIntersecting)
  //         .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

  //       if (visibleHeadings.length > 0) {
  //         const id: string = visibleHeadings[0].target.id;
  //         setActiveId(id);
  //       }
  //     },
  //     { rootMargin: "0px 0px -70% 0px", threshold: [0.1, 0.5, 1] },
  //   );

  //   const headingElements = Array.from(document.querySelectorAll("h2, h3, h4")) as HTMLElement[];
  //   headingElements.forEach((element) => observer.observe(element));

  //   return () => observer.disconnect();
  // }, []);

  const renderHeadingNodes = (nodes: TableOfContentsProps["tocObject"]) => {
    return nodes.map((node) => {
      const parsedText: string = slugify(node.text);
      return (
        <SidebarItem key={parsedText}>
          <SidebarLink link={"#" + parsedText} aria-level={node.level}>
            {node.text}
          </SidebarLink>
          {node.children && node.children.length > 0 && (
            <SidebarItemSub>{renderHeadingNodes(node.children)}</SidebarItemSub>
          )}
        </SidebarItem>
      );
    });
  };
  return tocObject.map((node) => {
    const parsedText: string = slugify(node.text);
    return (
      <SidebarItem key={parsedText}>
        <SidebarLink link={"#" + parsedText} aria-level={node.level}>
          {node.text}
        </SidebarLink>
        {node.children && node.children.length > 0 && (
          <SidebarItemSub>{renderHeadingNodes(node.children)}</SidebarItemSub>
        )}
      </SidebarItem>
    );
  });
};

export { TableOfContents };
