import React from "react";

import type { Metadata } from "next";

import HomepageWrapper from "@/components/homepage/homepage.wrapper";

export const metadata: Metadata = { title: "Tarihsever - Ana Sayfa" };

const RootPage = () => <HomepageWrapper />;

export default RootPage;
