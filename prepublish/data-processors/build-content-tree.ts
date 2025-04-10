import fs from "fs";
import path from "path";

import { contentTree } from "@/contents/__generated__/content-tree";

import { NodeData } from "@/prepublish/shared/node-data";
import { NodeUtils } from "@/prepublish/shared/node-utils";

import { FormattedTitleGenerator } from "@/prepublish/data-processors/generate-formatted-titles";

import type { Globals } from "@/types/globals";

class ContentTreeBuilder {
  private static contentTree: Globals.Data.ContentTreeProps[] = [];

  public static loadExisting(): void {
    this.contentTree = [];
    contentTree.forEach((item) => this.contentTree.push(item));
  }

  public static processPath(articleFullPath: string): void {
    const formattedPath: string = NodeUtils.parseFullArticlePath(articleFullPath);
    const pathParts = formattedPath.split("/");

    const [prefix, topicKey, subtopicKey, articleKey] = pathParts;

    const topicPath: string = prefix + "/" + topicKey;
    const subtopicPath: string = topicPath + "/" + subtopicKey;
    const articlePath: string = subtopicPath + "/" + articleKey;

    let topic = this.contentTree.find((topic) => topic.key === topicKey);
    if (!topic) {
      topic = {
        key: topicKey,
        title: FormattedTitleGenerator.formattedTitles[topicPath].formattedTitle,
        path: `/konular/${topicKey}`,
        subtopics: [],
      };
      this.contentTree.push(topic);
    }

    let subtopic = topic.subtopics.find((subtopic) => subtopic.key === subtopicKey);
    if (!subtopic) {
      subtopic = {
        key: subtopicKey,
        title: FormattedTitleGenerator.formattedTitles[subtopicPath].formattedTitle,
        path: `/konular/${topicKey}/${subtopicKey}`,
        articles: [],
      };
      topic.subtopics.push(subtopic);
    }

    if (!subtopic.articles.some((article) => article.key === articleKey)) {
      subtopic.articles.push({
        key: articleKey,
        title: FormattedTitleGenerator.formattedTitles[articlePath].formattedTitle,
        path: `/konular/${topicKey}/${subtopicKey}/${articleKey}`,
      });
    }
  }

  public static saveTo(outputFileName: string): void {
    const fileContents: string = `// This file is auto-generated
import type { Globals } from "@/types/globals";

export const contentTree: Globals.Data.ContentTreeProps[] = ${JSON.stringify(
      this.contentTree,
      (key, value) => {
        // For preventing reordering of content tree's items
        if (key === "") return value;
        return value;
      },
      2,
    )};\n`;

    const outputPath: string = path.join(NodeData.outputDirectory, outputFileName);
    fs.writeFileSync(outputPath, fileContents, "utf8");
  }
}

export { ContentTreeBuilder };
