import React from "react";

import { LoaderCircle } from "lucide-react";

import { CustomPageRoot } from "@/components/custom-page.partials";

const LoadingPage = () => {
  return (
    <CustomPageRoot>
      <LoaderCircle className="animate-spin" />
    </CustomPageRoot>
  );
};

export default LoadingPage;
