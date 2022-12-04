const linebreak = `\n`;
const space = ` `;

type RangeStart = number;
type RangeEnd = number;
type Range = [RangeStart, RangeEnd];
type ElfPair = [Range, Range];
export async function getInput(): Promise<ElfPair[]> {
  const textInput = await Deno.readTextFile("./day4/src/input.txt");
  return textInput
    .split(linebreak)
    .map((singleRow: any) =>
      singleRow
        .split(",")
        .map((item: any) =>
          item.split("-").map((val: any) => parseInt(val, 10))
        )
    );
}

export function sumArray(values: number[]) {
  return values.reduce((acc, val) => acc + val, 0);
}
