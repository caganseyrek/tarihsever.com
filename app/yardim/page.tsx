import React from "react";

import ContentLayout from "@/components/content-layout/ContentLayout";

export default async function YardimPage() {
  const { default: Contents } = await import("@/shared/content/pages/yardim.mdx");

  return (
    <ContentLayout>
      <Contents />
    </ContentLayout>
  );
}
