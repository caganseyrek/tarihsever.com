import React, { ReactNode } from "react";

import Link from "next/link";

import { Button } from "./base/button";

interface LinkedButtonProps {
  button?: {
    variant?: "default" | "ghost" | "menuButton";
    size?: "default" | "icon";
    className?: string;
  };
  link: {
    href: string;
    isExternal?: boolean;
    className?: string;
  };
  children?: ReactNode;
}

const LinkedButton = ({
  button: { variant = "default", size = "default", className: buttonClassName } = {},
  link: { href, isExternal = false, className: linkClassName },
  children,
}: LinkedButtonProps) => {
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : "_self"}
      className={`text-[0.95rem] ${linkClassName ? linkClassName : ""}`}>
      <Button variant={variant} size={size} className={`text-[0.95rem] ${buttonClassName ? buttonClassName : ""}`}>
        {children}
      </Button>
    </Link>
  );
};

export default LinkedButton;
