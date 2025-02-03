import React from "react";

import BaseLayout from "./BaseLayout";

interface HomePageProps {
  children?: React.ReactNode;
}

const HomePageLayout = ({ children }: HomePageProps) => {
  return (
    <BaseLayout loadedPageKey={"ana-sayfa"} loadedTopicKey={null} loadedArticleKey={null}>
      <section className="w-[76rem] min-h-[calc(100vh-259px)] flex flex-row gap-8 items-center justify-center">
        {children}
      </section>
    </BaseLayout>
  );
};

export default HomePageLayout;
