import React from "react";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t text-center flex flex-col items-center justify-center">
      <div className="w-[60rem] text-pretty text-muted-foreground p-4 text-[0.95rem]">
        Tarihsever&apos;deki içerikler yalnızca bilgilendirme amaçlıdır ve yazarların kişisel görüşlerini yansıtmaz.
        İçeriklerde ele alınan olaylara dair herhangi bir yorumda bulunulmaz ve yorumlama amacı taşımaz. Konuyla ilgili
        daha fazla bilgi edinmek için yalnızca buradaki yazılarla sınırlı kalmayıp, kendi araştırmanızı yapmanızı
        öneririz.
      </div>
      <div className="w-full border-t p-4 bg-accent/90 text-[0.95rem]">
        Tarihsever 2025 &mdash; Sitede yer alan içerikler{" "}
        <Link
          href={"https://github.com/caganseyrek/tarihsever.com/blob/main/LICENSE"}
          target="_blank"
          className="font-semibold w-[60rem] text-[0.95rem]">
          MIT lisansı
        </Link>{" "}
        altındadır
      </div>
    </footer>
  );
};

export default Footer;
