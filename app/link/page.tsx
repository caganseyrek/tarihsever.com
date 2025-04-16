"use client";

import React from "react";

import { type ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";

import LoadingPage from "@/app/loading";

import { useShortlink } from "@/hooks/use-shortlink";

const ShortlinkPage = () => {
  const router = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  React.useEffect(() => {
    const shortlinkCode: string | null = searchParams.get("r");

    if (!shortlinkCode) {
      return router.replace("/");
    }
    const redirectPath: string | undefined = useShortlink(shortlinkCode);
    if (!redirectPath) {
      return router.replace("/");
    }
    return router.replace(redirectPath);
  });

  return <LoadingPage />;
};

export default ShortlinkPage;
