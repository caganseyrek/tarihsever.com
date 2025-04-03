import fs from "fs";

import { slugify } from "@/shared/utils";

/**
 * Represents a heading element in an article.
 * @property {string} text - The text of the heading.
 * @property {number} level - The level of the heading (e.g., 1 for h1, 2 for h2).
 */
export interface HeadingProps {
  text: string;
  level: number;
}

/**
 * Represents a hierarchical heading node with children.
 * @property {string} id - The unique ID of the heading, generated using `slugify`.
 * @property {HeadingNodeProps[]} children - The nested subheadings.
 */
export interface HeadingNodeProps extends HeadingProps {
  id: string;
  children: HeadingNodeProps[];
}

class TOCGenerator {
  // Table of contents regex to check if a content file has one
  private static TOC_REGEX: RegExp = /^export const toc = [\s\S]*?;\n\n/;

  /**
   * Generates a Table of Contents (TOC) for a given article file.
   * If a TOC already exists, it will be updated; otherwise, a new one is added at the start.
   * @param {string} articleFullPath - The full file path of the article.
   */
  public static generate(articleFullPath: string): void {
    // Read the file contents as string
    const fileContent: string = fs.readFileSync(articleFullPath, "utf8");

    const parsedHeadings: HeadingProps[] = this.parseHeadings(fileContent);
    const generatedNodes: HeadingNodeProps[] = this.generateTocNodes(parsedHeadings);

    const tocString: string = `export const toc = ${JSON.stringify(generatedNodes, null, 2)};\n\n`;
    let updatedContent: string;

    // Check if file already have a toc
    if (this.TOC_REGEX.test(fileContent)) {
      // Replace the existing toc if file has one
      updatedContent = fileContent.replace(this.TOC_REGEX, tocString);
    } else {
      // Add the toc at the start of the page if not
      updatedContent = tocString + fileContent;
    }
    // Save the update file contents
    fs.writeFileSync(articleFullPath, updatedContent, "utf8");
  }

  /**
   * Retrieves and parses the headings from the file content.
   * @private
   * @param {string} fileContent - The markdown file content.
   * @returns {HeadingProps[]} An array of parsed headings with their text and level.
   */
  private static parseHeadings(fileContent: string): HeadingProps[] {
    // Split the content string from the '\n' characters then filter the resulting array
    // to only include the elements that starts with # (headings)
    const headingsArray: string[] = fileContent.split("\n").filter((token) => token.startsWith("#"));
    const parsedHeadings: HeadingProps[] = [];

    headingsArray.forEach((heading) => {
      const match: RegExpMatchArray | null = heading.match(/^(#+)\s+(.*)$/);
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
  private static generateTocNodes(parsedHeadings: HeadingProps[]): HeadingNodeProps[] {
    const generatedNodes: HeadingNodeProps[] = [];
    const stack: HeadingNodeProps[] = [];

    for (const heading of parsedHeadings) {
      const node: HeadingNodeProps = {
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
