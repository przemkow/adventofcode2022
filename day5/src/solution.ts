// TODO coded on ipad. Review everything

import { loadMoves, loadState } from "./utils.ts";

let state1 = await loadState();
let state2 = await loadState();
const moves = await loadMoves();

// Part 1
moves.forEach(([count, from, to]) => {
  for (let i = 0; i < count; i++) {
    let temp = state1[from].pop();
    state1[to].push(temp);
  }
});

const topRow1 = state1.map((stack: any) => {
  return stack[stack.length - 1];
}).join("");
console.log(topRow1);

// Part 2
moves.forEach(([count, from, to]) => {
  let temp = [];
  for (let i = 0; i < count; i++) {
    let tempVal = state2[from].pop();
    temp.unshift(tempVal);
  }

  for (let item of temp) {
    state2[to].push(item);
  }
});

const topRow2 = state2.map((stack: any) => {
  return stack[stack.length - 1];
}).join("");
console.log(topRow2);
