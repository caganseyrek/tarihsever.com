import React from "react";

import Link from "next/link";

import { cn } from "@/shared/utils";

const HeaderRoot = ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <header id="top" className={cn("w-full bg-container-background border-b border-border", className)} {...props}>
      {children}
    </header>
  );
};

const HeaderContainer = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("w-[1344px] m-auto p-4 gap-10 flex flex-row items-center justify-between", className)}
      {...props}>
      {children}
    </div>
  );
};

const HeaderTitleLink = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  return (
    <Link href="/" className={cn("flex flex-row items-center justify-center gap-2", className)}>
      {children}
    </Link>
  );
};

const HeaderMenuContainer = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex flex-row items-center justify-center gap-1", className)} {...props}>
      {children}
    </div>
  );
};

export { HeaderRoot, HeaderContainer, HeaderTitleLink, HeaderMenuContainer };
