// Utils here
const linebreak = `\n`;

function fillRow(
  arr: boolean[][],
  start: [number, number],
  end: [number, number],
) {
  let colStart = Math.min(start[0], end[0]);
  let colEnd = Math.max(start[0], end[0]);
  let rowStart = Math.min(start[1], end[1]);
  let rowEnd = Math.max(start[1], end[1]);

  for (let col = colStart; col <= colEnd; col++) {
    for (let row = rowStart; row <= rowEnd; row++) {
      arr[row][col] = true;
    }
  }

  return arr;
}

export async function getInput() {
  const map: boolean[][] = Array.from({ length: 1000 }, () => {
    return Array.from({ length: 1000 }, () => false);
  });

  const rawInput = (await Deno.readTextFile("./day14/input/input.txt"));
  rawInput.split(linebreak).forEach((row) => {
    const directionPairs = row.split("-> ").map((directionPair) => {
      return directionPair.split(",").map((val) => parseInt(val, 10)) as [
        number,
        number,
      ];
    });

    for (let i = 1; i < directionPairs.length; i++) {
      const start: [number, number] = directionPairs[i - 1];
      const end: [number, number] = directionPairs[i];
      fillRow(map, start, end);
    }
  });
  return map;
}
