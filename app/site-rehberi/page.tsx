import React from "react";

import PageLayout from "@/components/layout/page-layout";

const YardimPage = async () => {
  const { default: Contents } = await import("@/content/pages/site-rehberi.mdx");
  const { toc } = await import("@/content/pages/site-rehberi.toc");

  return (
    <PageLayout tocObject={toc}>
      <Contents />
    </PageLayout>
  );
};

export default YardimPage;
