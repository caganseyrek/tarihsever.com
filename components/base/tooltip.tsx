"use client";

import React from "react";

import { Content, Portal, Provider, Root, Trigger } from "@radix-ui/react-tooltip";

import { cn } from "@/shared/utils";

const TooltipProvider = ({ ...props }: React.ComponentProps<typeof Provider>) => <Provider {...props} />;

const Tooltip = ({ ...props }: React.ComponentProps<typeof Root>) => <Root delayDuration={175} {...props} />;

const TooltipTrigger = ({ ...props }: React.ComponentProps<typeof Trigger>) => <Trigger {...props} />;

const TooltipContent = ({ className, ...props }: React.ComponentProps<typeof Content>) => {
  return (
    <Portal>
      <Content
        sideOffset={6}
        className={cn(
          "z-50 overflow-hidden rounded-md bg-primary-hover-background px-3 py-1.5 text-xs text-primary-lighter animate-in fade-in-0 zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
          "origin-[--radix-tooltip-content-transform-origin]",
          className,
        )}
        {...props}
      />
    </Portal>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
