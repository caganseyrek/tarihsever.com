import React from "react";

import { ChevronDown, List } from "lucide-react";

import { Button } from "@/components/base/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/base/collapsible";

import { TableOfContents } from "@/components/table-of-contents";

import type { TableOfContentsProps } from "@/types/globals";

const MobileTableOfContents = ({ tocObject }: TableOfContentsProps) => {
  return (
    <Collapsible className="mb-3 hidden max-[1050px]:inline-block border rounded-md bg-container-background">
      <CollapsibleTrigger asChild>
        <Button className="w-full justify-between text-sm border-0">
          <span className="flex flex-row items-center justify-start gap-2">
            <List /> Bu Yazıdaki Başlıklar
          </span>
          <ChevronDown />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t">
        <div className="p-2 text-sm [&_a]:rounded-sm">
          <TableOfContents tocObject={tocObject} />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
export { MobileTableOfContents };
