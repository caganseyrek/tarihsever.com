import React from "react";

import ContentLayout from "@/components/page-layout/PageLayout";

const SozlukPage = async () => {
  const { default: Contents } = await import("@/resources/pages/katki-rehberi.mdx");
  const { toc } = await import("@/resources/pages/katki-rehberi.toc");

  return (
    <ContentLayout tocObject={toc}>
      <Contents />
    </ContentLayout>
  );
};

export default SozlukPage;
