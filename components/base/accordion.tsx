"use client";

import React from "react";

import { Content, Header, Item, Root, Trigger } from "@radix-ui/react-accordion";

import { cn } from "@/shared/twUtils";

const Accordion = React.forwardRef<React.ComponentRef<typeof Root>, React.ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => (
    <Root ref={ref} className={cn("w-full flex flex-col items-start justify-start gap-0.5", className)} {...props} />
  ),
);
Accordion.displayName = Root.displayName;

const AccordionItem = Item;

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(({ className, children, ...props }, ref) => (
  <Header className="flex">
    <Trigger ref={ref} className={cn("[&[data-state=open]>svg]:rotate-180", className)} {...props}>
      {children}
    </Trigger>
  </Header>
));
AccordionTrigger.displayName = Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, children, ...props }, ref) => (
  <Content
    ref={ref}
    className="overflow-hidden text-sm py-0.5 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}>
    <div className={cn(className)}>{children}</div>
  </Content>
));
AccordionContent.displayName = Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
