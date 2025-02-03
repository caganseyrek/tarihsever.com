export default function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-zçğıöşü\s]/gi, "")
    .split(/\s+/)
    .filter((word) => word.length > 0);
}
