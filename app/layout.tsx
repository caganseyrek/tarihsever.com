import React from "react";

import { Metadata } from "next";

import { ThemeProvider } from "next-themes";

import "@/shared/styles/globals.css";

import { headMetadata, jsonLd } from "@/resources/data/metadata";

import { Components } from "@/types/globals";

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
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
