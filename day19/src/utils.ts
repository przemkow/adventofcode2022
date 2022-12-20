// Utils here
export async function getInput() {
  const text = await Deno.readTextFile("./day19/input/input.txt");

  return text.split("\n").map((row) =>
    row.split(/Blueprint *.: /)[1].split(". ").map((row) =>
      row.split(" robot costs ")
    ).map((robotDetails) => {
      let [robotType, costs]: any = robotDetails;
      robotType = robotType.split("Each ")[1];
      costs = costs.split(" and ").map((item: string) => {
        const [count, name] = item.split(" ");

        return {
          count,
          name,
        };
      });

      return { robotType, costs };
    })
  );
}
