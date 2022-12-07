// TODO coded on ipad. Review everything

import { loadState, sumArray } from "./utils.ts";

let commands = await loadState();

type Node = {
  isFile: boolean;
  size?: number;
  name: string;
  children?: Node[];
  parent?: Node;
};

function createNode(name, isFile, size, parent): Node {
  return {
    isFile,
    size,
    name,
    parent,
    children: [],
  };
}

let rootNode: Node;
let node: Node;

// create tree
for (let cmdDetails of commands) {
  switch (cmdDetails.cmd) {
    case "cd": {
      if (cmdDetails.arg === "..") {
        node = node.parent;
      } else {
        if (rootNode === undefined) {
          const newNode = createNode(cmdDetails.arg, false, null, null);
          node = newNode;
          rootNode = node;
        } else {
          const newNode = createNode(cmdDetails.arg, false, null, node);
          node.children.push(newNode);
          node = newNode;
        }
      }

      break;
    }
    case "ls": {
      cmdDetails.output.forEach((row) => {
        let rowDetails = row.split(" ");
        if (rowDetails[0] !== "dir") {
          const newNode = createNode(
            rowDetails[1],
            true,
            parseInt(rowDetails[0], 10),
            node,
          );
          node.children.push(newNode);
        }
      });

      break;
    }
  }
}

// calculate dir size with depth first search - post order traversal
function dfs(node) {
  if (node.isFile) return node.size;
  if (node.children.length === 0) return 0;

  let childrenSize = node.children
    .map((child) => bfs(child));

  const sum = sumArray(childrenSize);
  node.size = sum;
  return node.size;
}

dfs(rootNode);

// PART1
let total = 0;
function sumSize(node) {
  if (node.isFile) return;

  if (node.size <= 100000) {
    total += node.size;
  }
  node.children
    .forEach((child) => sumSize(child));
}

sumSize(rootNode);

console.log("part1", total);

// PART2
const size = 70000000;
const spaceToDelete = 30000000 - (size - rootNode.size);

let deleteDirSize = Number.MAX_SAFE_INTEGER;

function findDirToDelete(node) {
  if (node.isFile) return;
  if (node.size >= spaceToDelete) {
    deleteDirSize = Math.min(deleteDirSize, node.size);
  }
  node.children
    .forEach((child) => findDirToDelete(child));
}

findDirToDelete(rootNode);

console.log("part2", deleteDirSize);
