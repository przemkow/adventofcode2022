// Solution here
import { getInput } from "./utils.ts";

const input = await getInput();
// input['root'].operant = "=";

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

export function part2() {
  // Find rootValue
  const right = getValue(input["root"].right);
  let pointerLeft = Number.MIN_SAFE_INTEGER;
  let pr = Number.MAX_SAFE_INTEGER;

  // Very naive but fast enough solution. (max 54 iterations needed)
  // Binary search over all possible integers to find a matching value that creates the same answer for "root".left
  while (pointerLeft < pr) {
    let mid = pointerLeft + ((pr - pointerLeft) / 2);
    input["humn"].value = mid;
    const left = getValue(input["root"].left);
    if (left === right) {
      console.log("Part2", mid);
      break;
    } else if (left < right) {
      pr = mid;
    } else {
      pointerLeft = mid;
    }
  }
}
