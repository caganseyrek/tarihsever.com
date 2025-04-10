import path from "path";

import { NodeData } from "@/prepublish/shared/node-data";
import { NodeUtils } from "@/prepublish/shared/node-utils";
import { Logger } from "@/prepublish/shared/prepublish-logger";

import { FormattedTitleGenerator } from "@/prepublish/data-processors/generate-formatted-titles";

class ScaffoldPart {
  public static start(): void {
    // Try to load existing titles to prevent unnecessary overrides
    FormattedTitleGenerator.loadExisting();

    // We generate titles first because later, while iterating the dirsToProcess,
    // we use these titles for generating an content tree
    NodeUtils.walkDirectory(path.join(NodeData.contentDirectory, "topics"), (currentArticleFullPath) => {
      FormattedTitleGenerator.processPath(currentArticleFullPath);
    });

    FormattedTitleGenerator.saveTo(NodeData.outputFiles.formattedTitlesOutput);

    Logger.info("Updated titles. You can edit the formatting titles and run 'pnpm prepublish:execute'");
    Logger.info("Formatted titles should NOT be the same as original titles before running 'pnpm prepublish:execute'");
  }
}
ScaffoldPart.start();
