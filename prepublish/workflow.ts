import fs from "fs";
import path from "path";

import { Workflows } from "@/types/globals";

import PrepublishUtils from "@/prepublish/prepublish-utils";
import ArticleNavGenerator from "@/prepublish/tasks/generate-article-nav";
import ArticleSetGenerator from "@/prepublish/tasks/generate-article-set";
import ShortLinkGenerator from "@/prepublish/tasks/generate-shortlinks";
import TOCGenerator from "@/prepublish/tasks/generate-toc";

class Workflow {
  // The root directory containing content files
  public static resourcesDirectory: Readonly<string> = path.join(process.cwd(), "resources");

  // The directory where generated output files are stored
  public static outputDirectory: Readonly<string> = path.join(process.cwd(), "resources", "generated");

  // Filenames for generated output files
  private static outputFiles: Readonly<Workflows.Prepublish.OutputFileProps> = {
    navFileName: "article-nav.ts",
    setFileName: "article-set.ts",
    shortLinkFileName: "shortlinks.ts",
  };

  // List of directories to process, with associated processing options
  private static dirsToProcess: Readonly<Workflows.Prepublish.DirToProcessProps[]> = [
    {
      path: path.join(this.resourcesDirectory, "content"),
      options: {
        addToArticleSet: true,
        addToArticleNav: true,
        generateShortLink: true,
        generateToc: true,
      },
    },
    {
      path: path.join(this.resourcesDirectory, "pages"),
      options: {
        addToArticleSet: false,
        addToArticleNav: false,
        generateShortLink: false,
        generateToc: true,
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

    // Process each directory based on the defined operations
    this.dirsToProcess.forEach((dir) => {
      PrepublishUtils.walkDirectory(dir.path, (currentArticleFullPath) => {
        if (dir.options.addToArticleNav) {
          ArticleNavGenerator.addToNav(currentArticleFullPath);
        }
        if (dir.options.addToArticleSet) {
          ArticleSetGenerator.addPathToSet(currentArticleFullPath);
        }
        if (dir.options.generateShortLink) {
          // Note: We only generate shortlinks for articles because main pages already have shorter links
          ShortLinkGenerator.generate(currentArticleFullPath);
        }
        if (dir.options.generateToc) {
          TOCGenerator.generate(currentArticleFullPath);
        }
      });
    });

    // Save the generated data files
    ArticleNavGenerator.saveArticleNav(this.outputFiles.navFileName);
    ArticleSetGenerator.saveArticleSet(this.outputFiles.setFileName);
    ShortLinkGenerator.saveShortLinks(this.outputFiles.shortLinkFileName);

    // eslint-disable-next-line no-console
    console.log("Prepublish workflow finished");
  }
}
Workflow.start();

export default Workflow;
