import fs from "fs";
import path from "path";

import { Logger } from "@/prepublish/common/logger";
import { contentDirectory } from "@/prepublish/common/node-data";

const HEADING_REGEX: Readonly<RegExp> = /^(#+)\s+(.*?)$/;
const H1_HEADING_MATCH_REGEX: Readonly<RegExp> = /^#\s(.+)/;
const H1_HEADING_REPLACE_REGEX: Readonly<RegExp> = /^#\s.+\n/;

// Content file's extensions
const ARTICLE_FILE_EXT: Readonly<string> = ".mdx";

const walkDirectory = (dirPath: string, operation: (currentArticleFullPath: string) => void): void => {
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
      walkDirectory(fullPath, operation);
    } else if (file.endsWith(ARTICLE_FILE_EXT)) {
      operation(fullPath);
    }
  });
};

const urlifyPath = (articleFullPath: string, omitPrefix?: boolean): string => {
  // Get relative path from the full path, normalize the path string, and remove the file extension
  const relativePath: string = path
    .relative(contentDirectory, articleFullPath)
    .replace(/\\/g, "/")
    .replace(ARTICLE_FILE_EXT, "");

  // The relative path currently starts with 'topics/'. In here we remove this 'topics/' prefix
  const pathArray: string[] = relativePath.split("/").slice(1);
  if (!omitPrefix) {
    // We add 'konular/' prefix if omitPrefix is false
    // We add this prefix to match the url that the article will be present
    pathArray.unshift("konular");
  }
  return pathArray.join("/");
};

const getFilePath = (urlLikePath: string) => {
  const pathArray: string[] = urlLikePath.split("/").slice(1);
  pathArray.unshift("topics");
  pathArray.unshift("content");

  return path.join(process.cwd(), pathArray.join("/"));
};

const getArticleTitle = (articleFullPath: string): string | undefined => {
  // Read the file contents as string
  const fileContent: string = fs.readFileSync(articleFullPath, "utf8");
  const headerMatch: RegExpExecArray | null = H1_HEADING_MATCH_REGEX.exec(fileContent);

  if (!headerMatch) return undefined;
  return headerMatch[1];
};

export {
  HEADING_REGEX,
  H1_HEADING_MATCH_REGEX,
  H1_HEADING_REPLACE_REGEX,
  ARTICLE_FILE_EXT,
  walkDirectory,
  urlifyPath,
  getFilePath,
  getArticleTitle,
};
