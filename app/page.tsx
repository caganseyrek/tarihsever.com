import React from "react";

import type { Metadata } from "next";

import { Homepage } from "@/components/homepage";

export const metadata: Metadata = { title: "Tarihsever - Ana Sayfa" };

const RootPage = () => <Homepage />;

export default RootPage;
