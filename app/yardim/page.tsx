import React from "react";

import MarkdownPageLayout from "@/components/layout/MarkdownPageLayout";

import { Loader } from "@/lib/file-manager/loader";

const YardimPage = () => {
  const yardimContents: string = Loader.loadCustomPage("yardim");

  return (
    <MarkdownPageLayout loadedPageKey="yardim" loadedTopicKey={null} loadedArticleKey={null}>
      {yardimContents}
    </MarkdownPageLayout>
  );
};

export default YardimPage;
