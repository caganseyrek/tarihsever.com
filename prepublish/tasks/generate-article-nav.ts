import fs from "fs";
import path from "path";
import title from "title";

import PrepublishUtils from "@/prepublish/prepublish-utils";
import Workflow from "@/prepublish/workflow";

import type { Globals } from "@/types/globals";

export interface ArticleNavProps extends Globals.LinkProps {
  subtopics: {
    key: string;
    title: string;
    path: string;
    articles: Globals.LinkProps[];
  }[];
}

class ArticleNavGenerator {
  private static articleNav: ArticleNavProps[] = [];

  public static addToNav(articleFullPath: string) {
    const formattedPath: string = PrepublishUtils.parseFullArticlePath(articleFullPath);
    const pathParts = formattedPath.split("/");

    const [, topicKey, subtopicKey, articleKey] = pathParts;

    let topic: ArticleNavProps | undefined = this.articleNav.find((t) => t.key === topicKey);
    if (!topic) {
      topic = {
        key: topicKey,
        title: title(topicKey.replace(/-/g, " ")),
        path: `/konular/${topicKey}`,
        subtopics: [],
      };
      this.articleNav.push(topic);
    }

    // Find or create the subtopic
    let subtopic = topic.subtopics.find((s) => s.key === subtopicKey);
    if (!subtopic) {
      subtopic = {
        key: subtopicKey,
        title: title(subtopicKey.replace(/-/g, " ")),
        path: `/konular/${topicKey}/${subtopicKey}`,
        articles: [],
      };
      topic.subtopics.push(subtopic);
    }

    // Add the article if not already present
    if (!subtopic.articles.some((a) => a.key === articleKey)) {
      subtopic.articles.push({
        key: articleKey,
        title: title(articleKey.replace(/-/g, " ")),
        path: `/konular/${topicKey}/${subtopicKey}/${articleKey}`,
      });
    }
  }

  public static saveArticleNav(outputFileName: string) {
    const navFileContent: string = `// This file is auto-generated
import { ArticleNavProps } from "@/prepublish/tasks/generate-article-nav";

export const articleNav: ArticleNavProps[] = ${JSON.stringify(this.articleNav, null, 2)};\n`;
    fs.writeFileSync(path.join(Workflow.outputDirectory, outputFileName), navFileContent, "utf8");
  }
}

export default ArticleNavGenerator;
