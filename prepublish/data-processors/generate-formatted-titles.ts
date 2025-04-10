import fs from "fs";
import path from "path";

import { formattedTitles } from "@/contents/__generated__/formatted-titles";

import { NodeData } from "@/prepublish/shared/node-data";
import { NodeUtils } from "@/prepublish/shared/node-utils";

import type { Globals } from "@/types/globals";

class FormattedTitleGenerator {
  public static formattedTitles: Globals.Data.FormattedTitleProps = {};

  public static loadExisting(): void {
    // Reset the titles just in case
    this.formattedTitles = {};

    // Add existing titles to the internal titles object to
    // make sure we are not overriding unnecessarily
    this.formattedTitles = formattedTitles;
  }

  public static processPath(articleFullPath: string): boolean {
    const formattedPath: string = NodeUtils.parseFullArticlePath(articleFullPath);
    const pathParts = formattedPath.split("/");
    const [prefix, topicKey, subtopicKey, articleKey] = pathParts;

    const topicPath: string = prefix + "/" + topicKey;
    const subtopicPath: string = topicPath + "/" + subtopicKey;
    const articlePath: string = subtopicPath + "/" + articleKey;

    if (!this.formattedTitles[topicPath] || this.formattedTitles[topicPath].formattedTitle === "") {
      this.formattedTitles[topicPath] = { originalTitle: topicKey, formattedTitle: topicKey };
      return false;
    }
    if (!this.formattedTitles[subtopicPath] || this.formattedTitles[subtopicPath].formattedTitle === "") {
      this.formattedTitles[subtopicPath] = { originalTitle: subtopicKey, formattedTitle: subtopicKey };
      return false;
    }
    if (!this.formattedTitles[articlePath] || this.formattedTitles[articlePath].formattedTitle === "") {
      this.formattedTitles[articlePath] = { originalTitle: articleKey, formattedTitle: articleKey };
      return false;
    }
    return true;
  }

  public static saveTo(outputFileName: string): void {
    const fileContents: string = `// This file is auto-generated
import type { Globals } from "@/types/globals";

export const formattedTitles: Globals.Data.FormattedTitleProps = ${JSON.stringify(this.formattedTitles, null, 2)};\n`;

    const outputPath: string = path.join(NodeData.outputDirectory, outputFileName);
    fs.writeFileSync(outputPath, fileContents, "utf8");
  }
}

export { FormattedTitleGenerator };
