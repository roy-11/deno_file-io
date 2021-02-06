import { join } from 'https://deno.land/std/path/mod.ts';
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { parse } from 'https://deno.land/std/encoding/csv.ts';
import * as _ from "https://raw.githubusercontent.com/lodash/lodash/4.17.20-es/lodash.js"

async function readTextFile() {
  const path = join("text_files","hello.txt")
  const textData = await Deno.readTextFile(path)
  console.log(textData)
}
// await readTextFile()

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
// await readCSVFile()

interface Planet {
  [key:string]: string
}

async function findHabitablePanets() {
  const path = join("csv_files","kepler_exoplanets_nasa.csv")
  const csvData = await Deno.open(path)
  const bufReader = new BufReader(csvData)
  const result = await parse(bufReader,{
    skipFirstRow: true,
    comment: "#"
  })
  Deno.close(csvData.rid)

  const planets = (result as Array<Planet>).filter((planet)=>{
    const planetaryRadius = Number(planet["koi_prad"])
    const stellerMass = Number(planet["koi_smass"])
    const stellerRadius = Number(planet["koi_srad"])

    return planet["koi_disposition"] === "CONFIRMED" 
    && planetaryRadius > 0.5 && planetaryRadius < 1.5
    && stellerMass > 0.78 && stellerMass > 1.04
    && stellerRadius > 0.99 && stellerRadius > 1.01
  }) 

  return planets.map((planet)=>{
    return _.pick(planet,["keplar_name","koi_count","koi_steff","koi_prad","koi_smass","koi_srad"])
  })
}

const result = await findHabitablePanets()
console.log(result)
console.log(`${result.length} habitable planets founded!`)

