"use client";

import React from "react";

import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";

import LoadingPage from "@/app/loading";

import { shortLinks } from "@/contents/__generated__/shortlinks";

import type { Globals } from "@/types/globals";

const ShortlinkPage = () => {
  const router = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  React.useEffect(() => {
    const shortLinkCode: string | null = searchParams.get("r");

    if (!shortLinkCode) {
      return router.replace("/");
    }
    const shortLinkItem: Globals.Data.ShortLinkProps | undefined = shortLinks.find(
      (link) => link.shortLinkCode === shortLinkCode,
    );
    if (!shortLinkItem) {
      return router.replace("/");
    }
    return router.replace(shortLinkItem.redirectsTo);
  });

  return <LoadingPage />;
};

export default ShortlinkPage;
