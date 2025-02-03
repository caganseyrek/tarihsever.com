import { ArticleMapProps, articlesMap } from "@/lib/mapper/generated/articlesMap";

import { navigationMap, NavigationMapProps, TopicMapProps, topicsMap } from "@/data/staticMaps";

import { shortlinksMap } from "../mapper/generated/shortlinksMap";
import Trie from "./trie";

interface LookupObjectProps {
  pages: Map<string, NavigationMapProps>;
  topics: Map<string, TopicMapProps>;
  article: {
    default: Map<string, ArticleMapProps>;
    withTopic: Map<string, ArticleMapProps>;
    all: {
      byTopic: Map<string, ArticleMapProps>;
      byTopicTrie: Trie;
    };
  };
  shortlink: {
    default: Map<string, string>;
    reverse: Map<string, string>;
  };
}

const lookup: LookupObjectProps = {
  pages: new Map(navigationMap.map((page) => [page.key, page])),
  topics: new Map(topicsMap.map((topic) => [topic.key, topic])),
  article: {
    default: new Map(articlesMap.map((article) => [article.key, article])),
    withTopic: new Map(articlesMap.map((article) => [`${article.topic}&${article.key}`, article])),
    all: {
      byTopic: new Map<string, ArticleMapProps>(),
      byTopicTrie: new Trie(),
    },
  },
  shortlink: {
    default: new Map(shortlinksMap.map((shortlink) => [shortlink.code, shortlink.redirectTo])),
    reverse: new Map(shortlinksMap.map((shortlink) => [shortlink.redirectTo, shortlink.code])),
  },
};

articlesMap.forEach((article) => {
  const fullKey: string = `${article.topic}&${article.key}`;
  lookup.article.all.byTopic.set(fullKey, article);
  lookup.article.all.byTopicTrie.insert(fullKey);
});

class Finder {
  private constructor() {}

  public static findPage(pageKey: string): NavigationMapProps | null {
    return lookup.pages.get(pageKey) ?? null;
  }

  public static findTopic(topicKey: string): TopicMapProps | null {
    return lookup.topics.get(topicKey) ?? null;
  }

  public static findArticle(articleKey: string): ArticleMapProps | null {
    return lookup.article.default.get(articleKey) ?? null;
  }

  public static findArticleByTopic(topicKey: string, articleKey: string): ArticleMapProps | null {
    return lookup.article.withTopic.get(`${topicKey}&${articleKey}`) ?? null;
  }

  public static findAllArticlesByTopic(topicKey: string): ArticleMapProps[] {
    const matchingKeys = lookup.article.all.byTopicTrie.findKeysWithPrefix(`${topicKey}&`);
    return matchingKeys.map((key) => lookup.article.all.byTopic.get(key)!);
  }

  public static findRedirectLink(code: string): string | null {
    return lookup.shortlink.default.get(code) ?? null;
  }

  public static findShortlinkCode(path: string): string | null {
    return lookup.shortlink.reverse.get(path) ?? null;
  }

  public static getDefaultTopic(): TopicMapProps {
    return topicsMap[0];
  }
}

export default Finder;
