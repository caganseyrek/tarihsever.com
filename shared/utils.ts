import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const slugify = (text: string): string =>
  text
    .replace(/[/()'",.;]/g, "")
    .replaceAll(" ", "-")
    .toLowerCase();

const regex = {
  HEADING_REGEX: /^(#+)\s+(.*?)$/,
  H1_HEADING_MATCH_REGEX: /^#\s(.+)/,
  H1_HEADING_REPLACE_REGEX: /^#\s.+\n/,
};

export { cn, slugify, regex };
