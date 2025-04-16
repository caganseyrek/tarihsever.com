import React from "react";

import type { Metadata } from "next";

import { PageLayout } from "@/components/page-layout";

import { useLoadPage } from "@/hooks/use-load-page";

export const metadata: Metadata = { title: "Site Rehberi" };

const RehberPage = async () => {
  const { content: Content, toc } = await useLoadPage("site-rehberi");
  return (
    <PageLayout tocObject={toc}>
      <Content />
    </PageLayout>
  );
};

export default RehberPage;
