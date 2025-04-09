import React from "react";

import { cn } from "@/shared/utils";

const Input = ({ className, type, ref, ...props }: React.ComponentProps<"input">) => (
  <input
    type={type}
    className={cn(
      "flex h-9 w-full rounded-md p-2.5 border border-container-border bg-transparent transition-colors",
      "placeholder:text-muted-foreground",
      "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      className,
    )}
    ref={ref}
    {...props}
  />
);

export { Input };
