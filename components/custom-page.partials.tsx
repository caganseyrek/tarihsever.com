import React from "react";

import { cn } from "@/shared/utils";

import { Components } from "@/types/globals";

const CustomPageRoot = ({ children, className }: Components.BaseWrapperProps) => {
  return <div className={cn("w-[100vw] h-[100vh] flex items-center justify-center", className)}>{children}</div>;
};

const CustomPageContainer = ({ children, className }: Components.BaseWrapperProps) => {
  return <div className={cn("flex flex-col items-center justify-center gap-3 pb-[70px]", className)}>{children}</div>;
};

const CustomPageTitle = ({ children, className }: Components.BaseWrapperProps) => {
  return <h1 className={cn("text-2xl font-semibold tracking-tight", className)}>{children}</h1>;
};

const CustomPageDescription = ({ children, className }: Components.BaseWrapperProps) => {
  return <div className={cn("text-muted-foreground", className)}>{children}</div>;
};

export { CustomPageRoot, CustomPageContainer, CustomPageTitle, CustomPageDescription };
