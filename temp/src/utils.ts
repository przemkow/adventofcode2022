// Utils here
export async function getInput() {
  return await Deno.readTextFile("./dayX/input/input.txt");
}

