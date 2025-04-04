"use client";

import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";

import { shortLinks } from "@/resources/generated/shortlinks";

import { Globals } from "@/types/globals";

const ShortlinkPage = () => {
  const router = useRouter();

  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const shortLinkCode: string | null = searchParams.get("r");

  if (!shortLinkCode) {
    return router.replace("/");
  }

  const shortLinkItem: Globals.Data.ShortLinkProps | undefined = shortLinks.find(
    (link) => link.shortLinkCode === shortLinkCode,
  );
  if (!shortLinkItem) {
    return router.replace("/s");
  }

  return router.replace(shortLinkItem.redirectsTo);
};

export default ShortlinkPage;
