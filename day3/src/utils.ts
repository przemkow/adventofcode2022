// Utils here

export type Letters =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

export async function loadInputForPart1() {
  const lineBreak = "\n";
  const textInput = await Deno.readTextFile("./day3/src/input.txt");
  return textInput.split(lineBreak).map((items) => {
    const compartmentSize = items.length / 2;
    const rucksack = [new Set<Letters>(), new Set<Letters>()];

    for (let i = 0; i < items.length; i++) {
      if (i < compartmentSize) {
        rucksack[0].add(items[i] as any);
      } else {
        rucksack[1].add(items[i] as any);
      }
    }

    return rucksack;
  });
}

export async function loadInputForPart2() {
  const lineBreak = "\n";
  const textInput = await Deno.readTextFile("./day3/src/input.txt");
  const elfs = textInput.split(lineBreak);
  let elfGroups: Set<Letters>[][] = [];

  for (let i = 0; i < elfs.length; i++) {
    const elfItems: Letters[] = elfs[i].split("") as Letters[];
    const groupIdx = Math.floor(i / 3);
    elfGroups[groupIdx] ??= [];
    elfGroups[groupIdx].push(new Set(elfItems));
  }
  return elfGroups;
}

// Prepare alphabet map
let alphabetMap: Record<string, number> = {};
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
alphabet.forEach((letter, idx) => {
  alphabetMap[letter.toLocaleLowerCase()] = 1 + idx;
});
alphabet.forEach((letter, idx) => {
  alphabetMap[letter.toUpperCase()] = 27 + idx;
});

export function getItemPriorities(item: string): number {
  return alphabetMap[item];
}

export function sumArray(values: number[]) {
  return values.reduce((acc, val) => acc + val, 0);
}
