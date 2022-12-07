const linebreak = `\n`;
const space = ` `;
const cmdChar = "$";

type Command = {
  cmd: String;
  arg?: String;
  output: String[];
};
export async function loadState() {
  const textInput = await Deno.readTextFile("./day7/src/input/cmds.txt");
  const formattedInput: Command[] = [];

  textInput
    .split(linebreak)
    .forEach((row) => {
      const isCmd = row[0] === cmdChar;
      if (isCmd) {
        const [_, cmd, arg] = row.split(" ");
        formattedInput.push({
          cmd,
          arg,
          output: [],
        });
      } else {
        formattedInput[formattedInput.length - 1].output.push(row);
      }
    });

  return formattedInput;
}

export function sumArray(values: number[]) {
  return values.reduce((acc, val) => acc + val, 0);
}
