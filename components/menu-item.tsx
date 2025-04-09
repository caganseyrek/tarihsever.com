import React from "react";

import Link from "next/link";

import { Button } from "@/components/base/button";

import { cn } from "@/shared/utils";

import type { Components } from "@/types/globals";

const MenuItem = ({ className, linkDetails }: Components.MenuItemProps) => {
  return (
    <Button variant="ghost" className={cn("w-full justify-start", className)} asChild>
      <Link href={linkDetails.path} className="w-full" title={linkDetails.title}>
        {linkDetails.title}
      </Link>
    </Button>
  );
};

export { MenuItem };
