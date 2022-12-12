// Solution here
import { getInput, Node } from "./utils.ts";

const { start, end, map } = await getInput();

// Part1
function getAdjecencyListForAscend({ row, col }: Node) {
  const nodes = [];

  if (row - 1 >= 0) nodes.push({ row: row - 1, col });
  if (row + 1 < map.length) nodes.push({ row: row + 1, col });
  if (col - 1 >= 0) nodes.push({ row: row, col: col - 1 });
  if (col + 1 < map[0].length) nodes.push({ row: row, col: col + 1 });

  const height = map[row][col];

  return nodes.filter((item) => map[item.row][item.col] - height <= 1);
}

let q: { node: Node; steps: number }[] = [];

q.push({
  node: start,
  steps: 0,
});

let visitedNodes = new Set();

// BFS over graph to find shortest path from Start to End
while (q.length > 0) {
  const { node, steps } = q.shift()!;
  const nodeKey = `${node.col}__${node.row}`;
  // Skip visited nodes
  if (visitedNodes.has(nodeKey)) {
    continue;
  } else {
    visitedNodes.add(nodeKey);
  }

  // Return answer on the end node
  if (node.row === end.row && node.col === end.col) {
    console.log("Part1. You can reach from Start to End in:", steps);
    break;
  }

  // Check neighours otherwise
  const neighbours = getAdjecencyListForAscend(node);
  for (let neighbour of neighbours) {
    q.push({
      node: neighbour,
      steps: steps + 1,
    });
  }
}

// Part 2
function getAdjecencyListForDescend({ row, col }: Node) {
  const nodes = [];

  if (row - 1 >= 0) nodes.push({ row: row - 1, col });
  if (row + 1 < map.length) nodes.push({ row: row + 1, col });
  if (col - 1 >= 0) nodes.push({ row: row, col: col - 1 });
  if (col + 1 < map[0].length) nodes.push({ row: row, col: col + 1 });

  const height = map[row][col];

  return nodes.filter((item) => map[item.row][item.col] - height >= -1);
}

// Reset previous variables
visitedNodes = new Set();
q = [];
q.push({
  node: end,
  steps: 0,
});

// BFS over graph to find shortest path from End to first "a" (height 0)
while (q.length > 0) {
  const { node, steps } = q.shift()!;
  const nodeKey = `${node.col}__${node.row}`;
  // Skip visited nodes
  if (visitedNodes.has(nodeKey)) {
    continue;
  } else {
    visitedNodes.add(nodeKey);
  }

  // Return answer on the end node
  if (map[node.row][node.col] === 0) {
    console.log('Part2. Nearest "a" from End is in:', steps);
    break;
  }

  // Check neighours otherwise
  const neighbours = getAdjecencyListForDescend(node);
  for (let neighbour of neighbours) {
    q.push({
      node: neighbour,
      steps: steps + 1,
    });
  }
}
