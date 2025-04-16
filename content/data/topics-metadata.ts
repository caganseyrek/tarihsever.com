interface TopicsMetadataProps {
  [topicName: string]: {
    title: string;
    subtopicTitles: {
      [subtopicName: string]: string;
    };
  };
}

const topicsMetadata: TopicsMetadataProps = {
  koloniyalizm: {
    title: "Koloniyalizm",
    subtopicTitles: {
      "kesif-cagi": "Keşif Çağı",
      "amerikada-kolonicilik": "Amerika'da Kolonicilik",
      // New subtopics are added here, NOT the articles
      // Articles are integrated automatically via the prepublish command
    },
  },
};

export { topicsMetadata };
