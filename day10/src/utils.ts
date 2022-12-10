export const linebreak = `\n`;
const space = ` `;

type Command = {
  type: "addx";
  value: number;
} | {
  type: "noop";
};

export async function loadCommands(): Promise<Command[]> {
  return (await Deno.readTextFile("./day10/input/cycles.txt")).split(
    linebreak,
  ).map((row) => {
    const splitRow = row.split(space);

    if (splitRow[0] === "noop") {
      return {
        type: "noop",
      };
    } else {
      return {
        type: "addx",
        value: parseInt(splitRow[1], 10),
      };
    }
  });
}

export function sumArray(values: number[]) {
  return values.reduce((acc, val) => acc + val, 0);
}
