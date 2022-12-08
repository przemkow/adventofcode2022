// TODO coded on iPhone. Review everything

import { load, sumArray } from "./utils.ts";

let trees = await load();
console.log(trees.length, trees[0].length);

//part1
function checkIfVisible(rowIdx, colIdx) {
  const height = trees[rowIdx][colIdx];

  //left
  for (let i = rowIdx - 1; i >= -1; i--) {
    if (i === -1) {
      return true;
    }

    const itemH = trees[i][colIdx];
    if (itemH >= height) break;
  }

  //right
  for (let i = rowIdx + 1; i <= trees.length; i++) {
    if (i === trees.length) {
      return true;
    }

    const itemH = trees[i][colIdx];
    if (itemH >= height) break;
  }

  //top
  for (let i = colIdx - 1; i >= -1; i--) {
    if (i === -1) {
      return true;
    }

    const itemH = trees[rowIdx][i];
    if (itemH >= height) break;
  }

  //bottom
  for (let i = colIdx + 1; i <= trees.length; i++) {
    if (i === trees[0].length) {
      return true;
    }

    const itemH = trees[rowIdx][i];
    if (itemH >= height) break;
  }
}

let count = 0;

for (let row = 0; row < trees.length; row++) {
  for (let col = 0; col < trees[0].length; col++) {
    if (checkIfVisible(row, col)) {
      count++;
    }
  }
}

console.log("visible trees", count);

//part 2
function calculteScenicScore(rowIdx, colIdx) {
  const height = trees[rowIdx][colIdx];
  let score = 1;
  //left
  let temp = 0;
  for (let i = rowIdx - 1; i >= 0; i--) {
    temp++;
    const itemH = trees[i][colIdx];
    if (itemH >= height) break;
  }
  if (temp) score = score * temp;

  //right
  temp = 0;
  for (let i = rowIdx + 1; i < trees.length; i++) {
    temp++;

    const itemH = trees[i][colIdx];
    if (itemH >= height) break;
  }
  if (temp) score = score * temp;

  //top
  temp = 0;
  for (let i = colIdx - 1; i >= 0; i--) {
    temp++;
    const itemH = trees[rowIdx][i];
    if (itemH >= height) break;
  }
  if (temp) score = score * temp;

  //bottom
  temp = 0;
  for (let i = colIdx + 1; i < trees.length; i++) {
    temp++;
    const itemH = trees[rowIdx][i];
    if (itemH >= height) break;
  }
  if (temp) score = score * temp;

  return score;
}

let scenicScore = 0;

for (let row = 0; row < trees.length; row++) {
  for (let col = 0; col < trees[0].length; col++) {
    scenicScore = Math.max(scenicScore, calculteScenicScore(row, col));
  }
}

console.log("max scenic score", scenicScore);
