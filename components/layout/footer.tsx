import React from "react";

import { FooterLicenseContainer, FooterLicenseText, FooterRoot, FooterText } from "@/components/layout/footer.partials";

const Footer = () => {
  return (
    <FooterRoot>
      <FooterText>
        Tarihsever&apos;deki içerikler yalnızca bilgilendirme amaçlıdır, yazarların kişisel görüşlerini yansıtmaz ve ele
        alınan olayları yorumlama amacı taşımaz.
      </FooterText>
      <FooterLicenseContainer>
        <FooterText className="text-foreground">
          <FooterLicenseText />
        </FooterText>
      </FooterLicenseContainer>
    </FooterRoot>
  );
};

export default Footer;
