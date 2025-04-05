import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const slugify = (text: string): string =>
  text
    .replace(/[/()'",.;]/g, "")
    .replaceAll(" ", "-")
    .toLowerCase();
