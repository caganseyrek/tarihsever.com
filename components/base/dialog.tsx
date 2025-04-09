"use client";

import React from "react";

import { Close, Content, Description, Overlay, Portal, Root, Title, Trigger } from "@radix-ui/react-dialog";
import { X as CloseIcon } from "lucide-react";

import { cn } from "@/shared/utils";

const Dialog = ({ ...props }: React.ComponentProps<typeof Root>) => <Root {...props} />;

const DialogTrigger = ({ ...props }: React.ComponentProps<typeof Trigger>) => <Trigger {...props} />;

const DialogClose = ({ className, ref, ...props }: React.ComponentProps<typeof Close>) => (
  <Close
    ref={ref}
    className={cn(
      "rounded-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors",
      "disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
      className,
    )}
    {...props}>
    <CloseIcon className="h-4 w-4 shrink-0" />
    <span className="sr-only">Close</span>
  </Close>
);

const DialogOverlay = ({ className, ref, ...props }: React.ComponentProps<typeof Overlay>) => (
  <Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
);

const DialogContent = ({
  className,
  children,
  hasCloseButton = true,
  ref,
  ...props
}: React.ComponentProps<typeof Content> & {
  hasCloseButton?: boolean;
}) => (
  <Portal>
    <DialogOverlay />
    <Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[20%] z-50 grid w-full max-w-lg translate-x-[-50%] gap-4 border bg-background p-4 shadow-lg duration-200",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        "sm:rounded-lg",
        className,
      )}
      {...props}>
      {children}
      {hasCloseButton && <DialogClose className="absolute right-4 top-4" />}
    </Content>
  </Portal>
);

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);

const DialogTitle = ({ className, ref, ...props }: React.ComponentProps<typeof Title>) => (
  <Title ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
);

const DialogDescription = ({ className, ref, ...props }: React.ComponentProps<typeof Description>) => (
  <Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
);

export { Dialog, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogDescription, DialogTitle };
