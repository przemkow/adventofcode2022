// Utils here
export async function getInput() {
  function getPositionFromString(text: string) {
    const [xText, yText] = text.split(", ");

    return {
      x: parseInt(xText.split("x=")[1], 10),
      y: parseInt(yText.split("y=")[1], 10),
    };
  }
  const rawInput = await Deno.readTextFile("./day15/input/input.txt");
  return rawInput.split("\n")
    .map((row) => row.split("Sensor at ")[1])
    .map((row) => {
      const [sensorStr, beaconStr] = row.split(": closest beacon is at ");

      const sensor = getPositionFromString(sensorStr);
      const beacon = getPositionFromString(beaconStr);

      const distance = Math.abs(sensor.x - beacon.x) +
        Math.abs(sensor.y - beacon.y);

      return {
        position: sensor,
        beacon,
        distance,
      };
    });
}
