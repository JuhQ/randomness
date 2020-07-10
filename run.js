const generate = require("./index");

const times = (n, fn) => [...Array(n).fill()].map(fn);
const existsInList = (word, i, list) => list.indexOf(word) === i;

console.log("current run ID:", generate());

const iterations = 1e2;

console.log("iterations to be tested", iterations);
const listOfRandomness = times(iterations, generate);
console.log("combinations done");
console.log("listOfRandomness", listOfRandomness);
const duplicatesFound =
  listOfRandomness.length !== listOfRandomness.filter(existsInList).length;
console.log("duplicates exists =", duplicatesFound);

const negate = (fn) => (...args) => !fn(...args);
if (duplicatesFound) {
  const duplicatelistOfRandomnesss = listOfRandomness.filter(
    negate(existsInList)
  );
  console.log("duplicates", duplicatelistOfRandomnesss);
  console.log("duplicate count", duplicatelistOfRandomnesss.length);
}
