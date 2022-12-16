// Utils here
type GraphItem = {
  flowRate: number;
  id: number;
  adjacencyList: string[];
};

type Graph = Record<string, GraphItem>;
export async function getInput() {
  const graph: Graph = {};

  (await Deno.readTextFile("./day16/input/input.txt")).split("\n").forEach(
    (row, id) => {
      let [part1, part2] = row.split("; ");
      part1 = part1.split("Valve ")[1];
      const [valve, flowRate] = part1.split(" has flow rate=");

      let adjacencyList;
      if (part2.includes("tunnels lead to valves")) {
        part2 = part2.split("tunnels lead to valves ")[1];
        adjacencyList = part2 === undefined ? [] : part2.split(", ");
      } else {
        const item = part2.split("tunnel leads to valve ")[1];
        adjacencyList = [item];
      }

      graph[valve] = {
        id,
        flowRate: parseInt(flowRate, 10),
        adjacencyList,
      };
    },
  );
  return graph;
}
