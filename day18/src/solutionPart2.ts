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
  if (board3d?.[x]?.[y]?.[z + 1] !== true) count++;
  if (board3d?.[x]?.[y]?.[z - 1] !== true) count++;

  return count;
}

function countPocketTraps(
  board3d: Board,
  x: number,
  y: number,
  z: number,
) {
  let count = 0;

  if (board3d?.[x + 1]?.[y]?.[z] === false) count++;
  if (board3d?.[x - 1]?.[y]?.[z] === false) count++;
  if (board3d?.[x]?.[y + 1]?.[z] === false) count++;
  if (board3d?.[x]?.[y - 1]?.[z] === false) count++;
  if (board3d?.[x]?.[y]?.[z + 1] === false) count++;
  if (board3d?.[x]?.[y]?.[z - 1] === false) count++;

  return count;
}

function simulateWaterFlow(board3d: Board) {
  function bfs(startX: number, startY: number, startZ: number) {
    const q = [];
    q.push({ x: startX, y: startY, z: startZ });

    while (q.length > 0) {
      const { x, y, z } = q.shift()!;
      if (board3d[x][y][z] === "W") {
        continue;
      }
      board3d[x][y][z] = "W";

      // neighbours
      const neighbours: any[] = [];
      if (board3d?.[x + 1]?.[y]?.[z] === false) {
        neighbours.push({
          x: x + 1,
          y,
          z,
        });
      }
      if (board3d?.[x - 1]?.[y]?.[z] === false) {
        neighbours.push({
          x: x - 1,
          y,
          z,
        });
      }
      if (board3d?.[x]?.[y + 1]?.[z] === false) {
        neighbours.push({
          x,
          y: y + 1,
          z,
        });
      }
      if (board3d?.[x]?.[y - 1]?.[z] === false) {
        neighbours.push({
          x,
          y: y - 1,
          z,
        });
      }
      if (board3d?.[x]?.[y]?.[z + 1] === false) {
        neighbours.push({
          x,
          y,
          z: z + 1,
        });
      }
      if (board3d?.[x]?.[y]?.[z - 1] === false) {
        neighbours.push({
          x,
          y,
          z: z - 1,
        });
      }

      for (const neighbour of neighbours) {
        q.push(neighbour);
      }
    }
  }

  for (let x = 0; x < board3d.length; x++) {
    for (let y = 0; y < board3d[0].length; y++) {
      for (let z = 0; z < board3d[0][0].length; z++) {
        if (
          x === 0 || x === board3d.length - 1 ||
          y === 0 || y === board3d[0].length - 1 ||
          z === 0 || z === board3d[0][0].length - 1
        ) {
          if (board3d[x][y][z] === false) {
            bfs(x, y, z);
          }
        }
      }
    }
  }
}

export async function part2() {
  // Look for edge accessible by water
  const board3d = await getInput();
  simulateWaterFlow(board3d);

  let count = 0;
  for (let x = 0; x < board3d.length; x++) {
    for (let y = 0; y < board3d[0].length; y++) {
      for (let z = 0; z < board3d[0][0].length; z++) {
        if (board3d[x][y][z] === true) {
          count += countEmptySpace(board3d, x, y, z) -
            countPocketTraps(board3d, x, y, z);
        }
      }
    }
  }

  console.log("Part2", count);
}
