const linebreak = `\n`;
const space = ` `;
const cmdChar = "$";

export async function load() {
  const textInput = await Deno.readTextFile("./day8/src/input/trees.txt");

  return textInput.split(linebreak).map((row: string) =>
    row.split("").map((tree) => parseInt(tree, 10))
  );
}

export function sumArray(values: number[]) {
  return values.reduce((acc, val) => acc + val, 0);
}
