"use client";

import React from "react";

import { Close, Content, Description, Overlay, Portal, Root, Title, Trigger } from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { ChevronsLeft } from "lucide-react";

import { cn } from "@/shared/utils";

import type { Components } from "@/types/globals";

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-container-background p-4 transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        left: "inset-y-0 left-0 h-full max-w-1/2 max-[650px]:max-w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        right:
          "inset-y-0 right-0 h-full max-w-1/2 max-[650px]:max-w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
      },
    },
    defaultVariants: { side: "right" },
  },
);

const Sheet = ({ ...props }: React.ComponentProps<typeof Root>) => <Root {...props} />;

const SheetTrigger = ({ ...props }: React.ComponentProps<typeof Trigger>) => <Trigger {...props} />;

const SheetClose = ({ className, ref, ...props }: React.ComponentProps<typeof Close>) => (
  <Close
    ref={ref}
    className={cn(
      "rounded-sm text-muted-foreground hover:text-foreground transition-colors bg-container-inner-item-background border size-6 flex items-center justify-center opacity-70 cursor-pointer disabled:pointer-events-none",
      className,
    )}
    {...props}>
    <ChevronsLeft className="size-4 shrink-0" /> <span className="sr-only">Close</span>
  </Close>
);

const SheetPortal = ({ ...props }: React.ComponentProps<typeof Portal>) => <Portal {...props} />;

const SheetOverlay = ({ className, ref, ...props }: React.ComponentProps<typeof Overlay>) => (
  <Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
);

const SheetContent = ({ side = "right", ref, className, children, ...props }: Components.SheetContentProps) => (
  <SheetPortal>
    <SheetOverlay />
    <Content
      ref={ref}
      className={cn(sheetVariants({ side }), "w-full flex flex-col items-start justify-self-auto gap-4", className)}
      {...props}>
      {children}
    </Content>
  </SheetPortal>
);

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("w-full flex flex-row items-center justify-between", className)} {...props} />
);

const SheetTitle = ({ className, ref, ...props }: React.ComponentProps<typeof Title>) => (
  <Title ref={ref} className={cn("w-full flex flex-row items-center justify-start gap-2", className)} {...props} />
);

const SheetDescription = ({ className, ref, ...props }: React.ComponentProps<typeof Description>) => (
  <Description
    ref={ref}
    className={cn("w-full flex flex-row items-center justify-start gap-2", className)}
    {...props}
  />
);

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  sheetVariants,
};
