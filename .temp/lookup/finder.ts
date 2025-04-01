import { navigationLinks } from "@/shared/data/navigationLinks";
import { TopicLinkProps, topicLinks } from "@/shared/data/topicLinks";

import { ArticleLinkProps, articleLinks } from "@/prepublish/generated/articleLinks";
import { shortlinksMap } from "@/prepublish/generated/shortlinks";

import { Globals } from "@/types/globals";

import Trie from "./trie";

interface LookupObjectProps {
  pages: Map<string, Globals.LinkProps>;
  topics: Map<string, TopicLinkProps>;
  article: {
    default: Map<string, ArticleLinkProps>;
    withTopic: Map<string, ArticleLinkProps>;
    all: {
      byTopic: Map<string, ArticleLinkProps>;
      byTopicTrie: Trie;
    };
  };
  shortlink: {
    default: Map<string, string>;
    reverse: Map<string, string>;
  };
}

const lookup: LookupObjectProps = {
  pages: new Map(navigationLinks.map((page) => [page.key, page])),
  topics: new Map(topicLinks.map((topic) => [topic.key, topic])),
  article: {
    default: new Map(articleLinks.map((article) => [article.key, article])),
    withTopic: new Map(articleLinks.map((article) => [`${article.topic}&${article.key}`, article])),
    all: {
      byTopic: new Map<string, ArticleLinkProps>(),
      byTopicTrie: new Trie(),
    },
  },
  shortlink: {
    default: new Map(shortlinksMap.map((shortlink) => [shortlink.code, shortlink.redirectTo])),
    reverse: new Map(shortlinksMap.map((shortlink) => [shortlink.redirectTo, shortlink.code])),
  },
};

articleLinks.forEach((article) => {
  const fullKey: string = `${article.topic}&${article.key}`;
  lookup.article.all.byTopic.set(fullKey, article);
  lookup.article.all.byTopicTrie.insert(fullKey);
});

class Finder {
  private constructor() {}

  public static findPage(pageKey: string): Globals.LinkProps | null {
    return lookup.pages.get(pageKey) ?? null;
  }

  public static findTopic(topicKey: string): TopicLinkProps | null {
    return lookup.topics.get(topicKey) ?? null;
  }

  public static findArticle(articleKey: string): ArticleLinkProps | null {
    return lookup.article.default.get(articleKey) ?? null;
  }

  public static findArticleByTopic(topicKey: string, articleKey: string): ArticleLinkProps | null {
    return lookup.article.withTopic.get(`${topicKey}&${articleKey}`) ?? null;
  }

  public static findAllArticlesByTopic(topicKey: string): ArticleLinkProps[] {
    const matchingKeys = lookup.article.all.byTopicTrie.findKeysWithPrefix(`${topicKey}&`);
    return matchingKeys.map((key) => lookup.article.all.byTopic.get(key)!);
  }

  public static findRedirectLink(code: string): string | null {
    return lookup.shortlink.default.get(code) ?? null;
  }

  public static findShortlinkCode(path: string): string | null {
    return lookup.shortlink.reverse.get(path) ?? null;
  }

  public static getDefaultTopic(): TopicLinkProps {
    return topicLinks[0];
  }
}

export default Finder;
