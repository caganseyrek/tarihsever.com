import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { coreMetadata } from "@/content/data/site-metadata";

const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

const slugify = (text: string): string =>
  text
    .replace(/[/()'",.;]/g, "")
    .replaceAll(" ", "-")
    .toLowerCase();

const absoluteLink = (pathname?: string): string =>
  pathname ? coreMetadata.base_url + pathname : coreMetadata.base_url;

export { cn, slugify, absoluteLink };
