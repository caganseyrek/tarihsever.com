"use client";

import React from "react";

import Link from "next/link";

import { Check, ChevronRight, Copy, Home, Share2 } from "lucide-react";

import { Button } from "@/components/base/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/base/dialog";

import { coreMetadata } from "@/content/data/metadata";

import { cn } from "@/shared/utils";

import { Components } from "@/types/globals";

const SubheaderRoot = ({ children, className }: Components.BaseWrapperProps) => {
  return (
    <div
      className={cn(
        "w-full flex flex-row items-center justify-start gap-2 text-muted-foreground [&_svg]:size-4",
        className,
      )}>
      {children}
    </div>
  );
};

const Breadcrumbs = ({ breadcrumbs }: Components.BreadcrumbsProps) => {
  return (
    <div className="w-full flex flex-row items-center justify-start gap-2 text-muted-foreground [&_svg]:size-4">
      <Link
        className="p-1.5 size-[1.75rem] inline-flex items-center justify-center border rounded-md bg-container-background text-primary hover:text-primary-lighter transition-colors"
        href="/">
        <Home />
      </Link>
      <ChevronRight />
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={item}>
          {index !== 0 && <ChevronRight />}
          <span key={item} className="text-sm">
            {item}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};

interface ShareDialogProps {
  shortLinkCode: string;
}

const ShareDialog = ({ shortLinkCode }: ShareDialogProps) => {
  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  const shortLinkUrl: string = coreMetadata.base_url + "/link?r=" + shortLinkCode;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="size-[1.75rem] text-primary hover:text-primary-lighter transition-colors">
          <Share2 /> <span className="sr-only">Bu sayfayı&apos;nın kısa linkini paylaş</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sayfayı Paylaş</DialogTitle>
          <DialogDescription>Aşağıdaki kısa link ile bu sayfaya kolayca ulaşabilirsiniz.</DialogDescription>
        </DialogHeader>
        <Button
          className="w-full text-primary hover:text-primary-lighter justify-between disabled:opacity-100"
          title="Kopyalamak için tıklayın"
          disabled={isCopied}
          onClick={async () => {
            await navigator.clipboard.writeText(shortLinkUrl);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2500);
          }}>
          <span>{shortLinkUrl}</span>
          {isCopied ? <Check /> : <Copy />}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export { SubheaderRoot, Breadcrumbs, ShareDialog };
