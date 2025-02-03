import fs from "fs";
import path from "path";

import { articlesMap } from "@/lib/mapper/generated/articlesMap";

import { topicsMap } from "@/data/staticMaps";

type NormalizedMapProps =
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

class ShortlinkMapper {
  private static generatedRedirectCodes = new Set<string>();
  private static outputDir: string = path.join(process.cwd(), "lib", "mapper", "generated");

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

  private static normalizeMaps(): NormalizedMapProps[] {
    const articles: NormalizedMapProps[] = articlesMap.map((article) => {
      return {
        type: "article",
        topic: article.topic,
        key: article.key,
      };
    });
    const topics: NormalizedMapProps[] = topicsMap.map((topic) => {
      return {
        type: "topic",
        key: topic.key,
      };
    });

    return [...articles, ...topics];
  }

  private static generateShortlinks(normalizedMaps: NormalizedMapProps[]): GeneratedShortlinkProps[] {
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
    const normalizedMaps: NormalizedMapProps[] = this.normalizeMaps();
    const generatedShortlinks: GeneratedShortlinkProps[] = this.generateShortlinks(normalizedMaps);
    this.saveGeneratedShortlinks(generatedShortlinks);
    // eslint-disable-next-line no-console
    console.log("[INFO] Generated shortlinks map.");
  }
}

export default ShortlinkMapper;
