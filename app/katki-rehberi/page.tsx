import React from "react";

import PageLayout from "@/components/layout/page-layout";

const SozlukPage = async () => {
  const { default: Contents } = await import("@/content/pages/katki-rehberi.mdx");
  const { toc } = await import("@/content/pages/katki-rehberi.toc");

  return (
    <PageLayout tocObject={toc}>
      <Contents />
    </PageLayout>
  );
};

export default SozlukPage;
