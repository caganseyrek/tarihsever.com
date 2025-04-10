import fs from "fs";
import path from "path";

import { shortlinks } from "@/contents/__generated__/shortlinks";

import { NodeData } from "@/prepublish/shared/node-data";
import { NodeUtils } from "@/prepublish/shared/node-utils";

import type { Globals } from "@/types/globals";

class ShortlinksGenerator {
  private static shortlinks: Globals.Data.ShortlinkProps[] = [];

  // Allowed characters for generating short link codes.
  private static readonly shortlinkChars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Set of already generated short link codes to prevent duplicates.
  private static generatedCodes: Set<string> = new Set();

  // Set of article that has short link to prevent duplicates.
  private static processedRedirectPaths: Set<string> = new Set();

  public static loadExisting(): void {
    // Reset the short links array just in case
    this.shortlinks = [];

    // Add existing short links to the lists to make sure we are not
    // generating a duplicate short link
    shortlinks.forEach((shortlink) => {
      this.shortlinks.push(shortlink);
      this.generatedCodes.add(shortlink.shortlinkCode);
      this.processedRedirectPaths.add(shortlink.redirectsTo);
    });
  }

  public static processPath(fullPath: string): void {
    const formattedPath: string = NodeUtils.parseFullArticlePath(fullPath);

    // Return early if current path has already a code generated for it
    if (this.processedRedirectPaths.has(formattedPath)) return;

    let code: string;
    do {
      code = Array.from(
        { length: 8 },
        () => this.shortlinkChars[Math.floor(Math.random() * this.shortlinkChars.length)],
      ).join("");
    } while (this.generatedCodes.has(code));

    // Store the newly generated code to avoid duplicates
    this.generatedCodes.add(code);
    this.shortlinks.push({ shortlinkCode: code, redirectsTo: formattedPath });
  }

  public static saveTo(outputFileName: string): void {
    // Save the generated article lookup set to the output set file
    const fileContents: string = `// This file is auto-generated
import type { Globals } from "@/types/globals";

export const shortlinks: Globals.Data.ShortlinkProps[] = ${JSON.stringify(this.shortlinks, null, 2)};\n`;

    const outputPath: string = path.join(NodeData.outputDirectory, outputFileName);

    fs.writeFileSync(outputPath, fileContents, "utf8");
  }
}

export { ShortlinksGenerator };
