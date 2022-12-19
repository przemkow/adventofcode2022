// Utils here
const linebreak = "\n";
export type Board = (boolean | string)[][][];
export async function getInput() {
  let xLength = 0;
  let yLength = 0;
  let zLength = 0;
  const items = (await Deno.readTextFile("./day18/input/input.txt"))
    .split(linebreak)
    .map((r) => r.split(",").map((val) => parseInt(val, 10)));

  items.forEach(([x, y, z]) => {
    xLength = Math.max(xLength, x + 1);
    yLength = Math.max(yLength, y + 1);
    zLength = Math.max(zLength, z + 1);
  });

  const map: Board = Array.from(
    { length: xLength },
    () =>
      Array.from(
        { length: yLength },
        () => Array.from({ length: zLength }, () => false),
      ),
  );

  items.forEach(([x, y, z]) => {
    map[x][y][z] = true;
  });

  return map;
}
