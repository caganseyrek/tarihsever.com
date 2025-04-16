import fs from "fs";

import { Logger } from "@/prepublish/common/logger";
import { dataDirectory, dirsToProcess, outputFiles } from "@/prepublish/common/node-data";
import { walkDirectory } from "@/prepublish/common/node-utils";

import { ContentTreeBuilder } from "@/prepublish/tasks/build-content-tree";
import { TOCBuilder } from "@/prepublish/tasks/build-toc";
import { ShortlinkGenerator } from "@/prepublish/tasks/generate-shortlink";

class Prepublish {
  public static run() {
    if (!fs.existsSync(dataDirectory)) {
      fs.mkdirSync(dataDirectory, { recursive: true });
      Logger.info("Generated a new output directory.");
    }

    // First we load the existing data we will process
    ShortlinkGenerator.loadExisting();

    // Process each directory based on the defined operations
    dirsToProcess.forEach((dir) => {
      walkDirectory(dir.path, (currentArticleFullPath) => {
        if (dir.options.addToContentTree) {
          ContentTreeBuilder.addToLookup(currentArticleFullPath);
          ContentTreeBuilder.addToContentTree(currentArticleFullPath);
        }
        if (dir.options.generateShortlink) {
          ShortlinkGenerator.generate(currentArticleFullPath);
        }
        if (dir.options.generateTableOfContents) {
          TOCBuilder.build(currentArticleFullPath);
        }
      });
    });

    // Save the generated data files
    ContentTreeBuilder.saveTo(outputFiles.contentTreeOutput);
    ShortlinkGenerator.saveTo(outputFiles.shortlinkOutput);
    Logger.info("Prepublish completed.");
  }
}
Prepublish.run();
