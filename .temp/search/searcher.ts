import { searchIndex } from "@/shared/lib/search/searchIndex.js";

import BM25, { ScoreProps } from "./core/bm25.js";
import JaroWinkler from "./core/jaroWinkler.js";
import tokenize from "./tokenizer.js";

class Searcher {
  private constructor() {}

  private static getCandidates(tokens: string[]): Set<string> {
    const candidates: Set<string> = new Set<string>();

    for (const term of tokens) {
      for (const indexTerm of Object.keys(searchIndex)) {
        const similarity: number = JaroWinkler.calculate(term, indexTerm);
        if (similarity > 0.8) {
          for (const docKey of Object.keys(searchIndex[indexTerm].postings)) {
            candidates.add(docKey);
          }
        }
      }
    }
    return candidates;
  }

  public static search(query: string): string[] {
    const queryTokens: string[] = tokenize(query);
    const candidates: Set<string> = this.getCandidates(queryTokens);
    const scores: ScoreProps = BM25.getScores(queryTokens, candidates);

    const rankedResults: string[] = Object.entries(scores)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .map(([docKey]) => docKey);

    return rankedResults;
  }
}

export default Searcher;
