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
};

export const searchIndex: SearchIndexProps = {}