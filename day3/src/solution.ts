// Solution here
import {
  getItemPriorities,
  Letters,
  loadInputForPart1,
  loadInputForPart2,
  sumArray,
} from "./utils.ts";

const data = await loadInputForPart1();

// Part 1
const duplicates = data
  .map(([pocket1, pocket2]) => {
    for (let item of pocket1) {
      if (pocket2.has(item)) {
        return item;
      }
    }

    for (let item of pocket2) {
      if (pocket1.has(item)) {
        return item;
      }
    }
  })
  .map((duplicateLetter) => getItemPriorities(duplicateLetter!));

console.log("sum of the priorities", sumArray(duplicates));

//Part2

const dataPart2 = await loadInputForPart2();

const badgesCost = dataPart2.map(([elf1, elf2, elf3]) => {
  const elf12 = new Set<Letters>();

  for (let item of elf1) {
    if (elf2.has(item)) {
      elf12.add(item);
    }
  }

  for (let item of elf12) {
    if (elf3.has(item)) {
      return item;
    }
  }
})
  .map((badge) => getItemPriorities(badge!));

console.log("sum of all badges", sumArray(badgesCost));
