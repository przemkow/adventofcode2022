// Solution here
import { getInput } from "./utils.ts";

// Part 1
let input = await getInput();

const start = {
  col: 500,
  row: 0,
};
let sandCount = 0;

// Array[row][col]: boolean
// Fall to the bottom
// If fall on the sand check if left is empty - YES - put sand there
// If fall on the sand check if right is empty - YES - put sand there
function putASandPiece(row: number, col: number): boolean {
  if (input?.[row]?.[col] === true) {
    return false;
  }

  //Arrived to the last row without fe
  if (row > input.length - 1) {
    return false;
  }

  // If bellow is empty - try to put sand there
  if (input?.[row + 1]?.[col] !== true) {
    return putASandPiece(row + 1, col);
    // If there is an element bellow
  } else {
    // check left
    if (input?.[row + 1]?.[col - 1] === false) {
      return putASandPiece(row + 1, col - 1);
      // check right
    } else if (input?.[row + 1]?.[col + 1] === false) {
      return putASandPiece(row + 1, col + 1);
      // put item
    } else {
      sandCount++;
      input[row][col] = true;
      return true;
    }
  }
}

//Iterate as long as you can not put any new sand
while (true) {
  if (putASandPiece(start.row, start.col) === false) {
    console.log("Part 1:", sandCount);
    break;
  }
}

// Part 2
input = await getInput();
let maxHeight: number;

input.forEach((row, idx) => {
  let hasWall = row.some((item) => item);
  if (hasWall) {
    maxHeight = idx;
  }
});

for (let i = 0; i < input[0].length; i++) {
  input[maxHeight! + 2][i] = true;
}

sandCount = 0;
while (true) {
  if (putASandPiece(start.row, start.col) === false) {
    console.log("Part 2:", sandCount);
    break;
  }
}
