import { contentTreeLookup } from "@/content/data/__generated__/content-tree";

import type { HeadingNodeProps } from "@/types/globals";

type UseLoadPageProps = string[] | "sozluk" | "site-rehberi";

type UseLoadPageReturnProps =
  | {
      notFound: false;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content: any;
      toc: HeadingNodeProps[];
    }
  | {
      notFound: true;
      content?: undefined;
      toc?: undefined;
    };

async function useLoadPage(path: "sozluk" | "site-rehberi"): Promise<{
  notFound: false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  toc: HeadingNodeProps[];
}>;
async function useLoadPage(path: string[]): Promise<UseLoadPageReturnProps>;

async function useLoadPage(path: UseLoadPageProps): Promise<UseLoadPageReturnProps> {
  if (typeof path === "string") {
    const [{ default: sozlukContent }, { toc: articleToc }] = await Promise.all([
      import(`@/content/${path}.mdx`),
      import(`@/content/${path}.toc`),
    ]);
    return {
      content: sozlukContent,
      toc: articleToc as HeadingNodeProps[],
      notFound: false,
    };
  }

  if (!contentTreeLookup.has(path.join("/"))) {
    return { notFound: true };
  }
  const filePath: string = path.slice(1).join("/");

  const [{ default: articleContent }, { toc: articleToc }] = await Promise.all([
    import(`@/content/topics/${filePath}.mdx`),
    import(`@/content/topics/${filePath}.toc.ts`),
  ]);

  return {
    content: articleContent,
    toc: articleToc as HeadingNodeProps[],
    notFound: false,
  };
}

export { useLoadPage };
