import fs from "fs";
import path from "path";

import Workflow from "./workflow";

class PrepublishUtils {
  // Content file's extensions
  private static FILE_EXT: string = ".mdx";

  /**
   * Recursively walks through a directory and applies an operation to each file with the specified extension.
   * @param {string} dirPath - The directory path to walk through.
   * @param {(currentArticleFullPath: string) => void} operation - The operation to apply to each valid file.
   * @returns {void}
   */
  public static walkDirectory(dirPath: string, operation: (currentArticleFullPath: string) => void): void {
    // Return if the specified path does not exists
    if (!fs.existsSync(dirPath)) {
      // eslint-disable-next-line no-console
      console.log(dirPath + " not found.");
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
      } else if (file.endsWith(this.FILE_EXT)) {
        operation(fullPath);
      }
    });
  }

  /**
   * Parses the full path of an article and returns it in the format `konular/topic/subtopic/article`
   * @param {string} articleFullPath - The full path of the article file.
   * @returns {string} - The parsed relative path with a modified prefix.
   */
  public static parseFullArticlePath(articleFullPath: string): string {
    // Get relative path from the full path, normalize the path string, and remove the file extension
    const relativePath: string = path
      .relative(Workflow.contentDirectory, articleFullPath)
      .replace(/\\/g, "/")
      .replace(this.FILE_EXT, "");

    // The relative path currently starts with 'topics/'
    // In here we replace the 'topics/' prefix with the 'konular/' prefix
    const pathArray: string[] = relativePath.split("/").slice(1);
    pathArray.unshift("konular");
    return pathArray.join("/");
  }
}

export default PrepublishUtils;
