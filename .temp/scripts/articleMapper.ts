import fs from "fs";
import path from "path";

import { ArticleFileProps, Loader } from "@/shared/lib/file-manager";

import { Globals } from "@/types/globals";

interface MappedArticleDetails extends Globals.LinkProps {
  topic: string;
}

class ArticleMapper {
  private static inputDir: string = path.join(process.cwd(), "shared", "content", "articles");
  private static outputDir: string = path.join(process.cwd(), "prepublish", "generated");

  private constructor() {}

  private static readAllArticleFiles(): string[] {
    const files: string[] = fs.readdirSync(this.inputDir).filter((file) => path.extname(file) === ".md");
    return files.map((file) => file.replace(/\.md$/, ""));
  }

  private static parseAndMapArticleFiles(files: string[]): MappedArticleDetails[] {
    return files.map((fileName) => {
      /* article@topic.md */
      const nameContents: string[] = fileName.split("@");
      const loadedArticle: ArticleFileProps = Loader.loadArticle(
        nameContents[1] /* Article key */,
        nameContents[0] /* Topic Key */,
      );

      return {
        key: loadedArticle.key,
        topic: loadedArticle.topic,
        title: loadedArticle.title,
        path: loadedArticle.path,
      };
    });
  }

  private static saveMappedLinks(parsedFileNames: MappedArticleDetails[]): void {
    const fileContent: string = `// This file is auto-generated
import { Globals } from "@/types/globals";

export interface ArticleLinkProps extends Globals.LinkProps {
  topic: string;
}

export const articleLinks: ArticleLinkProps[] = ${JSON.stringify(parsedFileNames)}`;
    fs.writeFileSync(this.outputDir + "/articleLinks.ts", fileContent, "utf-8");
  }

  public static init(): void {
    const articleFiles: string[] = this.readAllArticleFiles();
    const mappedArticles: MappedArticleDetails[] = this.parseAndMapArticleFiles(articleFiles);
    this.saveMappedLinks(mappedArticles);
    // eslint-disable-next-line no-console
    console.log("[INFO] Generated articles map.");
  }
}

export default ArticleMapper;
