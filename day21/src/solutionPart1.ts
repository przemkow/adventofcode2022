// Solution here
import { getInput } from "./utils.ts";

const input = await getInput();

function getValue(monkeyName: string): number {
  const monkey = input[monkeyName];
  if (monkey.type === "value") {
    return monkey.value;
  } else {
    switch (monkey.operant) {
      case "+": {
        return getValue(monkey.left) + getValue(monkey.right);
      }
      case "-": {
        return getValue(monkey.left) - getValue(monkey.right);
      }
      case "*": {
        return getValue(monkey.left) * getValue(monkey.right);
      }
      case "/": {
        return getValue(monkey.left) / getValue(monkey.right);
      }
    }
  }
  throw Error("Wrong input");
}

export function part1() {
  console.log("Part1", getValue("root"));
}
