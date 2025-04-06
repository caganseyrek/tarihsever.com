/* eslint-disable no-console */
import fs from "fs";
import path from "path";

import PrepublishUtils from "@/prepublish/prepublish-utils";
import ShortLinkGenerator from "@/prepublish/tasks/generate-shortlinks";
import TitleGenerator from "@/prepublish/tasks/generate-titles";
import TOCGenerator from "@/prepublish/tasks/generate-toc";
import ArticleProcessor from "@/prepublish/tasks/process-articles";

import { Workflows } from "@/types/globals";

class Workflow {
  // The root directory containing content files
  public static readonly contentDirectory: string = path.join(process.cwd(), "contents");

  // The directory where generated output files are stored
  public static readonly outputDirectory: string = path.join(process.cwd(), "contents", "generated");

  // Filenames for generated output files
  private static readonly outputFiles: Workflows.Prepublish.OutputFileProps = {
    articleNavFileName: "article-nav.ts",
    articleSetFileName: "article-set.ts",
    shortLinkFileName: "shortlinks.ts",
    titlesFileName: "titles.ts",
  };

  // List of directories to process, with associated processing options
  private static readonly dirsToProcess: Workflows.Prepublish.DirToProcessProps[] = [
    {
      path: path.join(this.contentDirectory, "topics"),
      options: {
        addToArticleSet: true,
        addToArticleNav: true,
        generateShortLink: true,
        generateToc: true,
        addSubheader: true,
      },
    },
    {
      path: path.join(this.contentDirectory, "pages"),
      options: {
        addToArticleSet: false,
        addToArticleNav: false,
        generateShortLink: false,
        generateToc: true,
        addSubheader: false,
      },
    },
  ];

  /**
   * Starts the prepublish workflow.
   * It processes specified directories, applies the defined operations, and saves the generated data.
   * @async
   */
  public static async start(): Promise<void> {
    if (!fs.existsSync(this.outputDirectory)) {
      fs.mkdirSync(this.outputDirectory, { recursive: true });
    }
    // Try to load existing short links to prevent duplicate generation
    await ShortLinkGenerator.loadExistingShortLinks();

    // Try to load existing titles to prevent unnecessary overrides
    await TitleGenerator.loadExistingTitles();

    let passedTitleGeneration: boolean = true;
    // We generate titles first because later, while iterating the dirsToProcess,
    // we use these titles for generating an article-nav
    PrepublishUtils.walkDirectory(path.join(this.contentDirectory, "topics"), (currentArticleFullPath) => {
      const generationResult: boolean = TitleGenerator.generate(currentArticleFullPath);
      TitleGenerator.saveTitles(this.outputFiles.titlesFileName);

      if (generationResult === false && passedTitleGeneration === true) {
        passedTitleGeneration = false;
      }
    });

    if (!passedTitleGeneration) {
      console.log(`-------

WARNING

> New articles are added to the article-titles.ts located in 'content/generated/article-titles.ts'
> Please add localized versions to these titles. These titles are used in the sidebar.

After that, you can re-run 'pnpm prepublish'

-------`);
      process.exit(1);
    }

    // Process each directory based on the defined operations
    this.dirsToProcess.forEach((dir) => {
      PrepublishUtils.walkDirectory(dir.path, (currentArticleFullPath) => {
        if (dir.options.addToArticleNav) {
          ArticleProcessor.addToNav(currentArticleFullPath);
        }
        if (dir.options.addToArticleSet) {
          ArticleProcessor.addPathToSet(currentArticleFullPath);
        }
        if (dir.options.addSubheader) {
          ArticleProcessor.addSubheader(currentArticleFullPath);
        }
        if (dir.options.generateShortLink) {
          // Note: We only generate shortlinks for articles because main pages literally have shorter links
          ShortLinkGenerator.generate(currentArticleFullPath);
        }
        if (dir.options.generateToc) {
          TOCGenerator.generate(currentArticleFullPath);
        }
      });
    });

    // Save the generated data files
    TitleGenerator.saveTitles(this.outputFiles.titlesFileName);
    ArticleProcessor.saveArticleNav(this.outputFiles.articleNavFileName);
    ArticleProcessor.saveArticleSet(this.outputFiles.articleSetFileName);
    ShortLinkGenerator.saveShortLinks(this.outputFiles.shortLinkFileName);

    console.log("Prepublish workflow finished");
  }
}
Workflow.start();

export default Workflow;
