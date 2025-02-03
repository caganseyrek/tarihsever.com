import React from "react";

import Link from "next/link";

import { ArrowUp } from "lucide-react";

import { Button } from "@/components/base/button";

const BackToTop = () => {
  return (
    <Link href="#top" className="w-full block mt-4 text-foreground">
      <Button variant="ghost" className="w-full">
        <ArrowUp /> Başa Dön
      </Button>
    </Link>
  );
};

export default BackToTop;
