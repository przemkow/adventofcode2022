// Solution here
import { loadSteps } from "./utils.ts";

type Position = { x: number; y: number };

const input = await loadSteps();
let headPosition: Position = {
  x: 0,
  y: 0,
};
let tailPosition: Position = {
  x: 0,
  y: 0,
};

/*
    ..U..
    L...R
    ..D..

    ^
    |
    y
    |--x-->
*/

// Part 1
function updateTail() {
  let distX = headPosition.x - tailPosition.x;
  let distY = headPosition.y - tailPosition.y;

  if (Math.abs(distX) >= 2) {
    tailPosition.x += Math.sign(distX);
    if (Math.abs(distY) != 0) tailPosition.y += Math.sign(distY);
  } else if (Math.abs(distY) >= 2) {
    tailPosition.y += Math.sign(distY);
    if (Math.abs(distX) != 0) tailPosition.x += Math.sign(distX);
  }
}

let visitedPositions = new Set<string>();
input.forEach((dir) => {
  switch (dir) {
    case "U": {
      headPosition.y++;
      break;
    }
    case "R": {
      headPosition.x++;
      break;
    }
    case "D": {
      headPosition.y--;
      break;
    }
    case "L": {
      headPosition.x--;
      break;
    }
  }

  updateTail();
  visitedPositions.add(`${tailPosition.x}__${tailPosition.y}`);
});

console.log("visited different positions by tail:", visitedPositions.size);

// Part 2
const rope: Position[] = [];
const ropeSize = 10;
for (let i = 0; i < ropeSize; i++) {
  rope.push({
    x: 0,
    y: 0,
  });
}

function updateAllNodes() {
  for (let i = 1; i < ropeSize; i++) {
    let distX = rope[i - 1].x - rope[i].x;
    let distY = rope[i - 1].y - rope[i].y;

    if (Math.abs(distX) >= 2) {
      rope[i].x += Math.sign(distX);
      if (Math.abs(distY) != 0) rope[i].y += Math.sign(distY);
    } else if (Math.abs(distY) >= 2) {
      rope[i].y += Math.sign(distY);
      if (Math.abs(distX) != 0) rope[i].x += Math.sign(distX);
    }
  }
}

visitedPositions = new Set<string>();
input.forEach((dir) => {
  const head = rope[0];

  switch (dir) {
    case "U": {
      head.y++;
      break;
    }
    case "R": {
      head.x++;
      break;
    }
    case "D": {
      head.y--;
      break;
    }
    case "L": {
      head.x--;
      break;
    }
  }

  updateAllNodes();
  const tail = rope[rope.length - 1];
  visitedPositions.add(`${tail.x}__${tail.y}`);
});

console.log(
  `visited different positions by tail with rope with ${ropeSize} nodes:`,
  visitedPositions.size,
);
