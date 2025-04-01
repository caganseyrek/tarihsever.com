import fs from "fs";
import path from "path";

import { topicLinks } from "@/shared/data/topicLinks";

import { articleLinks } from "@/prepublish/generated/articleLinks";

type NormalizedDetailsProps =
  | {
      type: "article";
      topic: string;
      key: string;
    }
  | {
      type: "topic";
      key: string;
    };

interface GeneratedShortlinkProps {
  code: string;
  redirectTo: string;
}

class ShortlinkGenerator {
  private static generatedRedirectCodes = new Set<string>();
  private static outputDir: string = path.join(process.cwd(), "prepublish", "generated");

  private constructor() {}

  private static generateRedirectCode(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code: string;

    do {
      code = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    } while (this.generatedRedirectCodes.has(code));

    this.generatedRedirectCodes.add(code);
    return code;
  }

  private static normalizeDetails(): NormalizedDetailsProps[] {
    const articles: NormalizedDetailsProps[] = articleLinks.map((article) => {
      return {
        type: "article",
        topic: article.topic,
        key: article.key,
      };
    });
    const topics: NormalizedDetailsProps[] = topicLinks.map((topic) => {
      return {
        type: "topic",
        key: topic.key,
      };
    });

    return [...articles, ...topics];
  }

  private static generateShortlinks(normalizedMaps: NormalizedDetailsProps[]): GeneratedShortlinkProps[] {
    return normalizedMaps.map((item) => {
      if (item.type === "article") {
        return {
          code: this.generateRedirectCode(),
          redirectTo: `/konular/${item.topic}/${item.key}`,
        };
      }
      return {
        code: this.generateRedirectCode(),
        redirectTo: `/konular/${item.key}`,
      };
    });
  }

  private static saveGeneratedShortlinks(generatedShortlinks: GeneratedShortlinkProps[]): void {
    const fileContent: string = `// This array is auto-generated

export interface ShortlinkMapProps {
  code: string;
  redirectTo: string;
}

export const shortlinksMap: ShortlinkMapProps[] = ${JSON.stringify(generatedShortlinks)}`;
    fs.writeFileSync(this.outputDir + "/shortlinksMap.ts", fileContent, "utf-8");
  }

  public static init(): void {
    const normalizedDetails: NormalizedDetailsProps[] = this.normalizeDetails();
    const generatedShortlinks: GeneratedShortlinkProps[] = this.generateShortlinks(normalizedDetails);
    this.saveGeneratedShortlinks(generatedShortlinks);
    // eslint-disable-next-line no-console
    console.log("[INFO] Generated shortlinks map.");
  }
}

export default ShortlinkGenerator;
