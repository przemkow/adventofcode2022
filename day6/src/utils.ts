export async function loadState() {
  const textInput = await Deno.readTextFile("./day6/src/input/state.txt");

  return textInput;
}

export function sumArray(values: number[]) {
  return values.reduce((acc, val) => acc + val, 0);
}
