"use client";

import React from "react";

import Link from "next/link";

import { Command } from "cmdk";
import { ChevronRight, Search } from "lucide-react";

import { cn } from "@/shared/utils";

import type { LinkProps } from "@/types/globals";

interface CommandArticleItemProps {
  topicTitle: string;
  subtopicTitle: string;
  article: LinkProps;
}

const CommandRoot = ({ className, children, ...props }: React.ComponentProps<typeof Command>) => {
  return (
    <Command
      className={cn("flex h-full w-full flex-col overflow-hidden rounded-[7px] bg-container-background", className)}
      {...props}>
      {children}
    </Command>
  );
};

const CommandList = ({ className, children, ...props }: React.ComponentProps<typeof Command.List>) => {
  return (
    <Command.List className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)} {...props}>
      {children}
    </Command.List>
  );
};

const CommandEmpty = ({ className, children, ...props }: React.ComponentProps<typeof Command.Empty>) => {
  return (
    <Command.Empty className={cn("py-6 text-center", className)} {...props}>
      {children}
    </Command.Empty>
  );
};

const CommandSeparator = ({ className, children, ...props }: React.ComponentProps<typeof Command.Separator>) => {
  return (
    <Command.Separator className={cn("-mx-1 h-px bg-container-border", className)} {...props}>
      {children}
    </Command.Separator>
  );
};

const CommandInput = ({ placeholder }: React.ComponentProps<typeof Command.Input>) => {
  return (
    <div className="flex items-center border-b px-3">
      <Search className="mr-3 h-4 w-4 shrink-0" />
      <Command.Input
        placeholder={placeholder}
        className="flex h-10 w-full rounded-md bg-transparent py-3 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
      />
    </div>
  );
};

const CommandGroup = ({ children, className, heading }: React.ComponentProps<typeof Command.Group>) => {
  return (
    <Command.Group
      heading={heading}
      className={cn(
        "w-full overflow-hidden p-2 flex flex-col items-start justify-start text-foreground",
        "[&_[cmdk-group-items]]:w-full",
        "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-xs",
        className,
      )}>
      {children}
    </Command.Group>
  );
};

const CommandItem = ({ className, children, asChild }: React.ComponentProps<typeof Command.Item>) => {
  return (
    <Command.Item
      className={cn(
        "flex items-center cursor-pointer gap-2 select-none rounded-sm h-9 px-3 py-2.5 text-sm",
        "text-muted-foreground hover:bg-primary-hover-background hover:text-primary-lighter",
        "data-[disabled=true]:pointer-events-none",
        "data-[selected=true]:bg-primary-hover-background data-[selected=true]:text-primary-lighter",
        "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      asChild={asChild}>
      {children}
    </Command.Item>
  );
};

const CommandArticleItem = ({ topicTitle, subtopicTitle, article }: CommandArticleItemProps) => {
  return (
    <CommandItem asChild className="gap-0.5">
      <Link
        href={article.path}
        className="max-[400px]:flex max-[400px]:flex-col max-[400px]:items-start max-[400px]:justify-start max-[400px]:h-auto">
        <span>{article.title}</span>
        <span className="w-full text-xs text-muted-foreground/70 flex items-start justify-end max-[400px]:justify-start">
          <span className="truncate" title={topicTitle}>
            {topicTitle}
          </span>
          <ChevronRight />
          <span className="truncate" title={subtopicTitle}>
            {subtopicTitle}
          </span>
        </span>
      </Link>
    </CommandItem>
  );
};

export {
  CommandRoot,
  CommandList,
  CommandEmpty,
  CommandSeparator,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandArticleItem,
};
