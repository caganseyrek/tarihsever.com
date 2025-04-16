// This file is auto-generated
// This file is auto-generated
import type { ContentTreeProps } from "@/types/globals";

const contentTreeLookup: Set<string> = new Set([
  "konular/koloniyalizm/amerikada-kolonicilik/example",
  "konular/koloniyalizm/kesif-cagi/example"
]);
const contentTreeArticles: Record<string, string> = {
  "konular/koloniyalizm/amerikada-kolonicilik/example": "Example",
  "konular/koloniyalizm/kesif-cagi/example": "Example"
};
const contentTree: ContentTreeProps[] = [
  {
    "key": "koloniyalizm",
    "title": "Koloniyalizm",
    "subtopics": [
      {
        "key": "amerikada-kolonicilik",
        "title": "Amerika'da Kolonicilik",
        "articles": [
          {
            "key": "example",
            "title": "Example",
            "path": "konular/koloniyalizm/amerikada-kolonicilik/example"
          }
        ]
      },
      {
        "key": "kesif-cagi",
        "title": "Keşif Çağı",
        "articles": [
          {
            "key": "example",
            "title": "Example",
            "path": "konular/koloniyalizm/kesif-cagi/example"
          }
        ]
      }
    ]
  }
];
export { contentTreeLookup, contentTreeArticles, contentTree }