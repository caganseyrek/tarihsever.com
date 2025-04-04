import fs from "fs";
import path from "path";

import { Globals } from "@/types/globals";

import PrepublishUtils from "@/prepublish/prepublish-utils";
import Workflow from "@/prepublish/workflow";

class ShortLinkGenerator {
  private static shortLinks: Globals.Data.ShortLinkProps[] = [];

  // Allowed characters for generating short link codes.
  private static shortLinkChars: Readonly<string> = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Set of already generated short link codes to prevent duplicates.
  private static generatedCodes: Set<string> = new Set();

  // Set of article that has short link to prevent duplicates.
  private static processedRedirectPaths: Set<string> = new Set();

  /**
   * Generates a new short link for a given file path.
   * Ensures the generated code is unique.
   * @param {string} fullPath - The full path of the article for which to generate a short link.
   * @returns {void}
   */
  public static generate(fullPath: string): void {
    const formattedPath: string = PrepublishUtils.parseFullArticlePath(fullPath);

    // Return early if current path has already a code generated for it
    if (this.processedRedirectPaths.has(formattedPath)) return;

    let code: string;
    do {
      code = Array.from(
        { length: 8 },
        () => this.shortLinkChars[Math.floor(Math.random() * this.shortLinkChars.length)],
      ).join("");
    } while (this.generatedCodes.has(code));

    // Store the newly generated code to avoid duplicates
    this.generatedCodes.add(code);
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
      const { shortLinks } = await import("@/resources/generated/shortlinks");

      // Add existing short links to the lists to make sure we are not
      // generating a duplicate short link
      shortLinks.forEach((shortLink) => {
        this.shortLinks.push(shortLink);
        this.generatedCodes.add(shortLink.shortLinkCode);
        this.processedRedirectPaths.add(shortLink.redirectsTo);
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
import { Globals } from "@/types/globals";

export const shortLinks: Globals.Data.ShortLinkProps[] = ${JSON.stringify(this.shortLinks, null, 2)};\n`;
    fs.writeFileSync(path.join(Workflow.outputDirectory, outputFileName), shortLinkFileContent, "utf8");
  }
}

export default ShortLinkGenerator;
