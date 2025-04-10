import fs from "fs";
import path from "path";

import { articleLookup } from "@/contents/__generated__/article-lookup";

import { NodeData } from "@/prepublish/shared/node-data";
import { NodeUtils } from "@/prepublish/shared/node-utils";

class ArticleLookupBuilder {
  // This is array is converted to Set<string> when saving
  private static articleLookup: string[] = [];

  public static loadExisting(): void {
    this.articleLookup = [];
    Array.from(articleLookup).forEach((item) => this.articleLookup.push(item));
  }

  public static processPath(articleFullPath: string): void {
    const formattedPath: string = NodeUtils.parseFullArticlePath(articleFullPath);

    // Add the formatted path to article lookup if it doesn't already exists
    if (!this.articleLookup.includes(formattedPath)) {
      this.articleLookup.push(formattedPath);
    }
  }

  public static saveTo(outputFileName: string): void {
    const fileContents: string = `// This file is auto-generated
export const articleLookup: Set<string> = new Set(${JSON.stringify([...this.articleLookup], null, 2)});\n`;

    const outputPath: string = path.join(NodeData.outputDirectory, outputFileName);
    fs.writeFileSync(outputPath, fileContents, "utf8");
  }
}

export { ArticleLookupBuilder };
