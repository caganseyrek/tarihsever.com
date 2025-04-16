import React from "react";

import Link from "next/link";

import { cn } from "@/shared/utils";

interface FooterProps {
  licenseTextOnly?: boolean;
}

const LicenseText = () => {
  return (
    <>
      Tarihsever 2025 &mdash; Sitede yer alan içerikler{" "}
      <Link
        href="/site-rehberi#i̇çerik-kullanımı-paylaşımı-ve-lisans"
        target="_blank"
        className="text-primary hover:text-primary-lighter transition-colors">
        MIT lisansı
      </Link>{" "}
      altındadır
    </>
  );
};

const Footer = ({ licenseTextOnly = false }: FooterProps) => {
  return (
    <footer
      className={cn(
        licenseTextOnly ? "text-center" : "w-full border-t flex flex-col items-center justify-center text-[0.965rem]",
      )}>
      {licenseTextOnly ? (
        <LicenseText />
      ) : (
        <>
          <div
            className={cn(
              "text-pretty p-4 text-center text-muted-foreground",
              "[&>a]:text-primary [&>a]:hover:text-primary-lighter [&>a]:transition-colors",
              "w-[46rem] max-[46rem]:w-full",
            )}>
            Tarihsever&apos;deki içerikler yalnızca bilgilendirme amaçlıdır, yazarların kişisel görüşlerini yansıtmaz ve
            ele alınan olayları yorumlama amacı taşımaz.
          </div>
          <div className="w-full border-t bg-container-background p-4 text-pretty text-center">
            <LicenseText />
          </div>
        </>
      )}
    </footer>
  );
};

export { Footer };
