import React from "react";

import ContentLayout from "@/components/content-layout/ContentLayout";

const YardimPage = async () => {
  const { default: Contents } = await import("@/resources/content/pages/yardim.mdx");

  return (
    <ContentLayout tocObject={[]}>
      <Contents />
    </ContentLayout>
  );
};

export default YardimPage;
