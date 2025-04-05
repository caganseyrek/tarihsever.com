import React from "react";

import Link from "next/link";

import { ArrowUp } from "lucide-react";

import { cn, slugify } from "@/shared/utils";

import { Components } from "@/types/globals";

const SourcesContainer = ({ children, className }: Components.BaseWrapperProps) => {
  return <ol className={cn("flex flex-col items-start justify-start gap-6 list-inside p-0", className)}>{children}</ol>;
};

const SourcesContainerItem = ({ children, className, id }: Components.MDX.SourcesItemProps) => {
  return (
    <li id={id} className={cn("w-full marker:font-semibold", className)}>
      {children}
    </li>
  );
};

const SourcesLinkContainer = ({ children, className }: Components.BaseWrapperProps) => {
  return <ul className={cn("bg-container-background py-2 mt-2 border rounded-md", className)}>{children}</ul>;
};

const SourcesLinkContainerItem = ({ prefix, link }: Components.MDX.SourcesLinkContainerItemProps) => {
  return (
    <li>
      {prefix}{" "}
      <Link href={link} target="_blank">
        {link}
      </Link>
    </li>
  );
};

const BackToHeading = ({ className, sourceOrigin, hoverTitle }: Components.MDX.BackToHeadingProps) => {
  return (
    <Link href={"#" + slugify(sourceOrigin)} title={hoverTitle} className={cn("mx-0.5 px-1", className)}>
      <ArrowUp className="size-4.5 mb-0.5 inline text-foreground hover:text-primary transition-colors" />
    </Link>
  );
};

export { SourcesContainer, SourcesContainerItem, SourcesLinkContainer, SourcesLinkContainerItem, BackToHeading };
