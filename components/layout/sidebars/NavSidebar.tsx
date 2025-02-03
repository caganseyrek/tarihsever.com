import React from "react";

import { Sidebar, SidebarContent, SidebarHeader } from "../../base/sidebar";
import ArticlesList from "./ArticlesList";
import SearchDialog from "./SearchDialog";
import TopicSelector from "./TopicSelector";

const NavSidebar = () => {
  return (
    <aside className="w-[16rem]">
      <Sidebar collapsible="none" className="bg-transparent">
        <SidebarHeader className="pt-1">
          <SearchDialog />
          <TopicSelector />
        </SidebarHeader>
        <SidebarContent>
          <ArticlesList />
        </SidebarContent>
      </Sidebar>
    </aside>
  );
};

export default NavSidebar;
