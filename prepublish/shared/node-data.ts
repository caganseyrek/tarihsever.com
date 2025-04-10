import path from "path";

import type { Workflows } from "@/types/globals";

class NodeData {
  // The root directory containing content files
  public static readonly contentDirectory: string = path.join(process.cwd(), "contents");

  // The directory where generated output files are stored
  public static readonly outputDirectory: string = path.join(process.cwd(), "contents", "__generated__");

  // Filenames for generated output files
  public static readonly outputFiles: Workflows.Prepublish.OutputFileProps = {
    articleLookupOutput: "article-lookup.ts",
    contentTreeOutput: "content-tree.ts",
    formattedTitlesOutput: "formatted-titles.ts",
    shortlinkOutput: "shortlinks.ts",
  };

  // List of directories to process, with associated processing options
  public static readonly dirsToProcess: Workflows.Prepublish.DirToProcessProps[] = [
    {
      path: path.join(this.contentDirectory, "topics"),
      options: {
        addToArticleLookup: true,
        addToContentTree: true,
        generateShortlink: true,
        generateTableOfContents: true,
        injectSubheader: true,
      },
    },
    {
      path: path.join(this.contentDirectory, "pages"),
      options: {
        addToArticleLookup: false,
        addToContentTree: false,
        generateShortlink: false,
        generateTableOfContents: true,
        injectSubheader: false,
      },
    },
  ];
}

export { NodeData };
