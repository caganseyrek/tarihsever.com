import React from "react";

import Link from "next/link";

import { ArrowUp } from "lucide-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/base/tooltip";

import { slugify } from "@/shared/utils";

interface ContentSourceLinkItemProps {
  linkItemPrefix: string;
  link: string;
}

export interface ContentSourcesProps {
  sources: {
    sourceOrigin: string;
    sourceAnchor: string;
    sourceName: string;
    sourceWebsiteName: string;
    links: {
      sourceWebsiteLink: string;
      historicalDocument?: string;
    };
  }[];
}

const ContentSourceLinkItem = ({ linkItemPrefix, link }: ContentSourceLinkItemProps) => {
  return (
    <li>
      {linkItemPrefix}:{" "}
      <Link href={link} target="_blank" className="text-wrap">
        {link}
      </Link>
    </li>
  );
};

const ContentSources = ({ sources }: ContentSourcesProps) => {
  return (
    <>
      <h2>Kaynaklar</h2>
      <ol className="flex flex-col items-start justify-start gap-6 list-inside p-0">
        {sources.map((source) => (
          <li key={source.sourceName} id={source.sourceAnchor} className="w-full marker:font-semibold">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={"#" + slugify(source.sourceOrigin)} className="mx-0.5 px-1">
                    <ArrowUp className="size-4.5 mb-0.5 inline text-foreground hover:text-primary transition-colors" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent sideOffset={8}>Kaynağın bulunduğu başlığa dön</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <strong>{source.sourceName}</strong> &mdash; {source.sourceWebsiteName}
            <ul className="bg-container-background py-2 mt-2 border rounded-md overflow-auto">
              <ContentSourceLinkItem linkItemPrefix="Link" link={source.links.sourceWebsiteLink} />
              {source.links.historicalDocument && (
                <ContentSourceLinkItem linkItemPrefix="Tarihi Döküman" link={source.links.historicalDocument} />
              )}
            </ul>
          </li>
        ))}
      </ol>
    </>
  );
};

export { ContentSources };
