"use client";

import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";

import { shortLinks } from "@/prepublish/generated/shortlinks";
import { ShortLinkProps } from "@/prepublish/tasks/generate-shortlinks";

const ShortlinkPage = () => {
  const router = useRouter();

  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const shortLinkCode: string | null = searchParams.get("r");

  if (!shortLinkCode) {
    return router.replace("/");
  }

  const shortLinkItem: ShortLinkProps | undefined = shortLinks.find((link) => link.shortLinkCode === shortLinkCode);
  if (!shortLinkItem) {
    return router.replace("/konular");
  }

  return router.replace(shortLinkItem.redirectsTo);
};

export default ShortlinkPage;
