import fs from "fs";
import path from "path";

import { ArticleFileProps, Loader, TopicFileProps } from "../file-manager/loader";
import tokenize from "./utils/tokenizer";

type Sources = TopicFileProps & Omit<ArticleFileProps, "topic">;

interface SearchIndexProps {
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

class Indexer {
  private static outputDir: string = path.join(process.cwd(), "lib", "searcher", "generated");

  private constructor() {}

  private static buildIndex(sources: Sources[]): SearchIndexProps {
    const index: SearchIndexProps = {};

    for (const { key, content } of sources) {
      const words: string[] = tokenize(content);
      const wordPositions: { [word: string]: number[] } = {};

      words.forEach((word, pos) => {
        if (!wordPositions[word]) {
          wordPositions[word] = [];
        }
        wordPositions[word].push(pos);
      });

      for (const [word, positions] of Object.entries(wordPositions)) {
        if (!index[word]) {
          index[word] = { docFreq: 0, postings: {} };
        }
        index[word].docFreq++;
        index[word].postings[key] = {
          termFreq: positions.length,
          positions: positions,
        };
      }
    }
    return index;
  }

  public static init(): void {
    const topics: TopicFileProps[] = Loader.loadAllTopics();
    const articles: Omit<ArticleFileProps, "topic">[] = Loader.loadAllArticles();

    const generatedIndex = this.buildIndex([...topics, ...articles]);

    const fileContent: string = `export interface SearchIndexProps {
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

export const searchIndex: SearchIndexProps = ${JSON.stringify(generatedIndex)}`;

    fs.writeFileSync(this.outputDir + "/searchIndex.ts", fileContent, "utf-8");
    // eslint-disable-next-line no-console
    console.log("[INFO] Generated search index.");
  }
}

export default Indexer;
