import fs from "fs";

import { NodeUtils } from "@/prepublish/shared/node-utils";

import { FormattedTitleGenerator } from "@/prepublish/data-processors/generate-formatted-titles";

class SubheaderInjector {
  public static processPath(articleFullPath: string): void {
    const formattedPath: string = NodeUtils.parseFullArticlePath(articleFullPath);
    const pathParts = formattedPath.split("/");
    const [prefix, topicKey, subtopicKey, articleKey] = pathParts;

    const topicPath: string = prefix + "/" + topicKey;
    const subtopicPath: string = topicPath + "/" + subtopicKey;
    const articlePath: string = subtopicPath + "/" + articleKey;

    // Read the file contents as string
    const fileContent: string = fs.readFileSync(articleFullPath, "utf8");
    const headerMatch: RegExpExecArray | null = NodeUtils.H1_HEADING_MATCH_REGEX.exec(fileContent);

    if (!headerMatch) return;

    const extractedTitle: string = headerMatch[1];
    const contentWithoutTitle: string = fileContent.replace(NodeUtils.H1_HEADING_REPLACE_REGEX, "");

    if (contentWithoutTitle.includes("<ContentSubheader")) return;

    const updatedFileContent: string =
      `# ${extractedTitle}

import ContentSubheader from "@/components/mdx-partials/content-subheader";

<ContentSubheader
  breadcrumbs={["${FormattedTitleGenerator.formattedTitles[topicPath].formattedTitle}", "${FormattedTitleGenerator.formattedTitles[subtopicPath].formattedTitle}", "${FormattedTitleGenerator.formattedTitles[articlePath].formattedTitle}"]}
  pagePath="${formattedPath}"
/>
` + contentWithoutTitle;

    // Save the update file contents
    fs.writeFileSync(articleFullPath, updatedFileContent, "utf8");
  }
}

export { SubheaderInjector };
