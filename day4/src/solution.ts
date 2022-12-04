// TODO coded on ipad. Review everything

import { getInput, sumArray } from "./utils.ts";

const input = await getInput();
//part1
function hasFullOverlap([elf1, elf2]) {
  const [e1Start, e1End] = elf1;
  const [e2Start, e2End] = elf2;

  return (e1Start <= e2Start && e1End >= e2End) ||
    (e2Start <= e1Start && e2End >= e1End);
}

const part1 = input
  .map((item) => hasFullOverlap(item))
  .map((x) => x ? 1 : 0);
console.log(sumArray(part1));

//part2
function hasAnyOverlap([elf1, elf2]) {
  const [e1Start, e1End] = elf1;
  const [e2Start, e2End] = elf2;

  return (e1Start <= e2Start && e2Start <= e1End) ||
    (e2Start <= e1Start && e1Start <= e2End);
}

const part2 = input
  .map((item) => hasAnyOverlap(item))
  .map((x) => x ? 1 : 0);
console.log(sumArray(part2));
