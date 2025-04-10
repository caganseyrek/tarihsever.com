import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const slugify = (text: string): string =>
  text
    .replace(/[/()'",.;]/g, "")
    .replaceAll(" ", "-")
    .toLowerCase();

export { cn, slugify };
