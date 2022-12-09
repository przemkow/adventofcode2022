const linebreak = `\n`;
const space = ` `;
const cmdChar = "$";

export async function loadSteps() {
  return await (await Deno.readTextFile("./day9/input/steps.txt")).split(
    linebreak,
  ).flatMap((row) => {
    let rowItems = row.split(" ");

    const letter = rowItems[0];
    const count = parseInt(rowItems[1], 10);
    let temp = [];
    for (let i = 0; i < count; i++) {
      temp.push(letter);
    }

    return temp;
  });
}

export function sumArray(values: number[]) {
  return values.reduce((acc, val) => acc + val, 0);
}
