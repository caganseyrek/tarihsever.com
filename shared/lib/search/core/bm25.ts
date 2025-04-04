import { searchIndex } from "@/resources/generated/search-index";

export interface ScoreProps {
  [docKey: string]: number;
}

class BM25 {
  private static b: number = 0.75;
  private static k1: number = 1.2;

  private static avgDocLength: number;
  private static docLengths: { [docKey: string]: number } = {};
  private static totalDocs: number = Object.keys(searchIndex).reduce(
    (count, term) => count + Object.keys(searchIndex[term].postings).length,
    0,
  );

  private static getAvgDocLength(): number {
    if (this.avgDocLength) return this.avgDocLength;

    Object.keys(searchIndex).forEach((term) => {
      Object.keys(searchIndex[term].postings).forEach((docKey) => {
        BM25.docLengths[docKey] = (BM25.docLengths[docKey] || 0) + searchIndex[term].postings[docKey].termFreq;
      });
    });
    this.avgDocLength = Object.values(BM25.docLengths).reduce((sum, length) => sum + length);
    return this.avgDocLength;
  }

  public static getScores(tokens: string[], candidates: Set<string>): ScoreProps {
    const scores: ScoreProps = {};

    for (const docKey of Array.from(candidates)) {
      let score: number = 0;

      for (const term of tokens) {
        const termFreq: number = searchIndex[term].postings[docKey].termFreq;
        const idf: number = Math.log(
          1 + (this.totalDocs - searchIndex[term].docFreq + 0.5) / (searchIndex[term].docFreq + 0.5),
        );

        const numerator: number = termFreq * (this.k1 + 1);
        const denominator: number =
          termFreq + this.k1 * (1 - this.b + this.b * (this.docLengths[docKey] / this.getAvgDocLength()));
        score += idf * (numerator / denominator);
      }

      scores[docKey] = score;
    }
    return scores;
  }
}

export default BM25;
