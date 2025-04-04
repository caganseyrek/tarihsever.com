"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Check, LinkIcon } from "lucide-react";

import { Button } from "@/components/base/button";

import { cn, slugify } from "@/shared/utils";

import { coreMetadata } from "@/resources/data/metadata";

import { Components } from "@/types/globals";

const ContentHeading = ({
  as: Heading,
  hasAnchorLink = true,
  children,
  className,
}: Components.MDX.ContentHeadingProps) => {
  const pathname: string = usePathname();
  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  const headingId: string = slugify(children as string);

  return (
    <Heading id={headingId} className={cn("flex flex-row items-center justify-start gap-2", className)}>
      <Link href={"#" + headingId} className="hover:text-foreground">
        {children}
      </Link>
      {hasAnchorLink && (
        <Button
          disabled={isCopied}
          title={"Bu başlığa direkt linki kopyala"}
          className="p-1 h-auto border-0 bg-transparent text-primary hover:text-primary-lighter disabled:opacity-100"
          onClick={async () => {
            await navigator.clipboard.writeText(coreMetadata.base_url + pathname + "#" + headingId);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2500);
          }}>
          {isCopied ? <Check /> : <LinkIcon />}
          <span className="sr-only">Bu başlığa direkt linki kopyala</span>
        </Button>
      )}
    </Heading>
  );
};

export default ContentHeading;
