"use client";

import React from "react";

import { redirect } from "next/navigation";

import Finder from "@/lib/lookup/finder";

const KonularPage = () => {
  React.useEffect(() => redirect(`/konular/${Finder.getDefaultTopic().key}`), []);
  return null;
};

export default KonularPage;
