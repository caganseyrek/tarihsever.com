import fs from "fs";
import path from "path";

import PrepublishUtils from "@/prepublish/prepublish-utils";
import Workflow from "@/prepublish/workflow";

/**
 * Represents a short link mapping.
 * @property {string} shortLinkCode - The generated short link code.
 * @property {string} redirectsTo - The full URL or path the short link redirects to.
 */
export interface ShortLinkProps {
  shortLinkCode: string;
  redirectsTo: string;
}

class ShortLinkGenerator {
  private static shortLinks: ShortLinkProps[] = [];

  // Allowed characters for generating short link codes.
  private static shortLinkChars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Set of already generated short link codes to prevent duplicates.
  private static generatedShortLinks: Set<string> = new Set();

  /**
   * Generates a new short link for a given file path.
   * Ensures the generated code is unique.
   * @param {string} fullPath - The full path of the article for which to generate a short link.
   * @returns {void}
   */
  public static generate(fullPath: string): void {
    const formattedPath: string = PrepublishUtils.parseFullArticlePath(fullPath);

    let code: string;
    do {
      code = Array.from(
        { length: 8 },
        () => this.shortLinkChars[Math.floor(Math.random() * this.shortLinkChars.length)],
      ).join("");
    } while (this.generatedShortLinks.has(code));

    // Store the newly generated code to avoid duplicates
    this.generatedShortLinks.add(code);
    this.shortLinks.push({ shortLinkCode: code, redirectsTo: formattedPath });
  }

  /**
   * Loads existing short links from a generated file to avoid duplicate short links.
   * If the file does not exist, logs an error but does not interrupt execution.
   * @returns {Promise<void>} A promise that resolves once existing short links are loaded.
   */
  public static async loadExistingShortLinks(): Promise<void> {
    // Reset the short links array just in case
    this.shortLinks = [];

    // Try to read and parse existing short links
    try {
      const { shortLinks } = await import("@/prepublish/generated/shortlinks");

      // Add existing short links to the lists to make sure we are not
      // generating a duplicate short link
      shortLinks.forEach((shortLink) => {
        this.shortLinks.push(shortLink);
        this.generatedShortLinks.add(shortLink.shortLinkCode);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to load existing shortlinks: " + error);
    }
  }

  /**
   * Saves the generated short links to a file.
   * The file is auto-generated and should not be manually modified.
   * @param {string} outputFileName - The name of the file to save the short links.
   * @returns {void}
   */
  public static saveShortLinks(outputFileName: string): void {
    // Save the generated article lookup set to the output set file
    const shortLinkFileContent: string = `// This file is auto-generated
import { ShortLinkProps } from "@/prepublish/tasks/generate-shortlinks";

export const shortLinks: ShortLinkProps[] = ${JSON.stringify(this.shortLinks, null, 2)};\n`;
    fs.writeFileSync(path.join(Workflow.outputDirectory, outputFileName), shortLinkFileContent, "utf8");
  }
}

export default ShortLinkGenerator;
