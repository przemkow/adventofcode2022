// Utils here

const breakWithSpace = `

`;

type Monkey = {
  items: number[];
  operation: Function;
  divisibleByTest: number;
  testTrue: number;
  testFalse: number;
  inspectedItemsCount: number;
};

export async function loadNotes(): Promise<Monkey[]> {
  return (await Deno.readTextFile("./day11/input/notes.txt")).split(
    breakWithSpace,
  )
    .map((monkey) => {
      const [_, items, operation, test, testTrue, testFalse] = monkey
        .split("\n");

      return {
        items: items.replace("  Starting items:", "").split(",")
          .map((num) => parseInt(num, 10)),
        operation: (val: number) => {
          const funcToExecute = operation.replace("  Operation: new = ", "");

          //🙈🙊🙉 - you do not see any "eval" in this file.
          return eval(`(function(old) {return ${funcToExecute}})(${val})`);
        },
        divisibleByTest: parseInt(
          test.replace("  Test: divisible by ", ""),
          10,
        ),
        testTrue: parseInt(
          testTrue.replace("    If true: throw to monkey ", ""),
          10,
        ),
        testFalse: parseInt(
          testFalse.replace("    If false: throw to monkey ", ""),
          10,
        ),
        inspectedItemsCount: 0,
      };
    });
}
