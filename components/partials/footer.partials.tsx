import React from "react";

import Link from "next/link";

import { cn } from "@/shared/utils";

const FooterRoot = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <footer
      className={cn("w-full border-t flex flex-col items-center justify-center text-[0.965rem]", className)}
      {...props}>
      {children}
    </footer>
  );
};

const FooterTextContainer = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "w-[46rem] max-[46rem]:w-full text-pretty text-muted-foreground p-4 text-center",
        "[&>a]:text-primary [&>a]:hover:text-primary-lighter [&>a]:transition-colors",
        className,
      )}
      {...props}>
      {children}
    </div>
  );
};

const FooterLicenseContainer = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("w-full border-t bg-container-background p-4 text-pretty text-center", className)} {...props}>
      {children}
    </div>
  );
};

const LicenseText = () => {
  return (
    <>
      Tarihsever 2025 &mdash; Sitede yer alan içerikler{" "}
      <Link
        href="https://github.com/caganseyrek/tarihsever.com/blob/main/LICENSE"
        target="_blank"
        className="text-primary hover:text-primary-lighter transition-colors">
        MIT lisansı
      </Link>{" "}
      altındadır
    </>
  );
};

export { FooterRoot, FooterTextContainer, FooterLicenseContainer, LicenseText };
