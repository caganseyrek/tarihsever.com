import fs from "fs";
import path from "path";

import { PrepublishUtils } from "@/prepublish/prepublish-utils";
import { Workflow } from "@/prepublish/workflow";

import type { Globals } from "@/types/globals";

class TitleGenerator {
  public static titles: Globals.Data.TitleProps = {};

  public static generate(articleFullPath: string): boolean {
    const formattedPath: string = PrepublishUtils.parseFullArticlePath(articleFullPath);
    const pathParts = formattedPath.split("/");
    const [prefix, topicKey, subtopicKey, articleKey] = pathParts;

    const topicPath: string = prefix + "/" + topicKey;
    const subtopicPath: string = topicPath + "/" + subtopicKey;
    const articlePath: string = subtopicPath + "/" + articleKey;

    if (!this.titles[topicPath] || this.titles[topicPath].formattedTitle === "") {
      this.titles[topicPath] = { originalTitle: topicKey, formattedTitle: topicKey };
      return false;
    }
    if (!this.titles[subtopicPath] || this.titles[subtopicPath].formattedTitle === "") {
      this.titles[subtopicPath] = { originalTitle: subtopicKey, formattedTitle: subtopicKey };
      return false;
    }
    if (!this.titles[articlePath] || this.titles[articlePath].formattedTitle === "") {
      this.titles[articlePath] = { originalTitle: articleKey, formattedTitle: articleKey };
      return false;
    }
    return true;
  }

  public static async loadExistingTitles(): Promise<void> {
    // Reset the titles just in case
    this.titles = {};

    // Try to read and parse existing titles
    try {
      const { titles } = await import("@/contents/__generated__/titles");

      // Add existing titles to the internal titles object to make sure we are not
      // overriding unnecessarily
      this.titles = titles;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to load existing titles: " + error);
    }
  }

  public static saveTitles(outputFileName: string): void {
    const navFileContent: string = `// This file is auto-generated
import type { Globals } from "@/types/globals";

export const titles: Globals.Data.TitleProps = ${JSON.stringify(this.titles, null, 2)};\n`;

    fs.writeFileSync(path.join(Workflow.outputDirectory, outputFileName), navFileContent, "utf8");
  }
}

export { TitleGenerator };
