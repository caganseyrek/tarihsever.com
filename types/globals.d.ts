import React from "react";

export namespace Globals {
  export interface LinkProps {
    key: string;
    title: string;
    path: string;
  }
}

export namespace ComponentTypes {
  export interface BaseWrapperProps {
    children?: React.ReactNode;
    className?: string;
  }
}
