"use client";

import React from "react";

import { usePathname } from "next/navigation";

import { Copy, LinkIcon } from "lucide-react";

import { Button } from "@/components/base/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/base/dialog";

import Finder from "@/lib/lookup/finder";

import { baseURL } from "@/data/metadata";

const ShareDialog = () => {
  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  const pathname: string = usePathname();
  const redirectCode: string | null = Finder.findShortlinkCode(pathname);
  const redirectLink: string = redirectCode ? `${baseURL}link?r=${redirectCode}` : baseURL + pathname.replace("/", "");

  const handleCopy = () => {
    if (!redirectLink) return;

    setIsCopied(true);
    navigator.clipboard.writeText(redirectLink);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-[0.95rem]">
          <LinkIcon /> Sayfayı Paylaş
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sayfayı Paylaş</DialogTitle>
          <DialogDescription>{`Aşağıdaki${redirectCode ? " kısa " : " "}link ile bu sayfaya${redirectCode ? " kolayca " : " "}ulaşabilirsiniz.`}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-start gap-2">
          <Button className="w-full text-[0.95rem] justify-between" onClick={() => handleCopy()}>
            {redirectLink} <Copy />
          </Button>
          {redirectLink && (
            <span className="text-muted-foreground text-[0.75rem]">
              {isCopied ? "Link Kopyalandı!" : "Kopyalamak için tıklayın"}
            </span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
