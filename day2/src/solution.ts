import { getInput } from "./utils.ts";

const input = await getInput();
type Sign = "rock" | "paper" | "scissors";
type GameResult = "win" | "lose" | "draw";

const mapEnemy: Record<string, Sign> = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const mapMe: Record<string, Sign> = {
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

const points: Record<Sign, number> = {
  "rock": 1,
  "paper": 2,
  "scissors": 3,
};

const pointsResult: Record<GameResult, number> = {
  lose: 0,
  draw: 3,
  win: 6,
};

/**
 * Part 1
 */
let totalScore = 0;

for (let game of input) {
  const mySign: Sign = mapMe[game[1]];
  const opponentSign: Sign = mapEnemy[game[0]];
  totalScore += points[mySign];

  if (
    (mySign === "rock" && opponentSign === "rock") ||
    (mySign === "paper" && opponentSign === "paper") ||
    (mySign === "scissors" && opponentSign === "scissors")
  ) {
    totalScore += pointsResult.draw;
  } else if (
    (mySign === "rock" && opponentSign === "scissors") ||
    (mySign === "paper" && opponentSign === "rock") ||
    (mySign === "scissors" && opponentSign === "paper")
  ) {
    totalScore += pointsResult.win;
  } else if (
    (mySign === "rock" && opponentSign === "paper") ||
    (mySign === "paper" && opponentSign === "scissors") ||
    (mySign === "scissors" && opponentSign === "rock")
  ) {
    totalScore += pointsResult.lose;
  }
}

console.log("totalScore:", totalScore);

/**
 * Part 2
 */
totalScore = 0;

const expectedResultMap: Record<string, GameResult> = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

for (let game of input) {
  const opponentSign: Sign = mapEnemy[game[0]];
  const expectedResult = expectedResultMap[game[1]];
  totalScore += pointsResult[expectedResult];

  if (
    (expectedResult === "win" && opponentSign === "rock") ||
    (expectedResult === "lose" && opponentSign === "scissors") ||
    (expectedResult === "draw" && opponentSign === "paper")
  ) {
    totalScore += points.paper;
  } else if (
    (expectedResult === "win" && opponentSign === "scissors") ||
    (expectedResult === "lose" && opponentSign === "paper") ||
    (expectedResult === "draw" && opponentSign === "rock")
  ) {
    totalScore += points.rock;
  } else if (
    (expectedResult === "win" && opponentSign === "paper") ||
    (expectedResult === "lose" && opponentSign === "rock") ||
    (expectedResult === "draw" && opponentSign === "scissors")
  ) {
    totalScore += points.scissors;
  }
}

console.log("totalScore part2:", totalScore);
