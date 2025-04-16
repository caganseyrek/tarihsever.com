import React from "react";

import type { Metadata } from "next";

import { PageLayout } from "@/components/page-layout";

import { useLoadPage } from "@/hooks/use-load-page";

export const metadata: Metadata = { title: "Tarih Sözlüğü" };

const SozlukPage = async () => {
  const { content: Content, toc } = await useLoadPage("sozluk");
  return (
    <PageLayout tocObject={toc}>
      <Content />
    </PageLayout>
  );
};

export default SozlukPage;
