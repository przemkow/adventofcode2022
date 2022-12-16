import { solutionPart1 } from "./solutionPart1.ts";
import { solutionPart2 } from "./solutionPart2.ts";

console.log("Solving part 1 ~400ms needed");
console.time("Part1");
solutionPart1();
console.timeEnd("Part1");

console.log("Solving part 1 ~10s needed");
console.time("Part2");
solutionPart2();
console.timeEnd("Part2");
