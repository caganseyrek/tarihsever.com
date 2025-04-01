import React from "react";

import ContentLayout from "@/components/content-layout/ContentLayout";

export default async function SozlukPage() {
  const { default: Contents } = await import("@/shared/content/pages/sozluk.mdx");

  return (
    <ContentLayout>
      <Contents />
    </ContentLayout>
  );
}
