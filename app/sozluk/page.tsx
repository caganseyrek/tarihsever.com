import React from "react";

import ContentLayout from "@/components/content-layout/ContentLayout";

const SozlukPage = async () => {
  const { default: Contents, toc } = await import("@/resources/content/pages/sozluk.mdx");

  return (
    <ContentLayout tocObject={toc}>
      <Contents />
    </ContentLayout>
  );
};

export default SozlukPage;
