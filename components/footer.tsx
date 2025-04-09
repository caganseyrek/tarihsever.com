import React from "react";

import {
  FooterLicenseContainer,
  FooterRoot,
  FooterTextContainer,
  LicenseText,
} from "@/components/partials/footer.partials";

import type { Components } from "@/types/globals";

const Footer = ({ licenseTextOnly }: Components.FooterProps) => {
  if (licenseTextOnly) {
    return (
      <div className="text-muted-foreground text-center">
        <LicenseText />
      </div>
    );
  }

  return (
    <FooterRoot>
      <FooterTextContainer>
        Tarihsever&apos;deki içerikler yalnızca bilgilendirme amaçlıdır, yazarların kişisel görüşlerini yansıtmaz ve ele
        alınan olayları yorumlama amacı taşımaz.
      </FooterTextContainer>
      <FooterLicenseContainer>
        <LicenseText />
      </FooterLicenseContainer>
    </FooterRoot>
  );
};

export { Footer };
