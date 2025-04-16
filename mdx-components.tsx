import React from "react";

import type { MDXComponents } from "mdx/types";

import { ContentTitle } from "@/components/mdx-partials/page-title";
import { ContentHeading } from "@/components/mdx-partials/section-heading";

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    h1: ({ children }) => <ContentTitle>{children}</ContentTitle>,
    h2: ({ children }) => <ContentHeading as="h2">{children}</ContentHeading>,
    h3: ({ children }) => <ContentHeading as="h3">{children}</ContentHeading>,
    h4: ({ children }) => <ContentHeading as="h4">{children}</ContentHeading>,
    h5: ({ children }) => <ContentHeading as="h5">{children}</ContentHeading>,
    ...components,
  };
};
