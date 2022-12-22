// Utils here
const dobuleLinebreak = "\n\n";
const linebreak = "\n";

export async function getInput() {
  const [mapString, pathString]: any =
    (await Deno.readTextFile("./day22/input/input.txt"))
      .split(dobuleLinebreak);

  let temp = "";
  let path: any = [];

  for (let i = 0; i < pathString.length; i++) {
    const letter = pathString[i];
    if (isNaN(letter)) {
      path.push(temp);
      temp = "";
      path.push(letter);
    } else {
      temp += letter;
    }
  }
  path.push(temp);

  path = path.map((item: string) =>
    isNaN(item as any) ? item : parseInt(item, 10)
  );

  let map: string[] = mapString.split(linebreak);
  let maxRowLength = 0;
  map.forEach((element) => {
    maxRowLength = Math.max(maxRowLength, element.length);
  });

  map = map.map((row: string) => row.padEnd(maxRowLength, " "));

  return ({ map, path });
}
