import React from "react";

import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme/theme-provider";

import { headMetadata, jsonLd } from "@/content/data/site-metadata";

import "@/shared/styles/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s - Tarihsever",
    default: "Tarihsever",
  },
  ...headMetadata,
};

const RootLayout = ({ children }: { children?: React.ReactNode }) => {
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
