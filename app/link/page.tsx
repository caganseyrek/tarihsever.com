"use client";

import { ReadonlyURLSearchParams, redirect, useSearchParams } from "next/navigation";

import Finder from "@/lib/lookup/finder";

const ShortlinkRedirectPage = () => {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const redirectCode: string | null = searchParams.get("r");

  if (!redirectCode) {
    return redirect("/konular");
  }

  const redirectTo: string | null = Finder.findRedirectLink(redirectCode);
  if (!redirectTo) {
    return redirect("/konular");
  }

  return redirect(redirectTo);
};

export default ShortlinkRedirectPage;
