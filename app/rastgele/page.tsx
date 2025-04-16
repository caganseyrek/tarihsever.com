"use client";

import React from "react";

import { useRouter } from "next/navigation";

import LoadingPage from "@/app/loading";

import { contentTreeLookup } from "@/content/data/__generated__/content-tree";

const RastgelePage = () => {
  const router = useRouter();

  React.useEffect(() => {
    const articlesArrayFromSet: string[] = Array.from(contentTreeLookup);
    const randomIndex: number = Math.floor(Math.random() * articlesArrayFromSet.length);

    return router.replace("/" + articlesArrayFromSet[randomIndex]);
  });

  return <LoadingPage />;
};

export default RastgelePage;
