import fs from "fs";
import path from "path";

import { ArticleFileProps, Loader } from "../file-manager/loader";

interface ParsedArticleDetails {
  topic: string;
  key: string;
  title: string;
}

class ArticleMapper {
  private static inputDir: string = path.join(process.cwd(), "data", "content", "articles");
  private static outputDir: string = path.join(process.cwd(), "lib", "mapper", "generated");

  private constructor() {}

  private static readMdFilesInArticlesFolder(): string[] {
    const files: string[] = fs.readdirSync(this.inputDir).filter((file) => path.extname(file) === ".md");
    return files.map((file) => file.replace(/\.md$/, ""));
  }

  private static parseFileNames(files: string[]): ParsedArticleDetails[] {
    return files.map((fileName) => {
      const nameContents: string[] = fileName.split("&");
      const article: ArticleFileProps = Loader.loadArticle(nameContents[0], nameContents[1]);

      return {
        topic: article.topic,
        key: article.key,
        title: article.title,
      };
    });
  }

  private static saveMappedFiles(parsedFileNames: ParsedArticleDetails[]): void {
    const fileContent: string = `// This array is auto-generated

export interface ArticleMapProps {
  topic: string;
  key: string;
  title: string;
}

export const articlesMap: ArticleMapProps[] = ${JSON.stringify(parsedFileNames)}`;
    fs.writeFileSync(this.outputDir + "/articlesMap.ts", fileContent, "utf-8");
  }

  public static init(): void {
    const articleFiles: string[] = this.readMdFilesInArticlesFolder();
    const parsedArticleFiles: ParsedArticleDetails[] = this.parseFileNames(articleFiles);
    this.saveMappedFiles(parsedArticleFiles);
    // eslint-disable-next-line no-console
    console.log("[INFO] Generated articles map.");
  }
}

export default ArticleMapper;
