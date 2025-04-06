"use client";

import React from "react";

import Link from "next/link";

import { Button } from "@/components/base/button";

import { cn } from "@/shared/utils";

import type { Components } from "@/types/globals";

const HeaderRoot = ({ children, className }: Components.BaseWrapperProps) => {
  return (
    <header id="top" className={cn("w-full bg-container-background border-b border-border", className)}>
      {children}
    </header>
  );
};

const HeaderWrapper = ({ children, className }: Components.BaseWrapperProps) => {
  return (
    <div className={cn("w-[1344px] m-auto p-4 gap-10 flex flex-row items-center justify-between", className)}>
      {children}
    </div>
  );
};

const HeaderTitle = ({ children, className }: Components.BaseWrapperProps) => {
  return <div className={cn("flex flex-row items-center justify-center gap-2", className)}>{children}</div>;
};

const HeaderRightSection = ({ children, className }: Components.BaseWrapperProps) => {
  return <div className={cn("flex flex-row items-center justify-center gap-1", className)}>{children}</div>;
};

const HeaderNavItem = ({ className, linkDetails }: Components.HeaderNavItemProps) => {
  return (
    <Link href={linkDetails.path} className="w-full">
      <Button variant="ghost" className={cn("w-full justify-start", className)}>
        {linkDetails.title}
      </Button>
    </Link>
  );
};

export { HeaderRoot, HeaderWrapper, HeaderTitle, HeaderRightSection, HeaderNavItem };
