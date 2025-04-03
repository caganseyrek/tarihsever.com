import fs from "fs";
import path from "path";

import PrepublishUtils from "@/prepublish/prepublish-utils";
import Workflow from "@/prepublish/workflow";

class ArticleSetGenerator {
  // This is array is converted to Set<string> when saving.
  private static articleSet: string[] = [];

  /**
   * Adds a formatted file path to the article set.
   * The path is transformed into a relative format before being stored.
   * @param {string} articleFullPath - The full path of the article to add.
   */
  public static addPathToSet(articleFullPath: string): void {
    const formattedPath: string = PrepublishUtils.parseFullArticlePath(articleFullPath);

    // Add the formatted path to article lookup set
    this.articleSet.push(formattedPath);
  }

  /**
   * Saves the current article set to a specified output file.
   * The set is exported as a JavaScript `Set<string>`.
   * @param {string} outputFileName - The name of the file where the article set will be saved.
   */
  public static saveArticleSet(outputFileName: string): void {
    // Save the generated article lookup set to the output set file
    const setFileContent: string = `// This file is auto-generated
export const articleSet: Set<string> = new Set(${JSON.stringify([...this.articleSet], null, 2)});\n`;

    fs.writeFileSync(path.join(Workflow.outputDirectory, outputFileName), setFileContent, "utf8");
  }
}

export default ArticleSetGenerator;
