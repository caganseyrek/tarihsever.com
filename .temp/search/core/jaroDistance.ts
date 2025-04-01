// /**
//  * @see https://www.geeksforgeeks.org/jaro-and-jaro-winkler-similarity/
//  */

// class JaroDistance {
//   private constructor() {}

//   public static calculate(str1: string, str2: string): number {
//     if (str1.length === 0 || str2.length === 0) return 0.0;

//     str1 = str1.toLowerCase();
//     str2 = str2.toLowerCase();

//     if (str1 === str2) return 1.0;

//     const len1: number = str1.length;
//     const len2: number = str2.length;

//     const window = Math.floor(Math.max(len1 / len2) / 2) - 1;
//     let match: number = 0;

//     const hash1 = new Array(len1);
//     const hash2 = new Array(len2);

//     for (let i: number = 0; i < len1; i++) {
//       for (let j: number = Math.max(0, i - window); j < Math.min(len2, i + window + 1); j++) {
//         if (str1[i] === str2[j] && hash2[j] === 0) {
//           hash1[i] = 1;
//           hash2[j] = 1;
//           match++;
//           break;
//         }
//       }
//     }
//     if (match === 0) return 0.0;

//     let transpositions: number = 0;
//     let point: number = 0;

//     for (let i: number = 0; i < len1; i++) {
//       if (hash1[i]) {
//         while (hash2[point] === 0) point++;
//         if (str1[i] !== str2[point++]) transpositions++;
//       }
//     }

//     transpositions /= 2;
//     return (match / len1 + match / len2 + (match - transpositions) / match) / 3.0;
//   }
// }

// export default JaroDistance;
