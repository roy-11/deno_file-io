import { join } from 'https://deno.land/std/path/mod.ts';
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { parse } from 'https://deno.land/std/encoding/csv.ts';

async function readTextFile() {
  const path = join("text_files","hello.txt")
  const textData = await Deno.readTextFile(path)
  console.log(textData)
}

async function readCSVFile() {
  const path = join("csv_files","kepler_exoplanets_nasa.csv")
  const csvData = await Deno.open(path)
  const bufReader = new BufReader(csvData)
  const result = await parse(bufReader,{
    skipFirstRow: true,
    comment: "#"
  })
  Deno.close(csvData.rid)

  console.log(result)
}

await readTextFile()
await readCSVFile()