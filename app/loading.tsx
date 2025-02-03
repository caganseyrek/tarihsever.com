import React from "react";

import { LoaderCircle } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <LoaderCircle className="animate-spin" />
    </div>
  );
};

export default LoadingPage;
