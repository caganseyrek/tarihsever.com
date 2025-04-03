import React from "react";

import Link from "next/link";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/base/button";

import { cn } from "@/shared/utils";

import { ComponentTypes } from "@/types/globals";

interface SidebarSubcontentItemProps {
  className?: string;
  children?: string;
  link: string;
  buttonVariant?: "default" | "ghost";
  buttonSize?: "default" | "ghost" | "icon";
}

type SidebarContentItemProps =
  | {
      asButton: true;
      className?: string;
      children?: string;
      link: string;
      buttonVariant?: "default" | "ghost";
      buttonSize?: "default" | "ghost" | "icon";
    }
  | {
      asButton?: false;
      className?: string;
      title: string;
    };

const SidebarRoot = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return (
    <aside className={cn("w-[16rem] min-w-[16rem] flex flex-col items-start justify-start", className)}>
      {children}
    </aside>
  );
};

const SidebarHeader = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return (
    <div className={cn("w-full flex flex-col items-start justify-start gap-4 p-4 border-b", className)}>{children}</div>
  );
};

const SidebarHeaderTitle = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return (
    <div
      className={cn(
        "w-full flex flex-row items-center justify-start gap-2 px-1 py-0.5",
        "[&>h1]:text-3xl [&>h1]:font-semibold [&>h1]:tracking-tighter [&>h1]:select-none",
        "[&>h1>span]:text-primary",
        className,
      )}>
      {children}
    </div>
  );
};

const SidebarHeaderNav = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return <nav className={cn("w-full flex flex-col items-start justify-start gap-0.5", className)}>{children}</nav>;
};

const SidebarContent = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return <div className={cn("w-full max-w-full flex min-h-0 flex-col gap-8 overflow-auto", className)}>{children}</div>;
};

const SidebarContentLabel = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return (
    <span className={cn("flex items-center gap-1.5 px-2.5 pb-1.5 font-medium [&>svg]:size-4", className)}>
      {children}
    </span>
  );
};

const SidebarContentItem = (props: SidebarContentItemProps): React.ReactNode => {
  if (props.asButton) {
    return (
      <Link href={props.link}>
        <Button
          variant={props.buttonVariant ?? "default"}
          size={props.buttonSize ?? "default"}
          className={cn("w-full justify-start truncate", props.className)}
          title={props.children}>
          <span className="truncate">{props.children}</span>
        </Button>
      </Link>
    );
  }
  return (
    <div
      className={cn(
        "w-full flex flex-row items-center justify-between [&[data-state=open]_svg]:rotate-180",
        props.className,
      )}>
      <span className="max-w-[12.75rem] truncate" title={props.title}>
        {props.title}
      </span>
      <ChevronDown />
    </div>
  );
};

const SidebarSubcontent = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return <div className={cn("border-l ml-3 pl-1.5 mb-2 box-border w-[calc(100%-12px)]", className)}>{children}</div>;
};

const SidebarSubcontentItem = ({
  children,
  className,
  link,
  buttonVariant = "ghost",
  buttonSize = "ghost",
}: SidebarSubcontentItemProps) => {
  return (
    <Link href={link}>
      <Button
        variant={buttonVariant}
        size={buttonSize}
        className={cn("w-full justify-start truncate text-muted-foreground", className)}
        title={children}>
        <span className="truncate">{children}</span>
      </Button>
    </Link>
  );
};

export {
  SidebarRoot,
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarHeaderNav,
  SidebarContent,
  SidebarContentLabel,
  SidebarContentItem,
  SidebarSubcontent,
  SidebarSubcontentItem,
};
