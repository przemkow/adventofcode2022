// Solution here
import { getInput } from "./utils.ts";

const decryptionKey = 811589153;

export async function part2() {
  const input = await getInput();
  let nodes = input
    .map((val) => val * decryptionKey)
    .map((num) => ({
      value: num,
    }));
  const mixArray = [...nodes];

  //Iterate 10 times
  for (let _ of Array.from({ length: 10 })) {
    for (let nodeToMove of nodes) {
      let nodeIdx = mixArray.findIndex((node) => node === nodeToMove);

      // Skip redundant - full circle - iteration
      const moveBy = Math.abs(nodeToMove.value % (mixArray.length - 1));
      if (nodeToMove.value > 0) {
        // Moving right
        for (let i = 0; i < moveBy; i++) {
          //SWAP
          if (nodeIdx === mixArray.length - 1) {
            const node = mixArray.pop()!;
            const first = mixArray.shift()!;
            mixArray.unshift(node);
            mixArray.push(first);

            nodeIdx = 0;
          } else {
            const nextIdx = nodeIdx + 1;
            const node = mixArray[nodeIdx];
            const next = mixArray[nextIdx];
            mixArray[nextIdx] = node;
            mixArray[nodeIdx] = next;
            nodeIdx = nextIdx;
          }
        }
      } else {
        // Moving left
        for (let i = 0; i < moveBy; i++) {
          if (nodeIdx === 0) {
            const node = mixArray.shift()!;
            mixArray.push(node);
            nodeIdx = mixArray.length - 1;
            i--;
          } else {
            const prevIdx = nodeIdx - 1;
            const node = mixArray[nodeIdx];
            const prev = mixArray[prevIdx];
            mixArray[prevIdx] = node;
            mixArray[nodeIdx] = prev;
            nodeIdx = prevIdx;
          }
        }
      }
    }
  }

  const values = mixArray.map((item) => item.value);
  const zeroIdx = values.findIndex((val) => val === 0);
  const id1 = (zeroIdx + 1000) % values.length;
  const id2 = (zeroIdx + 2000) % values.length;
  const id3 = (zeroIdx + 3000) % values.length;

  console.log("Part 2", values[id1] + values[id2] + values[id3]);
}
