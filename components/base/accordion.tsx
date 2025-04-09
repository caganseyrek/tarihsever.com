"use client";

import React from "react";

import { Content, Item, Root, Trigger } from "@radix-ui/react-accordion";

import { cn } from "@/shared/utils";

const Accordion = ({ className, ...props }: React.ComponentProps<typeof Root>) => {
  return <Root className={cn("w-full", className)} {...props} />;
};

const AccordionItem = ({ children, ...props }: React.ComponentProps<typeof Item>) => <Item {...props}>{children}</Item>;

const AccordionTrigger = ({ className, children, ...props }: React.ComponentProps<typeof Trigger>) => (
  <Trigger className={cn(className)} {...props}>
    {children}
  </Trigger>
);

const AccordionContent = ({ className, children, ...props }: React.ComponentProps<typeof Content>) => (
  <Content
    className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}>
    <div className={cn(className)}>{children}</div>
  </Content>
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
