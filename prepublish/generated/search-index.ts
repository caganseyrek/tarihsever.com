export interface SearchIndexProps {
  [word: string]: {
    docFreq: number;
    postings: {
      [docKey: string]: {
        termFreq: number;
        positions: number[];
      };
    };
  };
}

// Will be worked on later

export const searchIndex: SearchIndexProps = {};
