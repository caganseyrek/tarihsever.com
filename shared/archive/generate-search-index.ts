import fs from "fs";
import path from "path";

import { tokenize } from "@/shared/archive/internal-search/internal-search-utils";

import PrepublishUtils from "../../prepublish/prepublish-utils";
import Workflow from "../../prepublish/workflow";

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

class SearchIndexGenerator {
  private static readonly MARKDOWN_REGEX: RegExp =
    /(?<=^|\n)(?!<.*?>|---|\.\.\.|```.*?```|\{.*?\}|\[.*?\]\(.*?\))(.*?)(?=\n|$)/;

  public static generatedIndex: SearchIndexProps = {};

  public static addArticleToIndex(fullPath: string): void {
    const formattedPath: string = PrepublishUtils.parseFullArticlePath(fullPath, true);
    const fileContent: string = fs.readFileSync(fullPath, "utf8");

    const words: string[] = tokenize(fileContent);
    const wordPositions: { [word: string]: number[] } = {};

    words.forEach((word, pos) => {
      if (!wordPositions[word]) {
        wordPositions[word] = [];
      }
      wordPositions[word].push(pos);
    });

    for (const [word, positions] of Object.entries(wordPositions)) {
      if (!this.generatedIndex[word]) {
        this.generatedIndex[word] = { docFreq: 0, postings: {} };
      }
      this.generatedIndex[word].docFreq++;
      this.generatedIndex[word].postings[formattedPath] = {
        termFreq: positions.length,
        positions: positions,
      };
    }
  }

  public static saveSearchIndex(outputFileName: string): void {
    const searchIndexFileContent: string = `// This file is auto-generated
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
};

export const searchIndex: SearchIndexProps = ${JSON.stringify(this.generatedIndex)}`;

    fs.writeFileSync(path.join(Workflow.outputDirectory, outputFileName), searchIndexFileContent, "utf-8");
  }
}

export default SearchIndexGenerator;
