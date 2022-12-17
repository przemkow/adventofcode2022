// Solution here
import { getInput } from "./utils.ts";

const input = await getInput();
const searchLine = 2000000;

const beaconsInLine = new Set();

for (let i = 0; i < input.length; i++) {
  const item = input[i];
  if (item.beacon.y === searchLine) {
    const key = `${item.beacon.x}__${item.beacon.y}`;
    beaconsInLine.add(key);
  }
}

const beaconsInLineCount = beaconsInLine.size;

// Part1
function getRangeFor(row: number) {
  const ranges = input.map((item) => {
    const distanceToLine = Math.abs(item.position.y - row);
    if (distanceToLine <= item.distance) {
      // if distance item.distance - distanceToLine is 1 it means that on both sides of signal there will be 2 items
      // 010
      // if 3 - 01210
      const itemsOnSides = item.distance - distanceToLine;
      return {
        start: item.position.x - itemsOnSides,
        end: item.position.x + itemsOnSides,
      };
    }
  }).filter((row) => row)
    .sort((a, b) => a!.start - b!.start);

  const normalizedRange = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    const rangeA = normalizedRange[normalizedRange.length - 1]!;
    const rangeB = ranges[i]!;

    if (rangeB.start <= rangeA.end) {
      rangeA.end = Math.max(rangeA.end, rangeB.end);
    } else {
      normalizedRange.push(rangeB);
    }
  }

  return normalizedRange;
}

const normalizedRange = getRangeFor(searchLine);
const countsOfPlacesWhereSignalArrives = normalizedRange.map((range) =>
  range!.end - range!.start + 1
).reduce((acc, val) => acc + val, 0);
console.log("Part1:", countsOfPlacesWhereSignalArrives - beaconsInLineCount);

// Part 2
function calculateSignalTuningFrequency(x: number, y: number) {
  return (x * 4000000) + y;
}

const allRanges = [];
for (let y = 0; y <= 4000000; y++) {
  allRanges.push({
    y,
    ranges: getRangeFor(y),
  });
}

const rangeWithMissingSignal: any = allRanges
  .find((range) => range.ranges.length >= 2)!;

const x = rangeWithMissingSignal.ranges[0].end + 1;
const turningFrequency = calculateSignalTuningFrequency(
  x,
  rangeWithMissingSignal.y,
);
console.log("Part2:", turningFrequency);
