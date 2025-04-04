import React from "react";

import ContentLayout from "@/components/page-layout/PageLayout";

const YardimPage = async () => {
  const { default: Contents } = await import("@/resources/pages/yardim.mdx");
  const { toc } = await import("@/resources/pages/yardim.toc");

  return (
    <ContentLayout tocObject={toc}>
      <Contents />
    </ContentLayout>
  );
};

export default YardimPage;
