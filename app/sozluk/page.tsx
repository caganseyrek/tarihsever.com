import React from "react";

import PageLayout from "@/components/layout/page-layout";

const SozlukPage = async () => {
  const { default: Contents } = await import("@/contents/pages/sozluk.mdx");
  const { toc } = await import("@/contents/pages/sozluk.toc");

  return (
    <PageLayout tocObject={toc}>
      <Contents />
    </PageLayout>
  );
};

export default SozlukPage;
