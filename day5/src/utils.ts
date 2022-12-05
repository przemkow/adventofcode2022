const linebreak = `\n`;
const space = ` `;

export async function loadState() {
  const textInput = await Deno.readTextFile("./day5/src/input/state.txt");
  const state = [];
  textInput
    .split(linebreak)
    .reverse()
    .forEach((row: any) => {
      const distance = 4;
      let idx = 1;
      let id = 0;
      while (idx <= row.length) {
        const char = row[idx];
        if (char !== " ") {
          state[id] ??= [];
          state[id].push(char);
        }
        idx += distance;
        id++;
      }
    });

  return state;
}

export async function loadMoves() {
  const textInput = await Deno.readTextFile("./day5/src/input/moves.txt");

  const moves = [];
  return textInput
    .split(linebreak)
    .map((row) => {
      const arr = [];

      row.split(space).map((val, idx) => {
        if (1 === idx) {
          arr.push(parseInt(val, 10));
        }
        if ([3, 5].includes(idx)) {
          arr.push(parseInt(val, 10) - 1);
        }
      });

      return arr;
    });
}

export function sumArray(values: number[]) {
  return values.reduce((acc, val) => acc + val, 0);
}
