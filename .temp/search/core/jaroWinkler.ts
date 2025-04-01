// /**
//  * @see https://www.geeksforgeeks.org/jaro-and-jaro-winkler-similarity/
//  */
// import JaroDistance from "./jaroDistance.js";

// class JaroWinkler {
//   public static calculate(str1: string, str2: string): number {
//     let jaroDistance: number = JaroDistance.calculate(str1, str2);

//     if (jaroDistance > 0.7) {
//       let prefix: number = 0;
//       for (let i: number = 0; i < Math.min(str1.length, str2.length); i++) {
//         if (str1[i] === str2[i]) {
//           prefix++;
//         } else break;
//       }
//       prefix = Math.min(4, prefix);
//       jaroDistance += 0.1 * prefix * (1 - jaroDistance);
//     }
//     return jaroDistance;
//   }
// }

// export default JaroWinkler;
