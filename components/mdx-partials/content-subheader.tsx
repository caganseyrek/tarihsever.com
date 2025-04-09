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

import { shortLinks } from "@/contents/__generated__/shortlinks";
import { coreMetadata } from "@/contents/data/site-metadata";

import type { Components, Globals } from "@/types/globals";

const ShareDialog = ({ shortLinkCode }: Components.ShareDialogProps) => {
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

const ContentSubheader = ({ breadcrumbs, pagePath }: Components.ContentSubheaderProps) => {
  const shortLinkCode: Globals.Data.ShortLinkProps[] | undefined = shortLinks.filter(
    (shortLink) => shortLink.redirectsTo === pagePath,
  );
  const hasShortLinkCode: boolean = shortLinkCode.length === 1;

  return (
    <div className="w-full flex flex-row items-start justify-start gap-8 text-muted-foreground [&_svg]:size-4">
      <div className="w-full flex flex-row flex-wrap items-center justify-start gap-2 text-muted-foreground [&_svg]:size-4">
        <Link
          className="p-1.5 size-[1.75rem] inline-flex items-center justify-center border rounded-md bg-container-background text-primary hover:text-primary-lighter transition-colors"
          href="/">
          <Home />
        </Link>
        <ChevronRight />
        {breadcrumbs.map((item, index) => (
          <div key={item} className="flex flex-row items-center justify-center gap-2 flex-nowrap">
            {index !== 0 && <ChevronRight />}
            <span key={item} className="text-sm">
              {item}
            </span>
          </div>
        ))}
      </div>
      {hasShortLinkCode && <ShareDialog shortLinkCode={shortLinkCode[0].shortLinkCode} />}
    </div>
  );
};

export { ContentSubheader };
