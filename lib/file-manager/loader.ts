import fs from "fs";
import matter from "gray-matter";
import path from "path";

import { TopicMapProps } from "@/data/staticMaps";

import { ArticleMapProps } from "../mapper/generated/articlesMap";

export interface TopicFileProps extends Omit<TopicMapProps, "subtitle"> {
  content: string;
}

export interface ArticleFileProps extends ArticleMapProps {
  content: string;
}

class BaseLoader {
  constructor() {}

  private normalizeExtname(fileName: string): string {
    if (fileName.endsWith(".md")) {
      return fileName;
    }
    return fileName + ".md";
  }

  public doesFileExists(dir: string, fileName: string): boolean {
    return fs.existsSync(path.join(dir, fileName));
  }

  private parseFrontmatter<T>(loadedFile: string): T {
    const { content, data } = matter(loadedFile);
    return { ...(data as Omit<T, "content">), content: content } as T;
  }

  private readMdFilesInFolder(dir: string): string[] {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === ".md");
  }

  public readPlainMdFile(dir: string, fileName: string): string {
    const loadedFile: string = fs.readFileSync(path.join(dir, this.normalizeExtname(fileName)), "utf-8");
    return loadedFile;
  }

  public readMdFile<T>(dir: string, fileName: string): T {
    const loadedFile: string = fs.readFileSync(path.join(dir, this.normalizeExtname(fileName)), "utf-8");
    return this.parseFrontmatter<T>(loadedFile);
  }

  public readAllMdFiles<T>(dir: string): T[] {
    return this.readMdFilesInFolder(dir).map((file) => this.readMdFile<T>(dir, file));
  }
}

export class Loader {
  private static baseLoader: BaseLoader = new BaseLoader();
  private static dir: { custom: string; article: string; topic: string } = {
    custom: path.join(process.cwd(), "data", "content"),
    article: path.join(process.cwd(), "data", "content", "articles"),
    topic: path.join(process.cwd(), "data", "content", "topics"),
  };

  private constructor() {}

  public static loadCustomPage(pageKey: string): string {
    return this.baseLoader.readPlainMdFile(this.dir.custom, pageKey);
  }

  public static loadTopic(topicKey: string): TopicFileProps {
    return this.baseLoader.readMdFile<TopicFileProps>(this.dir.topic, topicKey);
  }

  public static loadAllTopics(): TopicFileProps[] {
    return this.baseLoader.readAllMdFiles<TopicFileProps>(this.dir.topic);
  }

  public static loadArticle(topicKey: string, articleKey: string): ArticleFileProps {
    return this.baseLoader.readMdFile<ArticleFileProps>(this.dir.article, `${topicKey}&${articleKey}`);
  }

  public static loadAllArticles(): ArticleFileProps[] {
    return this.baseLoader.readAllMdFiles<ArticleFileProps>(this.dir.article);
  }
}
