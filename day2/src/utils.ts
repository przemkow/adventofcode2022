const linebreak = `\n`;

const space = ` `;
type Col1 = "A" | "B" | "C";
type Col2 = "X" | "Y" | "Z";
type Game = [Col1, Col2];

export async function getInput(): Promise<Game[]> {
  const textInput = await Deno.readTextFile("./day2/src/input.txt");
  return textInput
    .split(linebreak)
    .map((singleRow) => singleRow.split(space)) as Game[];
}
