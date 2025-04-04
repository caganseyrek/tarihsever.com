import fs from "fs";
import path from "path";

import { formatForDisplay } from "@/shared/utils";

import type { Globals } from "@/types/globals";

import PrepublishUtils from "@/prepublish/prepublish-utils";
import Workflow from "@/prepublish/workflow";

class ArticleNavGenerator {
  private static articleNav: Globals.Data.ArticleNavProps[] = [];

  public static addToNav(articleFullPath: string) {
    const formattedPath: string = PrepublishUtils.parseFullArticlePath(articleFullPath);
    const pathParts = formattedPath.split("/");

    const [, topicKey, subtopicKey, articleKey] = pathParts;

    let topic: Globals.Data.ArticleNavProps | undefined = this.articleNav.find((t) => t.key === topicKey);
    if (!topic) {
      topic = {
        key: topicKey,
        title: formatForDisplay(topicKey.replace(/-/g, " ")),
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
        title: formatForDisplay(subtopicKey.replace(/-/g, " ")),
        path: `/konular/${topicKey}/${subtopicKey}`,
        articles: [],
      };
      topic.subtopics.push(subtopic);
    }

    // Add the article if not already present
    if (!subtopic.articles.some((a) => a.key === articleKey)) {
      subtopic.articles.push({
        key: articleKey,
        title: formatForDisplay(articleKey.replace(/-/g, " ")),
        path: `/konular/${topicKey}/${subtopicKey}/${articleKey}`,
      });
    }
  }

  public static saveArticleNav(outputFileName: string) {
    const navFileContent: string = `// This file is auto-generated
import { Globals } from "@/types/globals";

export const articleNav: Globals.Data.ArticleNavProps[] = ${JSON.stringify(this.articleNav, null, 2)};\n`;
    fs.writeFileSync(path.join(Workflow.outputDirectory, outputFileName), navFileContent, "utf8");
  }
}

export default ArticleNavGenerator;
