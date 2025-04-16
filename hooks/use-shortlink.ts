import { pathToShortlink, shortlinkToPath } from "@/content/data/__generated__/shortlinks";

const useShortlink = (value: string): string | undefined => {
  if (shortlinkToPath[value]) {
    return shortlinkToPath[value];
  }
  if (pathToShortlink[value]) {
    return pathToShortlink[value];
  }
  return undefined;
};

export { useShortlink };
