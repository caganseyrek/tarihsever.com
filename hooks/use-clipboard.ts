import React from "react";

interface UseClipboardProps {
  timeout?: number;
}

interface UseClipboardReturnProps {
  copyToClipboard: (value: string) => Promise<void>;
  isCopied: boolean;
}

const useClipboard = ({ timeout = 2500 }: UseClipboardProps = {}): UseClipboardReturnProps => {
  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  const copyToClipboard = async (value: string) => {
    if (value.trim() === "" || typeof window === "undefined") return;

    await navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), timeout);
  };

  return { copyToClipboard, isCopied };
};

export { useClipboard };
