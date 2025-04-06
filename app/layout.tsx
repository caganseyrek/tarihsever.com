import React from "react";

import type { Metadata } from "next";

import ThemeProvider from "@/components/theme/theme-provider";

import "@/shared/styles/globals.css";

import type { Components } from "@/types/globals";

import { headMetadata, jsonLd } from "@/contents/data/site-metadata";

export const metadata: Metadata = {
  title: {
    template: "%s - Tarihsever",
    default: "Tarihsever",
  },
  ...headMetadata,
};

const RootLayout = ({ children }: Components.BaseWrapperProps) => {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/favicon.png" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
