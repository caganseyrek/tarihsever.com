import React from "react";

import { cn } from "@/shared/utils";

import type { Components } from "@/types/globals";

const TarihseverTitle = ({ variant, className }: Components.TarihseverTitleProps) => {
  return (
    <h1
      className={cn(
        variant === "large" ? "text-4xl" : "text-3xl",
        "font-semibold tracking-tighter select-none [&>span]:text-primary",
        className,
      )}>
      Tarih<span>sever</span>
    </h1>
  );
};

export default TarihseverTitle;
