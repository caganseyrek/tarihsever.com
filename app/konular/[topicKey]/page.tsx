import React from "react";

import { Metadata } from "next";

import MarkdownPageLayout from "@/components/layout/MarkdownPageLayout";

import Finder from "@/lib/lookup/finder";

import { TopicMapProps } from "@/data/static/topicsMap";

interface KonuBasligiProps {
  params: Promise<{ topicKey: string }>;
}

export async function generateMetadata({ params }: KonuBasligiProps): Promise<Metadata> {
  const awaitedTopicKey = (await params).topicKey;
  const topic: TopicMapProps | null = Finder.findTopic(awaitedTopicKey);
  if (!topic) {
    return { title: "Sayfa bulunamadı" };
  }
  return { title: topic.title };
}

const TopicPage = async ({ params }: KonuBasligiProps) => {
  const awaitedTopicKey: string = (await params).topicKey;

  return (
    <MarkdownPageLayout
      loadedPageKey={null}
      loadedTopicKey={awaitedTopicKey}
      loadedArticleKey={null}></MarkdownPageLayout>
  );
};

export default TopicPage;
