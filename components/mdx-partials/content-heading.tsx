"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Check, Hash } from "lucide-react";

import { Button } from "@/components/base/button";

import { coreMetadata } from "@/contents/data/site-metadata";

import { cn, slugify } from "@/shared/utils";

import type { Components } from "@/types/globals";

const COPY_HELPER_LABEL: string = "Bu başlığa direkt linki kopyala";

const ContentHeading = ({ as: Heading, hasAnchorLink = true, children, className }: Components.ContentHeadingProps) => {
  const pathname: string = usePathname();
  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  const headingId: string = slugify(children as string);

  return (
    <Heading id={headingId} className={cn("flex flex-row items-center justify-start gap-2", className)}>
      {Heading === "h1" ? (
        children
      ) : (
        <Link href={"#" + headingId} className="hover:text-foreground">
          {children}
        </Link>
      )}
      {hasAnchorLink && (
        <Button
          disabled={isCopied}
          title={COPY_HELPER_LABEL}
          className="p-1 h-auto border-0 bg-transparent text-primary hover:text-primary-lighter disabled:opacity-100"
          onClick={async () => {
            await navigator.clipboard.writeText(coreMetadata.base_url + pathname + "#" + headingId);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2500);
          }}>
          {isCopied ? <Check /> : <Hash />}
          <span className="sr-only">{COPY_HELPER_LABEL}</span>
        </Button>
      )}
    </Heading>
  );
};

export { ContentHeading };
