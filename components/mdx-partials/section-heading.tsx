"use client";

import React from "react";

import { usePathname } from "next/navigation";

import { Check, Link2 } from "lucide-react";

import { Button } from "@/components/base/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/base/tooltip";

import { useClipboard } from "@/hooks/use-clipboard";

import { absoluteLink, cn, slugify } from "@/shared/utils";

interface ContentHeadingProps {
  as: "h1" | "h2" | "h3" | "h4" | "h5";
  hasAnchorLink?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ContentHeading = ({ as: Heading, children, className }: ContentHeadingProps) => {
  const pathname: string = usePathname();
  const { isCopied, copyToClipboard } = useClipboard();

  const headingId: string = slugify(children as string);

  return (
    <Heading id={headingId} className={cn("flex flex-row items-center justify-start gap-2 group", className)}>
      {children}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              disabled={isCopied}
              className="p-1.5 h-auto text-primary disabled:opacity-100"
              onClick={async () => {
                const anchorLink: string = absoluteLink(`${pathname}#${headingId}`);
                await copyToClipboard(anchorLink);
              }}>
              {isCopied ? <Check /> : <Link2 />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Başlığın linkini kopyala</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Heading>
  );
};

export { ContentHeading };
