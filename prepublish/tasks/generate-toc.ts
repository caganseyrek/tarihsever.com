import fs from "fs";
import path from "path";

import { slugify } from "@/shared/utils";

import { Globals } from "@/types/globals";

class TOCGenerator {
  private static readonly HEADING_REGEX: RegExp = /^(#+)\s+(.*?)$/;

  /**
   * Generates a Table of Contents (TOC) for a given article file.
   * If a TOC already exists, it will be updated; otherwise, a new one is added at the start.
   * @param {string} articleFullPath - The full file path of the article.
   */
  public static generate(articleFullPath: string): void {
    const articleDirectory: string = path.dirname(articleFullPath);
    const articleFileBaseName: string = path.basename(articleFullPath, ".mdx");
    const articleMetadataFilePath: string = path.join(articleDirectory, `${articleFileBaseName}.toc.ts`);

    // Read the file contents as string
    const fileContent: string = fs.readFileSync(articleFullPath, "utf8");

    const parsedHeadings: Globals.Data.HeadingProps[] = this.parseHeadings(fileContent);
    const generatedNodes: Globals.Data.HeadingNodeProps[] = this.generateTocNodes(parsedHeadings);

    const tocFileContent: string = `// This file is auto-generated
import { Globals } from "@/types/globals";

export const toc: Globals.Data.HeadingNodeProps[] = ${JSON.stringify(generatedNodes, null, 2)};\n`;

    // Save the update file contents
    fs.writeFileSync(articleMetadataFilePath, tocFileContent, "utf8");
  }

  /**
   * Retrieves and parses the headings from the file content.
   * @private
   * @param {string} fileContent - The markdown file content.
   * @returns {HeadingProps[]} An array of parsed headings with their text and level.
   */
  private static parseHeadings(fileContent: string): Globals.Data.HeadingProps[] {
    // Split the content string from the '\n' characters then filter the resulting array
    // to only include the elements that starts with # (headings)
    const headingsArray: string[] = fileContent.split("\n").filter((token) => token.startsWith("#"));
    const parsedHeadings: Globals.Data.HeadingProps[] = [];

    headingsArray.forEach((heading) => {
      const match: RegExpMatchArray | null = this.HEADING_REGEX.exec(heading);
      if (match) {
        // Get the heading level from the number of #s
        const level: number = match[1].length;

        // Get the text of the heading
        const text: string = match[2].trim();

        // Add the heading details into the headings array
        parsedHeadings.push({ level: level, text: text });
      }
    });
    return parsedHeadings;
  }

  /**
   * Converts a flat list of headings into a hierarchical TOC structure.
   * @private
   * @param {HeadingProps[]} parsedHeadings - The list of parsed headings.
   * @returns {HeadingNodeProps[]} A hierarchical list of TOC nodes.
   */
  private static generateTocNodes(parsedHeadings: Globals.Data.HeadingProps[]): Globals.Data.HeadingNodeProps[] {
    const generatedNodes: Globals.Data.HeadingNodeProps[] = [];
    const stack: Globals.Data.HeadingNodeProps[] = [];

    for (const heading of parsedHeadings) {
      const node: Globals.Data.HeadingNodeProps = {
        id: slugify(heading.text),
        text: heading.text,
        level: heading.level,
        children: [],
      };

      // Loop to pop elements from the stack while their level is greater than
      // or equal to the current heading's level
      while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
        stack.pop();
      }
      // Skip h1 headings, as they are reserved for the main page title
      if (heading.level === 1) continue;

      // If the stack is empty, it means the node is at the top level,
      // so we add it to the 'generatedNodes' array
      if (stack.length === 0) {
        generatedNodes.push(node);
      } else {
        // Otherwise, it is a child of the last node in the stack, so we push it as a child
        stack[stack.length - 1].children.push(node);
      }
      stack.push(node);
    }
    return generatedNodes;
  }
}

export default TOCGenerator;
