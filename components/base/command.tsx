"use client";

import React from "react";

import { Command as CommandComponent } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/shared/utils";

const Command = React.forwardRef<
  React.ComponentRef<typeof CommandComponent>,
  React.ComponentPropsWithoutRef<typeof CommandComponent>
>(({ className, ...props }, ref) => (
  <CommandComponent
    ref={ref}
    className={cn("flex h-full w-full flex-col overflow-hidden rounded-[7px] bg-container-background", className)}
    {...props}
  />
));
Command.displayName = CommandComponent.displayName;

const CommandInput = React.forwardRef<
  React.ComponentRef<typeof CommandComponent.Input>,
  React.ComponentPropsWithoutRef<typeof CommandComponent.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3">
    <Search className="mr-3 h-4 w-4 shrink-0 text-muted-foreground" />
    <CommandComponent.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = CommandComponent.Input.displayName;

const CommandList = React.forwardRef<
  React.ComponentRef<typeof CommandComponent.List>,
  React.ComponentPropsWithoutRef<typeof CommandComponent.List>
>(({ className, ...props }, ref) => (
  <CommandComponent.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));
CommandList.displayName = CommandComponent.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ComponentRef<typeof CommandComponent.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandComponent.Empty>
>((props, ref) => <CommandComponent.Empty ref={ref} className="py-6 text-center" {...props} />);
CommandEmpty.displayName = CommandComponent.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ComponentRef<typeof CommandComponent.Group>,
  React.ComponentPropsWithoutRef<typeof CommandComponent.Group>
>(({ className, ...props }, ref) => (
  <CommandComponent.Group
    ref={ref}
    className={cn(
      "w-full overflow-hidden p-2 flex flex-col items-start justify-start text-foreground",
      "[&_[cmdk-group-items]]:w-full",
      "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-xs",
      className,
    )}
    {...props}
  />
));
CommandGroup.displayName = CommandComponent.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ComponentRef<typeof CommandComponent.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandComponent.Separator>
>(({ className, ...props }, ref) => (
  <CommandComponent.Separator ref={ref} className={cn("-mx-1 h-px bg-container-border", className)} {...props} />
));
CommandSeparator.displayName = CommandComponent.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ComponentRef<typeof CommandComponent.Item>,
  React.ComponentPropsWithoutRef<typeof CommandComponent.Item>
>(({ className, ...props }, ref) => (
  <CommandComponent.Item
    ref={ref}
    className={cn(
      "flex items-center cursor-pointer gap-2 select-none rounded-sm h-9 px-3 py-2.5 text-sm",
      "text-muted-foreground hover:bg-primary-hover-background hover:text-primary-lighter",
      "data-[disabled=true]:pointer-events-none",
      "data-[selected=true]:bg-primary-hover-background data-[selected=true]:text-primary-lighter",
      "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className,
    )}
    {...props}
  />
));
CommandItem.displayName = CommandComponent.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
};
