import React from "react";

import ContentLayout from "@/components/page-layout/PageLayout";

const SozlukPage = async () => {
  const { default: Contents } = await import("@/resources/pages/sozluk.mdx");
  const { toc } = await import("@/resources/pages/sozluk.toc");

  return (
    <ContentLayout tocObject={toc}>
      <Contents />
    </ContentLayout>
  );
};

export default SozlukPage;
