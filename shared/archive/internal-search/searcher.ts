import { tokenize } from "@/shared/archive/internal-search/internal-search-utils";
import BM25, { ScoreProps } from "@/shared/archive/internal-search/processor/bm25";
import JaroWinkler from "@/shared/archive/internal-search/processor/jaroWinkler";

import { searchIndex } from "@/content/data/generated/search-index";

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
