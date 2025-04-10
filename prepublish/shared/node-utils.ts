import fs from "fs";
import path from "path";

import { NodeData } from "@/prepublish/shared/node-data";

import { Logger } from "./prepublish-logger";

class NodeUtils {
  public static readonly HEADING_REGEX: RegExp = /^(#+)\s+(.*?)$/;
  public static readonly H1_HEADING_MATCH_REGEX: RegExp = /^#\s(.+)/;
  public static readonly H1_HEADING_REPLACE_REGEX: RegExp = /^#\s.+\n/;

  // Content file's extensions
  public static readonly ARTICLE_FILE_EXT: string = ".mdx";

  public static walkDirectory(dirPath: string, operation: (currentArticleFullPath: string) => void): void {
    // Return if the specified path does not exists
    if (!fs.existsSync(dirPath)) {
      Logger.warning(`Directory '${dirPath}' not found`);
      return;
    }
    // Read all the files in the specified directory
    const files: string[] = fs.readdirSync(dirPath);

    files.forEach((file) => {
      // Get the full path to check if it is path of a file or a directory
      const fullPath: string = path.join(dirPath, file);
      const stats: fs.Stats = fs.statSync(fullPath);

      // If the current path is a directory, recursively process subdirectories
      if (stats.isDirectory()) {
        this.walkDirectory(fullPath, operation);
      } else if (file.endsWith(this.ARTICLE_FILE_EXT)) {
        operation(fullPath);
      }
    });
  }

  public static parseFullArticlePath(articleFullPath: string, omitPrefix?: boolean): string {
    // Get relative path from the full path, normalize the path string, and remove the file extension
    const relativePath: string = path
      .relative(NodeData.contentDirectory, articleFullPath)
      .replace(/\\/g, "/")
      .replace(this.ARTICLE_FILE_EXT, "");

    // The relative path currently starts with 'topics/'
    // In here we replace the 'topics/' prefix with the 'konular/' prefix if the path is not a page's path
    const pathArray: string[] = relativePath.split("/").slice(1);
    if (!omitPrefix) {
      pathArray.unshift("konular");
    }
    return pathArray.join("/");
  }
}

export { NodeUtils };
