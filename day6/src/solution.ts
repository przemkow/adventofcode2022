// TODO coded on ipad. Review everything

import { loadMoves, loadState } from "./utils.ts";

let buffer = await loadState();

// Part 1
let cache = new Map();

for (let i = 0; i < buffer.length; i++) {
  let letter = buffer[i];

  if (cache.has(letter)) {
    cache.set(letter, cache.get(letter) + 1);
  } else {
    cache.set(letter, 1);
  }

  let pointerPrev = i - 4;

  if (pointerPrev >= 0) {
    let letterPrev = buffer[pointerPrev];
    cache.set(letterPrev, cache.get(letterPrev) - 1);
    if (cache.get(letterPrev) === 0) {
      cache.delete(letterPrev);
    }
  }

  if (cache.size === 4) {
    console.log("buffer starts at", i + 1);
    break;
  }
}

// Part 2
cache = new Map();

for (let i = 0; i < buffer.length; i++) {
  let letter = buffer[i];

  if (cache.has(letter)) {
    cache.set(letter, cache.get(letter) + 1);
  } else {
    cache.set(letter, 1);
  }

  let pointerPrev = i - 14;

  if (pointerPrev >= 0) {
    let letterPrev = buffer[pointerPrev];
    cache.set(letterPrev, cache.get(letterPrev) - 1);
    if (cache.get(letterPrev) === 0) {
      cache.delete(letterPrev);
    }
  }

  if (cache.size === 14) {
    console.log("message starts at", i + 1);
    break;
  }
}
