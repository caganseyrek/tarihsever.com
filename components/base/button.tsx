import React from "react";

import Link from "next/link";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

interface LinkedButtonProps {
  link: string;
  children?: string;
  className?: string;
  toggled?: boolean;
}

const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-md transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border border-container-border bg-container-background text-muted-foreground hover:text-foreground",
        ghost: "text-muted-foreground hover:bg-primary-hover-background hover:text-primary-lighter",
      },
      size: {
        default: "h-9 p-2.5",
        ghost: "h-9 px-3 py-2.5",
        icon: "h-9 w-9 shrink-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & ButtonProps) => {
  const Component = asChild ? Slot : "button";
  return <Component className={cn(buttonVariants({ variant, size, className }))} {...props} />;
};

const LinkedButton = ({ link, className, children, toggled = false }: LinkedButtonProps) => {
  return (
    <Button variant="ghost" className={cn("w-full justify-start", toggled && "text-primary", className)} asChild>
      <Link href={link} className="w-full" title={children}>
        <span className="max-w-[14.5rem] truncate">{children}</span>
      </Link>
    </Button>
  );
};

export { Button, LinkedButton, buttonVariants };
