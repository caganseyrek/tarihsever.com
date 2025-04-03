import React from "react";

import {
  BackToHeading,
  SourcesContainer,
  SourcesContainerItem,
  SourcesLinkContainer,
  SourcesLinkContainerItem,
} from "./ContentSources.Partials";

interface ContentSourcesProps {
  sources: {
    sourceOrigin: string;
    sourceAnchor: string;
    sourceName: string;
    sourceWebsiteName: string;
    links: {
      sourceWebsiteLink: string;
      historicalDocument?: string;
    };
  }[];
}

const ContentSources = ({ sources }: ContentSourcesProps) => {
  return (
    <>
      <h2>Kaynaklar</h2>
      <SourcesContainer>
        {sources.map((source) => (
          <SourcesContainerItem key={source.sourceName} id={source.sourceAnchor}>
            <BackToHeading sourceOrigin={source.sourceOrigin} hoverTitle="Kaynağın bulunduğu başlığa dön" />
            <strong>{source.sourceName}</strong> &mdash; {source.sourceWebsiteName}
            <SourcesLinkContainer>
              <SourcesLinkContainerItem prefix={"Link:"} link={source.links.sourceWebsiteLink} />
              {source.links.historicalDocument && (
                <SourcesLinkContainerItem prefix={"Tarihi Döküman:"} link={source.links.historicalDocument} />
              )}
            </SourcesLinkContainer>
          </SourcesContainerItem>
        ))}
      </SourcesContainer>
    </>
  );
};

export default ContentSources;
