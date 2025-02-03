import React from "react";

import { Metadata } from "next";

import { SidebarProvider } from "@/components/base/sidebar";
import { SelectionContextProvider } from "@/components/context/SelectionContext";
import ThemeProvider from "@/components/context/ThemeProvider";

import "@/styles/globals.css";

import { headMetadata, jsonLd } from "@/data/metadata";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: "%s - Tarihsever",
    default: "Tarihsever",
  },
  ...headMetadata,
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html suppressHydrationWarning className="scroll-smooth">
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SelectionContextProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </SelectionContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
