import React from "react";

import Link from "next/link";

import { ArrowUp } from "lucide-react";

import { slugify } from "@/shared/utils";

import type { Components } from "@/types/globals";

const ContentSources = ({ sources }: Components.ContentSourcesProps) => {
  return (
    <>
      <h2>Kaynaklar</h2>
      <ol className="flex flex-col items-start justify-start gap-6 list-inside p-0">
        {sources.map((source) => (
          <li key={source.sourceName} id={source.sourceAnchor} className="w-full marker:font-semibold">
            <Link
              href={"#" + slugify(source.sourceOrigin)}
              title="Kaynağın bulunduğu başlığa dön"
              className="mx-0.5 px-1">
              <ArrowUp className="size-4.5 mb-0.5 inline text-foreground hover:text-primary transition-colors" />
            </Link>
            <strong>{source.sourceName}</strong> &mdash; {source.sourceWebsiteName}
            <ul className="bg-container-background py-2 mt-2 border rounded-md overflow-auto">
              <li>
                Link:{" "}
                <Link href={source.links.sourceWebsiteLink} target="_blank" className="text-wrap">
                  {source.links.sourceWebsiteLink}
                </Link>
              </li>
              {source.links.historicalDocument && (
                <li>
                  Tarihi Döküman:{" "}
                  <Link href={source.links.historicalDocument} target="_blank" className="text-wrap">
                    {source.links.historicalDocument}
                  </Link>
                </li>
              )}
            </ul>
          </li>
        ))}
      </ol>
    </>
  );
};

export { ContentSources };
