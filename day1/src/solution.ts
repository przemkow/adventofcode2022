import { ascend, BinaryHeap } from "../deps.ts";
import { sumArray, tranformStringToArray } from "./utils.ts";

const file = await Deno.readTextFile("./day1/src/input.txt");
const arrayFormatInput = tranformStringToArray(file);
const sumOfCalories = arrayFormatInput.map((calories) => sumArray(calories));

let maxIdx = null;
let tempMax = -1;

sumOfCalories.forEach((value, idx) => {
  if (value > tempMax) {
    maxIdx = idx;
    tempMax = value;
  }
});

/**
 * PART 1
 */
console.log("Elf with highest number of calories:", {
  idx: maxIdx,
  calories: tempMax,
});

/**
 * PART 2
 */
const topK = 3;
const minHeap = new BinaryHeap<number>((a, b) => ascend(a, b));
for (let calories of sumOfCalories) {
  minHeap.push(calories);
  if (minHeap.length > topK) {
    minHeap.pop();
  }
}
console.log();
console.log(`Top ${topK} elves have together:`, sumArray(Array.from(minHeap)));
