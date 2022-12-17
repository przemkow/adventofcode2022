// Solution here
import { getInput, shapes } from "./utils.ts";

const wind = await getInput();
let windId = 0;
let shapeId = 0;

function getWindDirection() {
  windId = windId % wind.length;
  const nextDirection = wind[windId];
  windId++;

  return nextDirection;
}

function getNextShape() {
  shapeId = shapeId % shapes.length;
  const nextShape = shapes[shapeId];
  shapeId++;

  return nextShape;
}

const board: string[][] = [];
const boardWidth = 7;

//Part1
function canMove(
  shape: string[],
  offsetLeft: number,
  bottomIdx: number,
  dir: "left" | "right" | "down",
) {
  let nextIdx = bottomIdx;
  let nextOffset = offsetLeft;
  switch (dir) {
    case "down": {
      nextIdx = bottomIdx - 1;
      break;
    }
    case "left": {
      nextOffset = offsetLeft - 1;
      break;
    }
    case "right": {
      nextOffset = offsetLeft + 1;
      break;
    }
  }

  //Last row
  if (nextIdx === -1) {
    return false;
  }

  //Element colision
  for (let i = 0; i < shape.length; i++) {
    const shapeRow = shape[i];
    for (let letterIdx = 0; letterIdx < shapeRow.length; letterIdx++) {
      if (shapeRow[letterIdx] === "#") {
        if (board[nextIdx + i]?.[nextOffset + letterIdx] === "#") {
          return false;
        }
      }
    }
  }
  return true;
}

function mergeWithBoard(shape: string[], leftIdx: number, bottomIdx: number) {
  for (let i = 0; i < shape.length; i++) {
    const boardRow = i + bottomIdx;
    board[boardRow] ??= Array.from({ length: 7 }, () => ".");

    const shapeRow = shape[i];
    for (let letterIdx = 0; letterIdx < shapeRow.length; letterIdx++) {
      const letter = shapeRow[letterIdx];
      const boardCol = letterIdx + leftIdx;
      if (letter === "#") {
        board[boardRow][boardCol] = "#";
      }
    }
  }
}

export function part1() {
  for (let i = 0; i < 2022; i++) {
    const shape = getNextShape();
    let leftIdx = 2;
    let bottomIdx = board.length + 4;
    while (true) {
      if (canMove(shape, leftIdx, bottomIdx, "down")) {
        bottomIdx--;
        const wind = getWindDirection();
        if (wind === "<") {
          if (canMove(shape, leftIdx, bottomIdx, "left")) {
            leftIdx = Math.max(0, leftIdx - 1);
          }
        } else {
          if (canMove(shape, leftIdx, bottomIdx, "right")) {
            leftIdx = Math.min(boardWidth - shape[0].length, leftIdx + 1);
          }
        }
      } else {
        mergeWithBoard(shape, leftIdx, bottomIdx);
        break;
      }
    }
  }
  console.log("Part1", board.length);
}
