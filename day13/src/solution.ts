// Solution here
import { getInput, Packet } from "./utils.ts";

const input = await getInput();

const divider1 = [[2]];
const divider2 = [[6]];

//Part1;
function comparePackets(left: Packet, right: Packet): number {
  /**
  If both values are integers, the lower integer should come first.
  If the left integer is lower than the right integer, the inputs are in the right order.
  If the left integer is higher than the right integer, the inputs are not in the right order.
  Otherwise, the inputs are the same integer; continue checking the next part of the input.
  */
  if (typeof left === "number" && typeof right === "number") {
    if (left < right) {
      return 1;
    } else if (left > right) {
      return -1;
    } else {
      return 0;
    }

    /**
     * If both values are lists, compare the first value of each list, then the second value,
     * and so on. If the left list runs out of items first, the inputs are in the right order.
     * If the right list runs out of items first, the inputs are not in the right order.
     * If the lists are the same length and no comparison makes a decision about the order,
     * continue checking the next part of the input.
     */
  } else if (Array.isArray(left) && Array.isArray(right)) {
    let leftIdx = 0;
    let rightIdx = 0;

    while ((leftIdx < left.length) && (rightIdx < right.length)) {
      const status = comparePackets(left[leftIdx], right[rightIdx]);
      if (status !== 0) {
        return status;
      }
      leftIdx++;
      rightIdx++;
    }

    const leftHasItems = leftIdx < left.length;
    const rightHasItems = rightIdx < right.length;

    if (!leftHasItems && rightHasItems) {
      return 1;
    } else if (leftHasItems && !rightHasItems) {
      return -1;
    } else {
      return 0;
    }
  } else {
    if (typeof left === "number") {
      return comparePackets([left], right);
    } else if (typeof right === "number") {
      return comparePackets(left, [right]);
    }
  }

  return 0;
}
let sumOfIndices = 0;
input.forEach(([left, right], idx) => {
  const compareResult = comparePackets(left, right);
  if (compareResult === 1) {
    sumOfIndices += idx + 1;
  }
});

console.log(
  "Part1. The sum of the indices of those pairs in right order is",
  sumOfIndices,
);

//Part2;
let part2Input: Packet[] = [];
part2Input.push(divider1);
part2Input.push(divider2);
input.forEach((pair) => {
  part2Input.push(pair[0]);
  part2Input.push(pair[1]);
});

part2Input.sort((a, b) => comparePackets(b, a));

let decoderKey = 1;
part2Input.map((row) => JSON.stringify(row)).forEach((row, idx) => {
  if (["[[2]]", "[[6]]"].includes(row)) {
    decoderKey *= idx + 1;
  }
});

console.log("Part2. The decoded key for the distress signal:", decoderKey);
