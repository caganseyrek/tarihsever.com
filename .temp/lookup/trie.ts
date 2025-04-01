// class TrieNode {
//   children: Map<string, TrieNode>;
//   isEndOfWord: boolean;

//   constructor() {
//     this.children = new Map();
//     this.isEndOfWord = false;
//   }
// }

// class Trie {
//   private root: TrieNode;

//   constructor() {
//     this.root = new TrieNode();
//   }

//   public insert(word: string) {
//     let node = this.root;
//     for (const char of word) {
//       if (!node.children.has(char)) {
//         node.children.set(char, new TrieNode());
//       }
//       node = node.children.get(char)!;
//     }
//     node.isEndOfWord = true;
//   }

//   public findKeysWithPrefix(prefix: string): string[] {
//     let node = this.root;
//     for (const char of prefix) {
//       if (!node.children.has(char)) {
//         return [];
//       }
//       node = node.children.get(char)!;
//     }
//     return this.collectKeys(node, prefix);
//   }

//   private collectKeys(node: TrieNode, prefix: string): string[] {
//     const result: string[] = [];
//     if (node.isEndOfWord) {
//       result.push(prefix);
//     }
//     for (const [char, child] of node.children) {
//       result.push(...this.collectKeys(child, prefix + char));
//     }
//     return result;
//   }
// }

// export default Trie;
