// Utils here
export async function getInput() {
  const monkeyMap: Record<string, any> = {};
  (await Deno.readTextFile("./day21/input/input.txt")).split("\n").forEach(
    (row) => {
      const [monekyName, operation] = row.split(": ");

      const isNumber = !isNaN(operation as any);
      if (isNumber) {
        monkeyMap[monekyName] = {
          type: "value",
          value: parseInt(operation, 10),
        };
      } else {
        const [left, operant, right] = operation.split(" ");
        monkeyMap[monekyName] = {
          type: "operation",
          left,
          operant,
          right,
        };
      }
    },
  );

  return monkeyMap;
}
