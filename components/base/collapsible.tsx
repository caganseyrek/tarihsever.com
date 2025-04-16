"use client";

import React from "react";

import { Content, Root, Trigger } from "@radix-ui/react-collapsible";

import { cn } from "@/shared/utils";

const Collapsible = ({ children, className, ...props }: React.ComponentProps<typeof Root>) => {
  return (
    <Root className={cn(className)} {...props}>
      {children}
    </Root>
  );
};

const CollapsibleTrigger = ({ children, className, ...props }: React.ComponentProps<typeof Trigger>) => {
  return (
    <Trigger
      className={cn(
        "[&[data-state=open]>svg]:-rotate-180 [&>svg]:transition-transform [&>svg]:duration-200",
        className,
      )}
      {...props}>
      {children}
    </Trigger>
  );
};

const CollapsibleContent = ({ children, className, ...props }: React.ComponentProps<typeof Content>) => {
  return (
    <Content
      className={cn(
        "overflow-hidden",
        "data-[state=closed]:animate-collapsible-up",
        "data-[state=open]:animate-collapsible-down",
        className,
      )}
      {...props}>
      {children}
    </Content>
  );
};

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
