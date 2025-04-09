import React from "react";

import { cn } from "@/shared/utils";

const CustomPageRoot = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("w-[100vw] h-[100vh] flex items-center justify-center", className)} {...props}>
      {children}
    </div>
  );
};

const CustomPageContainer = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 pb-[70px]", className)} {...props}>
      {children}
    </div>
  );
};

const CustomPageTitle = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <h1 className={cn("text-2xl font-semibold tracking-tight", className)} {...props}>
      {children}
    </h1>
  );
};

const CustomPageDescription = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("text-muted-foreground", className)} {...props}>
      {children}
    </div>
  );
};

export { CustomPageRoot, CustomPageContainer, CustomPageTitle, CustomPageDescription };
