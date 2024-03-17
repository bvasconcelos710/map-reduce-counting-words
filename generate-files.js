import fs, { existsSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import { FILES_OUTPUT_FOLDER } from "./config.js";


function getRandomWordLength(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateText(n, alphabet, minWordSize, maxWordSize) {
  const generatedWords = [];
  for (let words = 0; words < n; words++) {
    const word = new Array(getRandomWordLength(minWordSize, maxWordSize));
    for (let letterIndex = 0; letterIndex < word.length; letterIndex++) {
      word[letterIndex] = alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    generatedWords.push(word.join(""));
  }
  return generatedWords;
}


function generateFiles(split, n, alphabet, minWordSize, maxWordSize) {
  const text = generateText(n, alphabet, minWordSize, maxWordSize);
  const chunks = Array.from({ length: split }, (_, i) =>
    text.slice((i * text.length) / split, ((i + 1) * text.length) / split)
  );
  for (const chunk of chunks) {
    const fileChunk = chunk.join(" ");
    const filename = `${uuidv4().split("-").join("")}.txt`;
    fs.writeFileSync(`${FILES_OUTPUT_FOLDER}/${filename}`, fileChunk, {
      encoding: "utf-8",
    });
  }
}

const splitArg = 5;
const numberWordsArg = 100;
const alphabetArg = "abc".split("");
const minSizeArg = 2;
const maxSizeArg = 4;

if (existsSync(FILES_OUTPUT_FOLDER)) {

  fs.rmSync(FILES_OUTPUT_FOLDER, { recursive: true, force: true });
}
fs.mkdirSync(FILES_OUTPUT_FOLDER);
generateFiles(splitArg, numberWordsArg, alphabetArg, minSizeArg, maxSizeArg);
