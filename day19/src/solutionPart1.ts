// Solution here
import { getInput } from "./utils.ts";

const timeLimit = 24;
type Asset = {
  ore: number;
  clay: number;
  obsidian: number;
  geode: number;
};

const empty = {
  ore: 1,
  clay: 0,
  obsidian: 0,
  geode: 0,
};

const robots: Asset = {
  ...empty,
  ore: 1,
};

const mineralTypes: ("ore" | "clay" | "obsidian" | "geode")[] = [
  "ore",
  "clay",
  "obsidian",
  "geode",
];

function geodeCount(time: number, activeRobots: Asset, ownedMinerals: Asset) {
  let activeRobotsNewState = { ...activeRobots };
  let ownedMineralsNewState = { ...ownedMinerals };

  // Dig minerals
  for (let mineral of mineralTypes) {
    if (activeRobotsNewState[mineral] > 0) {
      ownedMineralsNewState[mineral] += activeRobotsNewState[mineral];
    }
  }

  return ownedMineralsNewState;
}

// TODO - had no time to find optimal solution - solve it later.
export async function part1() {
  //opened geodes after 24 minutes
  // const input = await getInput();
  // const count = geodeCount(timeLimit, robots, {...empty})
  // Find max geode after 24 minutes.
  // Start - 1 ore robot;
  // console.log(input[0])
  console.log("Part1. TODO");
}

// Each robot can collect 1
