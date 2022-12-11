// Solution here

import { loadNotes } from "./utils.ts";
const monkeysP1 = await loadNotes();
const monkeysP2 = await loadNotes();

// Part 1
function runCycle() {
  for (const monkey of monkeysP1) {
    const tempItems = [...monkey.items];
    monkey.items = [];

    for (const item of tempItems) {
      monkey.inspectedItemsCount++;
      let newValue = monkey.operation(item);
      newValue = Math.floor(newValue / 3);
      if (newValue % monkey.divisibleByTest === 0) {
        monkeysP1[monkey.testTrue].items.push(newValue);
      } else {
        monkeysP1[monkey.testFalse].items.push(newValue);
      }
    }
  }
}

for (let i = 0; i < 20; i++) {
  runCycle();
}

monkeysP1.sort((a, b) => b.inspectedItemsCount - a.inspectedItemsCount);

const top2Score = monkeysP1[0].inspectedItemsCount *
  monkeysP1[1].inspectedItemsCount;
console.log("part 1 answer", top2Score);

//Part 2;
// Calculate max possible value which will respect all divisable text;
const maxNum = monkeysP2.reduce((acc, val) => acc * val.divisibleByTest, 1);

function runCycle2() {
  for (const monkey of monkeysP2) {
    const tempItems = [...monkey.items];
    monkey.items = [];

    for (const item of tempItems) {
      monkey.inspectedItemsCount++;
      let newValue = monkey.operation(item);
      newValue = newValue % maxNum;
      if (newValue % monkey.divisibleByTest === 0) {
        monkeysP2[monkey.testTrue].items.push(newValue);
      } else {
        monkeysP2[monkey.testFalse].items.push(newValue);
      }
    }
  }
}

for (let i = 0; i < 10000; i++) {
  runCycle2();
}

monkeysP2.sort((a, b) => b.inspectedItemsCount - a.inspectedItemsCount);

const top2Score2 = monkeysP2[0].inspectedItemsCount *
  monkeysP2[1].inspectedItemsCount;
console.log(monkeysP2);
console.log("part 2 answer", top2Score2);
