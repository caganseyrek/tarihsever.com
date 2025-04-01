"use client";

import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";

// import Finder from "@/shared/lib/lookup/finder";

export default function ShortlinkPage() {
  const router = useRouter();

  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const redirectCode: string | null = searchParams.get("r");

  if (!redirectCode) {
    return router.replace("/");
  }

  const redirectTo: string | null = null; //Finder.findRedirectLink(redirectCode);
  if (!redirectTo) {
    return router.replace("/konular");
  }

  return router.replace(redirectTo);
}
