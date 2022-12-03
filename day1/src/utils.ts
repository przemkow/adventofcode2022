const linebreak = `\n`;

const lineBreakWithEmptyRow = `${linebreak}${linebreak}`;

export function tranformStringToArray(text: string) {
  return text
    .split(lineBreakWithEmptyRow)
    .map((singleRow) =>
      singleRow.split(linebreak).map((num: string) => parseInt(num, 10))
    );
}

export function sumArray(values: number[]) {
  return values.reduce((acc, val) => acc + val, 0);
}
