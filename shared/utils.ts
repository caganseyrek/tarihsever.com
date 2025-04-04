import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const exceptions = new Set([
  "ve",
  "veya",
  "ile",
  "ama",
  "fakat",
  "ancak",
  "çünkü",
  "gibi",
  "de",
  "da",
  "ki",
  "mi",
  "mı",
  "mu",
  "mü",
]);

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const slugify = (text: string): string =>
  text
    .replace(/[/()'",.;]/g, "")
    .replaceAll(" ", "-")
    .toLowerCase();

export const formatForDisplay = (text: string): string =>
  text
    .toLowerCase()
    .split(/(\s+)/)
    .map((word, index) => {
      // Skip formatting whitespaces
      if (word.trim() === "") return word;

      // Capitalize the first word
      if (index === 0 || !exceptions.has(word)) {
        return word[0].toLocaleUpperCase("tr-TR") + word.slice(1);
      }
      // Do not capitalize exceptions
      return word;
    })
    .join("");
