import React from "react";

import ContentLayout from "@/components/content-layout/ContentLayout";

const YardimPage = async () => {
  const { default: Contents, toc } = await import("@/resources/content/pages/yardim.mdx");

  return (
    <ContentLayout tocObject={toc}>
      <Contents />
    </ContentLayout>
  );
};

export default YardimPage;
