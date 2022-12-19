// Solution here
import { Board, getInput } from "./utils.ts";

function countEmptySpace(
  board3d: Board,
  x: number,
  y: number,
  z: number,
) {
  let count = 0;

  if (board3d?.[x + 1]?.[y]?.[z] !== true) count++;
  if (board3d?.[x - 1]?.[y]?.[z] !== true) count++;
  if (board3d?.[x]?.[y + 1]?.[z] !== true) count++;
  if (board3d?.[x]?.[y - 1]?.[z] !== true) count++;
  if (board3d?.[x]?.[y]?.[z - 1] !== true) count++;
  if (board3d?.[x]?.[y]?.[z + 1] !== true) count++;

  return count;
}

export async function part1() {
  let count = 0;

  const board3d = await getInput();
  for (let x = 0; x < board3d.length; x++) {
    for (let y = 0; y < board3d[0].length; y++) {
      for (let z = 0; z < board3d[0][0].length; z++) {
        if (board3d[x][y][z] === true) {
          count += countEmptySpace(board3d, x, y, z);
        }
      }
    }
  }

  console.log("Part1", count);
}
