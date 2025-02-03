"use client";

import React from "react";

import Link from "next/link";

import { ChevronDown } from "lucide-react";

import { topicsMap } from "@/data/staticMaps";

import { Button } from "../../base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../base/dropdown-menu";
import { userSelectionContext } from "../../context/SelectionContext";

const TopicSelector = () => {
  const { userSelection } = React.useContext(userSelectionContext);
  const currentTopicTitle = userSelection.currentTopic ? userSelection.currentTopic.title : "Konu Başlıkları";
  const currentTopicSubtitle = userSelection.currentTopic
    ? userSelection.currentTopic.subtitle
    : "Seçmek için tıklayın";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-auto w-full">
          <div className="flex flex-row items-center justify-between w-[13.5rem] rounded-lg">
            <div className="flex flex-col items-start justify-between w-[12.5rem] rounded-lg">
              <span className="max-w-[12.5rem] truncate text-[0.95rem]" title={currentTopicTitle}>
                {currentTopicTitle}
              </span>
              <span
                className="max-w-[12.5rem] truncate text-[0.85rem] text-muted-foreground"
                title={currentTopicSubtitle}>
                {currentTopicSubtitle}
              </span>
            </div>
            <ChevronDown />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="sr-only">Konu Başlıkları</DropdownMenuLabel>
        <DropdownMenuGroup>
          {topicsMap.map((topic, index) => (
            <React.Fragment key={topic.key}>
              {index === topicsMap.length - 1 && <DropdownMenuSeparator />}
              <DropdownMenuItem>
                <Link href={"/konular/" + topic.key}>
                  <div className="flex flex-col items-start justify-between w-[13.5rem] rounded-lg">
                    <span className="max-w-[13.5rem] truncate text-[0.95rem]" title={topic.title}>
                      {topic.title}
                    </span>
                    <span
                      className="max-w-[13.5rem] truncate text-[0.85rem] text-muted-foreground"
                      title={topic.subtitle}>
                      {topic.subtitle}
                    </span>
                  </div>
                </Link>
              </DropdownMenuItem>
            </React.Fragment>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TopicSelector;
