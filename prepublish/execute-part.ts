import fs from "fs";

import { formattedTitles } from "@/contents/__generated__/formatted-titles";

import { NodeData } from "@/prepublish/shared/node-data";
import { NodeUtils } from "@/prepublish/shared/node-utils";
import { Logger } from "@/prepublish/shared/prepublish-logger";

import { TableOfContentsBuilder } from "@/prepublish/article-processors/build-table-of-contents";
import { SubheaderInjector } from "@/prepublish/article-processors/inject-subheader";

import { ArticleLookupBuilder } from "@/prepublish/data-processors/build-article-lookup";
import { ContentTreeBuilder } from "@/prepublish/data-processors/build-content-tree";
import { FormattedTitleGenerator } from "@/prepublish/data-processors/generate-formatted-titles";
import { ShortlinksGenerator } from "@/prepublish/data-processors/generate-shortlinks";

class ExecutePart {
  private static isPassedScaffold(): void {
    let isPassed: boolean = true;
    for (const key in formattedTitles) {
      // eslint-disable-next-line no-prototype-builtins
      if (formattedTitles.hasOwnProperty(key)) {
        const { originalTitle, formattedTitle } = formattedTitles[key];
        if (originalTitle === formattedTitle) {
          isPassed = false;
        }
      }
    }
    if (!isPassed) {
      Logger.warning(`  > 'originalTitle' and 'formattedTitle' should not be same for a given article in 'titles.ts' file.
  > Please update the new articles' titles before running this command.`);
      process.exit(1);
    }
    Logger.info("Successfully validated scaffolded titles. Continuing...");
  }

  public static start(): void {
    this.isPassedScaffold();

    if (!fs.existsSync(NodeData.outputDirectory)) {
      fs.mkdirSync(NodeData.outputDirectory, { recursive: true });
      Logger.info("Generated a new output directory.");
    }
    // First we load the titles we prepared in the scaffold part
    FormattedTitleGenerator.loadExisting();

    // Then we load the existing data we will process
    ArticleLookupBuilder.loadExisting();
    ContentTreeBuilder.loadExisting();
    ShortlinksGenerator.loadExisting();

    // Process each directory based on the defined operations
    NodeData.dirsToProcess.forEach((dir) => {
      NodeUtils.walkDirectory(dir.path, (currentArticleFullPath) => {
        if (dir.options.addToArticleLookup) {
          ArticleLookupBuilder.processPath(currentArticleFullPath);
        }
        if (dir.options.addToContentTree) {
          ContentTreeBuilder.processPath(currentArticleFullPath);
        }
        if (dir.options.generateShortlink) {
          ShortlinksGenerator.processPath(currentArticleFullPath);
        }
        if (dir.options.generateTableOfContents) {
          TableOfContentsBuilder.processPath(currentArticleFullPath);
        }
        if (dir.options.injectSubheader) {
          SubheaderInjector.processPath(currentArticleFullPath);
        }
      });
    });

    // Save the generated data files
    ArticleLookupBuilder.saveTo(NodeData.outputFiles.articleLookupOutput);
    ContentTreeBuilder.saveTo(NodeData.outputFiles.contentTreeOutput);
    ShortlinksGenerator.saveTo(NodeData.outputFiles.shortlinkOutput);

    Logger.info("Execute part of prepublish completed. Now you can deploy the site.");
  }
}
ExecutePart.start();
