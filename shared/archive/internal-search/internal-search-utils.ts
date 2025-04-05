const tokenize = (text: string): string[] =>
  text
    .toLowerCase()
    .replace(/[^a-zçğıöşü\s]/gi, "")
    .split(/\s+/)
    .filter((word) => word.length > 0);

export { tokenize };
