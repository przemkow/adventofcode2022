// Utils here
const pairSeparator = `

`;
const lineBreak = "\n";

export type Packet = number | (number | Packet)[];
export type PacketPair = [Packet, Packet];

export async function getInput(): Promise<PacketPair[]> {
  return (await Deno.readTextFile("./day13/input/input.txt"))
    .split(pairSeparator)
    .map((pairs) => {
      return pairs.split(lineBreak).map((inputList) =>
        JSON.parse(inputList)
      ) as PacketPair;
    });
}
