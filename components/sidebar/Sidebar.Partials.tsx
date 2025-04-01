import React from "react";

import Link from "next/link";

import { ChevronDown, Search } from "lucide-react";

import { Button } from "@/components/base/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/base/dialog";
import { DialogHeader } from "@/components/base/dialog";
import { Input } from "@/components/base/input";

import { NavigationLinkProps } from "@/shared/data/navigationLinks";
import { cn } from "@/shared/twUtils";

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

interface SidebarHeaderNavItemProps extends Omit<ComponentTypes.BaseWrapperProps, "children"> {
  linkDetails: NavigationLinkProps;
}

const SidebarRoot = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return (
    <aside
      className={cn(
        "w-[18rem] flex flex-col items-start justify-start border rounded-lg bg-container-background",
        className,
      )}>
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

const SidebarHeaderNavItem = ({ className, linkDetails }: SidebarHeaderNavItemProps) => {
  return (
    <Link href={linkDetails.path} className="w-full">
      <Button variant="ghost" className={cn("w-full justify-start", className)}>
        <linkDetails.icon /> {linkDetails.title}
      </Button>
    </Link>
  );
};

const SidebarContent = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return (
    <div className={cn("w-full max-w-full flex min-h-0 flex-col gap-8 overflow-auto p-4", className)}>{children}</div>
  );
};

const SidebarContentLabel = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return (
    <span
      className={cn(
        "flex items-center gap-1.5 px-2.5 pb-1.5 text-xs font-medium text-muted-foreground/65 [&>svg]:size-4",
        className,
      )}>
      {children}
    </span>
  );
};

const SidebarContentItem = (props: SidebarContentItemProps) => {
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
    <div className={cn("w-full flex flex-row items-center justify-between", props.className)}>
      <span className="max-w-[12.75rem] truncate font-medium" title={props.title}>
        {props.title}
      </span>
      <ChevronDown />
    </div>
  );
};

const SidebarSubcontent = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return <div className={cn("border-l ml-2.5 pl-1.5 mb-2 box-border w-[calc(100%-10px)]", className)}>{children}</div>;
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

const SearchDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="justify-start w-full bg-border border-0">
          <Search /> Tarihsever&apos;de Ara...
        </Button>
      </DialogTrigger>
      <DialogContent hasCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>Sayfayı Paylaş</DialogTitle>
          <DialogDescription>Aşağıdaki kısa link ile bu sayfaya kolayca ulaşabilirsiniz.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-row items-center justify-center gap-2">
          <Input
            className="justify-start rounded-sm"
            placeholder="Tarihsever'de Ara..."
            // onKeyUp={(e) => setSearchQuery(e.currentTarget.value)}
          />
          <DialogClose className="border min-w-9 min-h-9 flex items-center justify-center" />
        </div>
        {/* <div className="flex flex-col items-center justify-start gap-2">
          {results.length > 0 ? (
            results.map((result) => (
              <div key={result.key}>
                <h3>{result.title}</h3>
                <p>{result.topic}</p>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export {
  SidebarRoot,
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarHeaderNav,
  SidebarHeaderNavItem,
  SidebarContent,
  SidebarContentLabel,
  SidebarContentItem,
  SidebarSubcontent,
  SidebarSubcontentItem,
  SearchDialog,
};
