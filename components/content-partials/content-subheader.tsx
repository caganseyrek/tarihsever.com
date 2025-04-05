import React from "react";

import { Breadcrumbs, ShareDialog, SubheaderRoot } from "@/components/content-partials/content-subheader.partials";

import { shortLinks } from "@/content/generated/shortlinks";

import { Components, Globals } from "@/types/globals";

const ContentSubheader = ({ breadcrumbs, pagePath }: Components.ContentSubheaderProps) => {
  const shortLinkCode: Globals.Data.ShortLinkProps[] | undefined = shortLinks.filter(
    (shortLink) => shortLink.redirectsTo === pagePath,
  );
  const hasShortLinkCode: boolean = shortLinkCode.length === 1;

  return (
    <SubheaderRoot>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {hasShortLinkCode && <ShareDialog shortLinkCode={shortLinkCode[0].shortLinkCode} />}
    </SubheaderRoot>
  );
};

export default ContentSubheader;
