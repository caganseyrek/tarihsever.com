"use client";

import React from "react";

import { LinkIcon } from "lucide-react";

import { Button } from "../base/button";

const ShareDialog = () => {
  // const [isCopied, setIsCopied] = React.useState<boolean>(false);

  // const pathname: string = usePathname();
  // const redirectCode: string | null = Finder.findShortlinkCode(pathname);
  // const redirectLink: string = redirectCode ? `${baseURL}link?r=${redirectCode}` : baseURL + pathname.replace("/", "");

  // const handleCopy = () => {
  //   if (!redirectLink) return;

  //   setIsCopied(true);
  //   navigator.clipboard.writeText(redirectLink);
  //   setTimeout(() => setIsCopied(false), 3000);
  // };

  return (
    <Button className="w-full">
      <LinkIcon /> Sayfayı Paylaş
    </Button>
  );
  // <Dialog>
  //   <DialogTrigger asChild>
  //   </DialogTrigger>
  //   <DialogContent>
  //     <DialogHeader>
  //       <DialogTitle>Sayfayı Paylaş</DialogTitle>
  //       <DialogDescription>{`Aşağıdaki ${redirectCode ? "kısa " : " "}link ile bu sayfaya ${redirectCode ? "kolayca " : " "}ulaşabilirsiniz.`}</DialogDescription>
  //     </DialogHeader>
  //     <Button className="w-full rounded-sm justify-between" onClick={() => handleCopy()}>
  //       {redirectLink} {isCopied ? <Check /> : <Copy />}
  //     </Button>
  //   </DialogContent>
  // </Dialog>
};

export { ShareDialog };
