import React from "react";

import Link from "next/link";

import { FooterLicenseContainer, FooterRoot, FooterText } from "./Footer.Partials";

const Footer = () => {
  return (
    <FooterRoot>
      <FooterText>
        Tarihsever&apos;deki içerikler yalnızca bilgilendirme amaçlıdır, yazarların kişisel görüşlerini yansıtmaz ve ele
        alınan olayları yorumlama amacı taşımaz.
      </FooterText>
      <FooterLicenseContainer>
        <FooterText>
          Tarihsever 2025 &mdash; Sitede yer alan içerikler{" "}
          <Link href="https://github.com/caganseyrek/tarihsever.com/blob/main/LICENSE" target="_blank">
            MIT lisansı
          </Link>{" "}
          altındadır
        </FooterText>
      </FooterLicenseContainer>
    </FooterRoot>
  );
};

export default Footer;
