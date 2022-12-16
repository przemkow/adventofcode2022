// Solution here
import { getInput } from "./utils.ts";

const input = await getInput();

// Part1. Dynamic programming over graph - 😭
const totalTime = 30;

// Use binary operations instead of array to improve performance (500ms vs 1500ms)
function setOpenValve(openVales: number, id: number) {
  return openVales | (0b1 << id);
}

function isOpenValve(openVales: number, id: number) {
  return !!(openVales & (0b1 << id));
}

const cache = new Map();
function dynamicProgramming(
  nodeName: string,
  timeLeft: number,
  openValves: number,
) {
  const key = `${nodeName}__${timeLeft}__${openValves}`;
  if (cache.has(key)) {
    return cache.get(key);
  }

  if (timeLeft <= 0) {
    return 0;
  }
  const node = input[nodeName]!;

  //Option 1. Open Valve if it was not open yet and flowRate is greater then 0
  let openValveBenefit = 0;
  if (isOpenValve(openValves, node.id) === false && node.flowRate !== 0) {
    const newState = setOpenValve(openValves, node.id);
    // (timeLeft - 1) because pressure will be released in next time tick
    openValveBenefit = (node.flowRate * (timeLeft - 1)) + dynamicProgramming(
      nodeName,
      timeLeft - 1,
      newState,
    );
  }

  //Option 2. Do not open valve
  const goToOtherNodeBenefit: number = Math.max(
    ...node.adjacencyList.map((neighbourNode) =>
      dynamicProgramming(
        neighbourNode,
        timeLeft - 1,
        openValves,
      )
    ),
  );
  const value = Math.max(openValveBenefit, goToOtherNodeBenefit);
  cache.set(key, value);
  return value;
}

export function solutionPart1() {
  const answer = dynamicProgramming("AA", totalTime, 0);
  console.log("Part1 answer", answer);
}
