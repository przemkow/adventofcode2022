// Utils here
export async function getInput() {
  return (await Deno.readTextFile("./day20/input/input.txt")).split("\n").map(
    (n) => parseInt(n, 10),
  );
}
