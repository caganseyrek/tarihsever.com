import React from "react";

import { Loader } from "lucide-react";

import { CustomPageRoot } from "@/components/partials/custom-page.partials";

const LoadingPage = () => {
  return (
    <CustomPageRoot>
      <Loader className="animate-spin" />
    </CustomPageRoot>
  );
};

export default LoadingPage;
