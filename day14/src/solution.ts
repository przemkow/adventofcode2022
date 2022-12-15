// Solution here
import { getInput } from "./utils.ts";

// Part 1
let input = await getInput();
let inputTextMap = input.map(r => r.map(v => v ? '*' : ' ').join('')).join('\n');
await Deno.writeTextFile("./day14/input/inputTextMap.txt", inputTextMap);

const start = {
  col: 500,
  row: 0
}

//Array[row][col]
// Fall to the bottom
// If fall on the sand check if left is empty - YES - put sand there
// If fall on the sand check if right is empty - YES - put sand there
let sandCount = 0;
function putASandPiece(row, col): boolean {
  //Arrived to the last row without fe
  if(row > input.length - 1) {
    return false
  }

  //If bellow is occupied
  if(input?.[row + 1]?.[col] !== true) {
    return putASandPiece(row + 1, col)
  //If there is an element bellow
  } else {
    // check left
    if(input?.[row + 1]?.[col - 1] === false) {
      return putASandPiece(row + 1, col - 1)
    // check right
    } else if(input?.[row + 1]?.[col + 1] === false) {
      return putASandPiece(row + 1, col + 1)
    // put item
    } else {
      sandCount++;
      input[row][col] = true;
      return true;
    }
  }
}

while(true) {
  if(putASandPiece(start.row, start.col) === false) {
    break;
  }
}

console.log("Part 1.", sandCount)

// Part 2
input = await getInput();

let maxHeight;

input.forEach((row, idx) => {
  let haswall = row.some(item => item);
  if(haswall) {
    maxHeight =  idx;
  }
})

for(let i =0; i < input[0].length; i++) {
  input[maxHeight + 2][i] = true;
}

inputTextMap = input.map(r => r.map(v => v ? '*' : ' ').join('')).join('\n');
await Deno.writeTextFile("./day14/input/inputTextMap2.txt", inputTextMap);

sandCount = 0;
while(true) {
  
  if(putASandPiece(start.row, start.col) === false) {
    break;
  }
}


console.log("Part 2.", sandCount)
