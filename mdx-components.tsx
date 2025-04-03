import React from "react";

import type { MDXComponents } from "mdx/types";

import { slugify } from "@/shared/utils";

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    h1: ({ children }) => <h1 id={slugify(children as string)}>{children}</h1>,
    h2: ({ children }) => <h2 id={slugify(children as string)}>{children}</h2>,
    h3: ({ children }) => <h3 id={slugify(children as string)}>{children}</h3>,
    h4: ({ children }) => <h4 id={slugify(children as string)}>{children}</h4>,
    h5: ({ children }) => <h5 id={slugify(children as string)}>{children}</h5>,
    ...components,
  };
};
