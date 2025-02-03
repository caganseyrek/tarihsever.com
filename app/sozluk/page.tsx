import React from "react";

import MarkdownPageLayout from "@/components/layout/MarkdownPageLayout";

import { Loader } from "@/lib/file-manager/loader";

const SozlukPage = () => {
  const sozlukContents: string = Loader.loadCustomPage("sozluk");

  return (
    <MarkdownPageLayout loadedPageKey={"sozluk"} loadedTopicKey={null} loadedArticleKey={null}>
      {sozlukContents}
    </MarkdownPageLayout>
  );
};

export default SozlukPage;
