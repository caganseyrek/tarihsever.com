"use client";

import React from "react";

import { usePathname } from "next/navigation";

import { Check, Copy, Share2 } from "lucide-react";

import { Button } from "@/components/base/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/base/dialog";

import { useClipboard } from "@/hooks/use-clipboard";
import { useShortlink } from "@/hooks/use-shortlink";

import { absoluteLink } from "@/shared/utils";

const ShareDialog = () => {
  const pathname: string = usePathname();
  const { isCopied, copyToClipboard } = useClipboard();

  const shortlink: string | undefined = useShortlink(pathname.replace("/", "" /* Removing the first slash */));
  const hasShortlink: boolean = shortlink !== undefined;
  const linkForCopy: string = absoluteLink(hasShortlink ? `/link?r=${shortlink}` : pathname);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-2.5 py-1.5 h-auto text-sm">
          Paylaş <Share2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sayfayı Paylaş</DialogTitle>
          <DialogDescription>
            Aşağıdaki {hasShortlink && "kısa "}link ile bu sayfaya kolayca ulaşabilirsiniz.
          </DialogDescription>
        </DialogHeader>
        <Button
          className="w-full h-auto py-[0.45rem] text-primary justify-between hover:text-primary-lighter disabled:opacity-100"
          disabled={isCopied}
          onClick={async () => await copyToClipboard(linkForCopy)}>
          <span className="text-wrap text-left">{linkForCopy}</span>
          {isCopied ? <Check /> : <Copy />} <span className="sr-only">Kopyalamak için tıklayın</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const ContentTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row items-start justify-between gap-2">
      <h1>{children}</h1>
      <ShareDialog />
    </div>
  );
};

export { ContentTitle };
