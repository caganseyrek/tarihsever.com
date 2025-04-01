"use client";

import React from "react";

import { usePathname } from "next/navigation";

import { Check, Copy, LinkIcon } from "lucide-react";

import { Button } from "@/components/base/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/base/dialog";

import { baseURL } from "@/shared/data/metadata";
import Finder from "@/shared/lib/lookup/finder";

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
        <Button className="w-full">
          <LinkIcon /> Sayfayı Paylaş
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sayfayı Paylaş</DialogTitle>
          <DialogDescription>{`Aşağıdaki ${redirectCode ? "kısa " : " "}link ile bu sayfaya ${redirectCode ? "kolayca " : " "}ulaşabilirsiniz.`}</DialogDescription>
        </DialogHeader>
        <Button className="w-full rounded-sm justify-between" onClick={() => handleCopy()}>
          {redirectLink} {isCopied ? <Check /> : <Copy />}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export { ShareDialog };
