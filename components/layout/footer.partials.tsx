import React from "react";

import { cn } from "@/shared/utils";

import { Components } from "@/types/globals";

const FooterRoot = ({ children, className }: Components.BaseWrapperProps) => {
  return (
    <footer className={cn("w-full border-t flex flex-col items-center justify-center text-[0.965rem]", className)}>
      {children}
    </footer>
  );
};

const FooterText = ({ children, className }: Components.BaseWrapperProps) => {
  return (
    <div
      className={cn(
        "w-[46rem] text-pretty text-muted-foreground p-4 text-center",
        "[&>a]:text-primary [&>a]:hover:text-primary-lighter [&>a]:transition-colors",
        className,
      )}>
      {children}
    </div>
  );
};

const FooterLicenseContainer = ({ children, className }: Components.BaseWrapperProps) => {
  return (
    <div className={cn("w-full border-t bg-container-background flex items-center justify-center", className)}>
      {children}
    </div>
  );
};

export { FooterRoot, FooterText, FooterLicenseContainer };
