// Solution here
import { getInput } from "./utils.ts";

// const input = await getInput();
// console.log(input);

const a: any = Array.from({length: 10}, () => Array.from({length: 12}, () => false))


a[5][5] = 3;
a[6][6] = 4;

function traverse(row: any, col: any) {
  const q = [];
  const distance = a[row][col];
  q.push({ row, col, distance });
  let visited = new Set();

  while(q.length > 0) {
    const node = q.shift()!;
    if(a?.[node.row]?.[node.col] === undefined) {
      continue;
    }
    
    const k = `${node.row}__${node.col}__${node.distance}`;
    const distance: any = typeof node.distance === 'number' ?  Math.max(node.distance,  a[node.row][node.col]) : a[node.row][node.col];

    if(node.row < 0 || node.col < 0 || node.row >= a.length || node.col >= a[0].length || distance === 0 ) {
      return
    }

    if(visited.has(k)) {
      continue;
    }
    visited.add(k);
    a[node.row][node.col] = distance;

    q.push({
      row: node.row + 1,
      col: col,
      distance: distance - 1
    });
    q.push({
      row: node.row - 1,
      col: node.col,
      distance: distance - 1
    });
    q.push({
      row: node.row,
      col: node.col + 1,
      distance: distance - 1
    });
    q.push({
      row: node.row,
      col: node.col - 1,
      distance: distance - 1
    });
    q.push({
      row: node.row + 1,
      col: node.col + 1,
      distance: distance - 1
    });
    q.push({
      row: node.row + 1,
      col: node.col - 1,
      distance: distance - 1
    });
    q.push({
      row: node.row - 1,
      col: node.col + 1,
      distance: distance - 1
    });
    q.push({
      row: node.row - 1,
      col: node.col - 1,
      distance: distance - 1
    });
  }
}
console.table(a)
for(let row = 0; row < a.length; row++) {
  for(let col = 0; col < a[0].length; col++) {
    if(typeof a[row][col]=== 'number') {
      traverse(row, col)
    }
  }
}

console.table(a)