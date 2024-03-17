import fs from "fs";
import { FILES_OUTPUT_FOLDER } from "./config.js";


function mapWordFrequency(text) {
  let words = text.split(" ");
  let freqMap = {};
  words.forEach((w) => {
    if (!freqMap[w]) {
      freqMap[w] = 0;
    }
    freqMap[w] += 1;
  });
  return freqMap;
}

function reduceWordFrequency(mappedFrequencies) {
  return mappedFrequencies.reduce((acc, partial) => {
    for (let k in partial) {
      acc[k] = (acc[k] || 0) + partial[k];
    }
    return acc;
  }, {});
}

const files = fs.readdirSync(FILES_OUTPUT_FOLDER, { encoding: "utf-8" });
const mapped = [];
files.forEach((file) => {
  const fileContent = fs.readFileSync(`${FILES_OUTPUT_FOLDER}/${file}`, {
    encoding: "utf-8",
  });
  mapped.push(mapWordFrequency(fileContent));
});
const reduced = reduceWordFrequency(mapped);

const fileName = "final.txt";
fs.writeFileSync(`${FILES_OUTPUT_FOLDER}/${fileName}`, JSON.stringify(reduced), {
  encoding: "utf-8",
});

console.log(mapped);
console.log(reduced);
