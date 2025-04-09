import React from "react";

import { PageLayout } from "@/components/page-layout";

const YardimPage = async () => {
  const { default: Contents } = await import("@/contents/pages/site-rehberi.mdx");
  const { toc } = await import("@/contents/pages/site-rehberi.toc");

  return (
    <PageLayout tocObject={toc}>
      <Contents />
    </PageLayout>
  );
};

export default YardimPage;
