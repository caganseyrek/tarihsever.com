/* eslint-disable no-console */
import fs from "fs";
import path from "path";

import PrepublishUtils from "@/prepublish/prepublish-utils";
import Workflow from "@/prepublish/workflow";

import Regex from "@/shared/regex";

import type { Globals } from "@/types/globals";

class ArticleProcessor {
  // This is array is converted to Set<string> when saving.
  private static articleSet: string[] = [];

  private static articleNav: Globals.Data.ArticleNavProps[] = [];

  private static articleTitles: Globals.Data.ArticleTitleProps = {};

  public static addPathToSet(articleFullPath: string): void {
    const formattedPath: string = PrepublishUtils.parseFullArticlePath(articleFullPath);

    // Add the formatted path to article lookup set
    this.articleSet.push(formattedPath);
  }

  public static addToNav(articleFullPath: string): void {
    const formattedPath: string = PrepublishUtils.parseFullArticlePath(articleFullPath);
    const pathParts = formattedPath.split("/");

    const [prefix, topicKey, subtopicKey, articleKey] = pathParts;

    const topicPath: string = prefix + "/" + topicKey;
    const subtopicPath: string = topicPath + "/" + subtopicKey;
    const articlePath: string = subtopicPath + "/" + articleKey;

    let topic = this.articleNav.find((topic) => topic.key === topicKey);
    if (!topic) {
      topic = {
        key: topicKey,
        title: this.articleTitles[topicPath].formattedTitle,
        path: `/konular/${topicKey}`,
        subtopics: [],
      };
      this.articleNav.push(topic);
    }

    // Find or create the subtopic
    let subtopic = topic.subtopics.find((subtopic) => subtopic.key === subtopicKey);
    if (!subtopic) {
      subtopic = {
        key: subtopicKey,
        title: this.articleTitles[subtopicPath].formattedTitle,
        path: `/konular/${topicKey}/${subtopicKey}`,
        articles: [],
      };
      topic.subtopics.push(subtopic);
    }

    // Add the article if not already present
    if (!subtopic.articles.some((article) => article.key === articleKey)) {
      subtopic.articles.push({
        key: articleKey,
        title: this.articleTitles[articlePath].formattedTitle,
        path: `/konular/${topicKey}/${subtopicKey}/${articleKey}`,
      });
    }
  }

  public static generateTitles(articleFullPath: string): boolean {
    const formattedPath: string = PrepublishUtils.parseFullArticlePath(articleFullPath);
    const pathParts = formattedPath.split("/");
    const [prefix, topicKey, subtopicKey, articleKey] = pathParts;

    const topicPath: string = prefix + "/" + topicKey;
    const subtopicPath: string = topicPath + "/" + subtopicKey;
    const articlePath: string = subtopicPath + "/" + articleKey;

    if (!this.articleTitles[topicPath] || this.articleTitles[topicPath].formattedTitle === "") {
      this.articleTitles[topicPath] = { originalTitle: topicKey, formattedTitle: topicKey };
      return false;
    }
    if (!this.articleTitles[subtopicPath] || this.articleTitles[subtopicPath].formattedTitle === "") {
      this.articleTitles[subtopicPath] = { originalTitle: subtopicKey, formattedTitle: subtopicKey };
      return false;
    }
    if (!this.articleTitles[articlePath] || this.articleTitles[articlePath].formattedTitle === "") {
      this.articleTitles[articlePath] = { originalTitle: articleKey, formattedTitle: articleKey };
      return false;
    }
    return true;
  }

  public static async loadExistingArticleTitles(): Promise<void> {
    // Reset the article titles just in case
    this.articleTitles = {};

    // Try to read and parse existing article titles
    try {
      const { articleTitles } = await import("@/content/generated/article-titles");

      // Add existing article titles to the article titles object to make sure we are not
      // overriding unnecessarily
      this.articleTitles = articleTitles;
    } catch (error) {
      console.error("Failed to load existing article titles: " + error);
    }
  }

  public static addSubheader(articleFullPath: string): void {
    const formattedPath: string = PrepublishUtils.parseFullArticlePath(articleFullPath);
    const pathParts = formattedPath.split("/");
    const [prefix, topicKey, subtopicKey, articleKey] = pathParts;

    const topicPath: string = prefix + "/" + topicKey;
    const subtopicPath: string = topicPath + "/" + subtopicKey;
    const articlePath: string = subtopicPath + "/" + articleKey;

    // Read the file contents as string
    const fileContent: string = fs.readFileSync(articleFullPath, "utf8");
    const headerMatch: RegExpExecArray | null = Regex.H1_HEADING_MATCH_REGEX.exec(fileContent);

    if (!headerMatch) {
      console.log(`-------

Skipping: ${formattedPath}

Skipped process: Adding subheader component
Skip reason: Does not have a main title
`);
      return;
    }

    const extractedTitle: string = headerMatch[1];
    const contentWithoutTitle: string = fileContent.replace(Regex.H1_HEADING_REPLACE_REGEX, "");

    if (contentWithoutTitle.includes("<ContentSubheader")) {
      console.log(`-------

Skipping: ${formattedPath}

Skipped process: Adding subheader component
Skip reason: Already have a subheader
`);
      return;
    }

    const updatedFileContent: string =
      `# ${extractedTitle}

import ContentSubheader from "@/components/content-partials/content-subheader";

<ContentSubheader
  breadcrumbs={["${this.articleTitles[topicPath].formattedTitle}", "${this.articleTitles[subtopicPath].formattedTitle}", "${this.articleTitles[articlePath].formattedTitle}"]}
  pagePath="${formattedPath}"
/>
` + contentWithoutTitle;

    // Save the update file contents
    fs.writeFileSync(articleFullPath, updatedFileContent, "utf8");
  }

  public static saveArticleSet(outputFileName: string): void {
    // Save the generated article lookup set to the output set file
    const setFileContent: string = `// This file is auto-generated
export const articleSet: Set<string> = new Set(${JSON.stringify([...this.articleSet], null, 2)});\n`;

    fs.writeFileSync(path.join(Workflow.outputDirectory, outputFileName), setFileContent, "utf8");
  }

  public static saveArticleNav(outputFileName: string): void {
    // Prevent sorting during JSON.stringify by adding a replacer function that does not alter the order
    const navFileContent: string = `// This file is auto-generated
import { Globals } from "@/types/globals";

export const articleNav: Globals.Data.ArticleNavProps[] = ${JSON.stringify(
      this.articleNav,
      (key, value) => {
        if (key === "") return value;
        return value;
      },
      2,
    )};\n`;

    fs.writeFileSync(path.join(Workflow.outputDirectory, outputFileName), navFileContent, "utf8");
  }

  public static saveArticleTitles(outputFileName: string): void {
    const navFileContent: string = `// This file is auto-generated
import { Globals } from "@/types/globals";

export const articleTitles: Globals.Data.ArticleTitleProps = ${JSON.stringify(this.articleTitles, null, 2)};\n`;

    fs.writeFileSync(path.join(Workflow.outputDirectory, outputFileName), navFileContent, "utf8");
  }
}

export default ArticleProcessor;
