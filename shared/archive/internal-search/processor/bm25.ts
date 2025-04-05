import { searchIndex } from "@/content/data/generated/search-index";

export interface ScoreProps {
  [docKey: string]: number;
}

class BM25 {
  private static readonly b: number = 0.75;
  private static readonly k1: number = 1.2;

  private static avgDocLength: number;
  private static docLengths: { [docKey: string]: number } = {};
  private static totalDocs: number = Object.keys(searchIndex)
    .flatMap((term) => Object.keys(searchIndex[term].postings))
    .reduce((uniqueDocs, docKey) => {
      uniqueDocs.add(docKey);
      return uniqueDocs;
    }, new Set<string>()).size;

  private static getAvgDocLength(): number {
    if (this.avgDocLength !== undefined) return this.avgDocLength;

    this.avgDocLength =
      Object.values(this.docLengths).reduce((sum, length) => sum + length, 0) / Object.keys(this.docLengths).length;
    return this.avgDocLength;
  }

  public static getScores(tokens: string[], candidates: Set<string>): ScoreProps {
    const scores: ScoreProps = {};

    for (const docKey of candidates) {
      let score: number = 0;

      for (const term of tokens) {
        const termFreq: number = searchIndex[term]?.postings[docKey]?.termFreq ?? 0;
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
