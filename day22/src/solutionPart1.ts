// Solution here
import { getInput } from "./utils.ts";

type Direction = "R" | "L" | "U" | "D";
type Position = {
  row: number;
  col: number;
  directoin: Direction;
};

export async function part1() {
  let { map, path } = await getInput();
  let position: Position = {
    row: 0,
    col: 0,
    directoin: "R",
  };
  position.col = map[0].split("").findIndex((letter: string) => letter === ".");

  function executeMove(moveDetails: string | number) {
    if (moveDetails === "R") {
      const moveMap: Record<Direction, Direction> = {
        R: "D",
        D: "L",
        L: "U",
        U: "R",
      };
      position.directoin = moveMap[position.directoin];
    } else if (moveDetails === "L") {
      const moveMap: Record<Direction, Direction> = {
        R: "U",
        D: "R",
        L: "D",
        U: "L",
      };
      position.directoin = moveMap[position.directoin];
    } else {
      switch (position.directoin) {
        case "R": {
          for (let i = 1; i <= moveDetails; i++) {
            const nextPositionIdx =
              position.col + 1 < map[position.row].length &&
                map[position.row][position.col + 1] !== " "
                ? position.col + 1
                : map[position.row].split("").findIndex((letter: string) =>
                  letter !== " "
                );

            if (map[position.row][nextPositionIdx] === "#") {
              break;
            } else {
              position.col = nextPositionIdx;
            }
          }
          break;
        }
        case "D": {
          for (let i = 1; i <= moveDetails; i++) {
            let nextPositionIdx;
            if (
              position.row + 1 < map.length &&
              map[position.row + 1][position.col] !== " "
            ) {
              nextPositionIdx = position.row + 1;
            } else {
              for (let j = 0; j <= map.length; j++) {
                if (map[j][position.col] !== " ") {
                  nextPositionIdx = j;
                  break;
                }
              }
              if (nextPositionIdx === undefined) {
                throw Error("wrong input, dir D");
              }
            }

            if (map[nextPositionIdx][position.col] === "#") {
              break;
            } else {
              position.row = nextPositionIdx;
            }
          }
          break;
        }
        case "L": {
          for (let i = 1; i <= moveDetails; i++) {
            const nextPositionIdx = (position.col - 1 >= 0) &&
                map[position.row][position.col - 1] !== " "
              ? position.col - 1
              : map[position.row].split("").findLastIndex((letter: string) =>
                letter !== " "
              );

            if (map[position.row][nextPositionIdx] === "#") {
              break;
            } else {
              position.col = nextPositionIdx;
            }
          }
          break;
        }
        case "U": {
          for (let i = 1; i <= moveDetails; i++) {
            let nextPositionIdx;
            if (
              position.row - 1 >= 0 &&
              map[position.row - 1][position.col] !== " "
            ) {
              nextPositionIdx = position.row - 1;
            } else {
              for (let j = map.length - 1; j >= 0; j--) {
                if (map[j][position.col] !== " ") {
                  nextPositionIdx = j;
                  break;
                }
              }
              if (nextPositionIdx === undefined) {
                throw Error("wrong input, dir U");
              }
            }

            if (map[nextPositionIdx][position.col] === "#") {
              break;
            } else {
              position.row = nextPositionIdx;
            }
          }
          break;
        }
      }
    }
  }

  for (let move of path) {
    executeMove(move);
  }

  const dirPoints = {
    R: 0,
    D: 1,
    L: 2,
    U: 3,
  };

  const password = ((position.row + 1) * 1000) + ((position.col + 1) * 4) +
    dirPoints[position.directoin];

  console.log("Part1", password);
}
