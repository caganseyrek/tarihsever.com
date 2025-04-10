"use client";

import React from "react";

import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";

import LoadingPage from "@/app/loading";

import { shortlinks } from "@/contents/__generated__/shortlinks";

import type { Globals } from "@/types/globals";

const ShortlinkPage = () => {
  const router = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  React.useEffect(() => {
    const shortlinkCode: string | null = searchParams.get("r");

    if (!shortlinkCode) {
      return router.replace("/");
    }
    const shortlinkItem: Globals.Data.ShortlinkProps | undefined = shortlinks.find(
      (link) => link.shortlinkCode === shortlinkCode,
    );
    if (!shortlinkItem) {
      return router.replace("/");
    }
    return router.replace(shortlinkItem.redirectsTo);
  });

  return <LoadingPage />;
};

export default ShortlinkPage;
