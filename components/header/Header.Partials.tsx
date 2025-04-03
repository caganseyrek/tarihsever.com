import React from "react";

import Link from "next/link";

import { Search } from "lucide-react";

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

import { cn } from "@/shared/utils";

import { ComponentTypes, Globals } from "@/types/globals";

interface SidebarHeaderNavItemProps extends Omit<ComponentTypes.BaseWrapperProps, "children"> {
  linkDetails: Globals.LinkProps;
}

const HeaderRoot = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return (
    <header className={cn("w-full bg-container-background/90 border-b border-border/80 mb-4", className)}>
      {children}
    </header>
  );
};

const HeaderWrapper = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return (
    <div className={cn("w-[1344px] m-auto p-4 gap-10 flex flex-row items-center justify-between", className)}>
      {children}
    </div>
  );
};

const HeaderTitle = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return (
    <div
      className={cn(
        "[&>h1]:text-3xl [&>h1]:font-semibold [&>h1]:tracking-tighter [&>h1]:select-none",
        "[&>h1>span]:text-primary",
        "flex flex-row items-center justify-center gap-2",
        className,
      )}>
      {children}
    </div>
  );
};

const HeaderRightSection = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return <div className={cn("flex flex-row items-center justify-center gap-1", className)}>{children}</div>;
};

const HeaderNavItem = ({ className, linkDetails }: SidebarHeaderNavItemProps) => {
  return (
    <Link href={linkDetails.path} className="w-full">
      <Button variant="ghost" className={cn("w-full justify-start", className)}>
        {linkDetails.title}
      </Button>
    </Link>
  );
};

const HeaderSearchDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="justify-start w-[400px] bg-border border-0">
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

export { HeaderRoot, HeaderWrapper, HeaderTitle, HeaderRightSection, HeaderNavItem, HeaderSearchDialog };
