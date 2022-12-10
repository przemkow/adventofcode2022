// Solution here
import { linebreak, loadCommands } from "./utils.ts";

const input = await loadCommands();

let register = 1;
let cycle = 0;

// Part 1
let symOfSignalStrengths = 0;

function updateSignalStrengts() {
  const selectedCycles = [20, 60, 100, 140, 180, 220];
  if (selectedCycles.includes(cycle)) {
    const signalStrength = cycle * register;
    symOfSignalStrengths += signalStrength;
  }
}

function cpuTick() {
  cycle++;
  updateSignalStrengts();
}

input.forEach((command) => {
  switch (command.type) {
    case "noop": {
      // Do nothing
      cpuTick();
      break;
    }
    case "addx": {
      // Do nothing
      cpuTick();
      cpuTick();
      register += command.value;
      break;
    }
  }
});
console.log("Part1. Sum of selected signal strength is", symOfSignalStrengths);

// Part 2
// Reset previous vars
register = 2;
cycle = 0;
let screen = "";
let row = "";

const chars = {
  sprite: "#",
  empty: " ",
};

function drawOnCRT() {
  const screenIdx = cycle % 40;
  if ((screenIdx >= register - 1) && (screenIdx <= register + 1)) {
    row += chars.sprite;
  } else {
    row += chars.empty;
  }

  if (screenIdx === 0) {
    screen += row;
    screen += linebreak;
    row = "";
  }
}

function cpuTickPart2() {
  cycle++;
  drawOnCRT();
}

input.forEach((command) => {
  switch (command.type) {
    case "noop": {
      // Do nothing
      cpuTickPart2();
      break;
    }
    case "addx": {
      // Do nothing
      cpuTickPart2();
      cpuTickPart2();
      register += command.value;
      break;
    }
  }
});

console.log("Part 2. Rendered screen:\n");
console.log(screen);
