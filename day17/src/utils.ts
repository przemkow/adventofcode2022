// Utils here
export async function getInput() {
  return await (await Deno.readTextFile("./day17/input/input.txt")).split("");
}

export const shapes = [
  ["####"],
  [".#.", "###", ".#."],
  ["###", "..#", "..#"],
  ["#", "#", "#", "#"],
  ["##", "##"],
];
