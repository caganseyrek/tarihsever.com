import React from "react";

import Link from "next/link";

import { ArrowUp } from "lucide-react";

import { cn, slugify } from "@/shared/utils";

import { ComponentTypes } from "@/types/globals";

interface SourcesItemProps extends ComponentTypes.BaseWrapperProps {
  id: string;
}

interface BackToHeadingProps {
  className?: string;
  sourceOrigin: string;
  hoverTitle: string;
}
interface SourcesLinkContainerItemProps {
  prefix: string;
  link: string;
}

const SourcesContainer = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return <ol className={cn("flex flex-col items-start justify-start gap-2", className)}>{children}</ol>;
};

const SourcesContainerItem = ({ children, className, id }: SourcesItemProps) => {
  return (
    <li id={id} className={cn("w-full marker:font-semibold", className)}>
      {children}
    </li>
  );
};

const SourcesLinkContainer = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return <ul className={cn("bg-container-background py-2 border rounded-md", className)}>{children}</ul>;
};

const SourcesLinkContainerItem = ({ prefix, link }: SourcesLinkContainerItemProps) => {
  return (
    <li>
      {prefix}{" "}
      <Link href={link} target="_blank">
        {link}
      </Link>
    </li>
  );
};

const BackToHeading = ({ className, sourceOrigin, hoverTitle }: BackToHeadingProps) => {
  return (
    <Link href={"#" + slugify(sourceOrigin)} title={hoverTitle} className={cn("mx-0.5 px-1", className)}>
      <ArrowUp className="size-4.5 inline text-foreground hover:text-primary transition-colors" />
    </Link>
  );
};

export { SourcesContainer, SourcesContainerItem, SourcesLinkContainer, SourcesLinkContainerItem, BackToHeading };
