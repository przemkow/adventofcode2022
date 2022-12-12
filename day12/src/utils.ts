// Utils here
export type Node = { row: number; col: number };

const startLocation = "S"; // elevation a
const endLocation = "E"; // elevation z

const heightMap: Record<string, number> = {
  "a": 0,
  "b": 1,
  "c": 2,
  "d": 3,
  "e": 4,
  "f": 5,
  "g": 6,
  "h": 7,
  "i": 8,
  "j": 9,
  "k": 10,
  "l": 11,
  "m": 12,
  "n": 13,
  "o": 14,
  "p": 15,
  "q": 16,
  "r": 17,
  "s": 18,
  "t": 19,
  "u": 20,
  "v": 21,
  "w": 22,
  "x": 23,
  "y": 24,
  "z": 25,
};

const linebreak = `\n`;

// elevation at most 1 higher
// Go from S to E
export async function getInput() {
  let start: Node | undefined;
  let end: Node | undefined;

  const map = (await Deno.readTextFile("./day12/input/input.txt")).split(
    linebreak,
  ).map((row, x) => {
    return row.split("").map((item: string, y) => {
      if (item === startLocation) {
        start = { row: x, col: y };
        return 0;
      }
      if (item === endLocation) {
        end = { row: x, col: y };
        return 25;
      }

      return heightMap[item];
    });
  });

  if (start === undefined || end === undefined) {
    throw "wrong input";
  }

  return {
    start,
    end,
    map,
  };
}
