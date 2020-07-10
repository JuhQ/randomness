const catNames = require("cat-names");
const dogNames = require("dog-names");
const pokemon = require("pokemon");
const superheroes = require("superheroes");
const supervillains = require("supervillains");
const superb = require("superb");
const yesNoWords = require("yes-no-words");
const nerds = require("nerds");
const { wordList } = require("random-words");
const phonetic = require("phonetic");
const humanNames = require("human-names");

const sampleSize = require("lodash/sampleSize");
const get = require("lodash/fp/get");

const times = (n, fn) => [...Array(n).fill()].map(fn);
const nerdStuff = (what) => (include = "name") =>
  nerds.resolve(what, 50).include([include]).asArray().map(get(include));

const allHarryPotter = ["first", "last"]
  .map(nerdStuff("Harry Potter"))
  .reduce((a, b) => [...a, ...b], []);

const callfn = (fn) => fn();

const allStarwarsAndPokemon = ["Star Wars", "Pokemon"]
  .map(nerdStuff)
  .map(callfn)
  .reduce((a, b) => [...a, ...b], [])
  .map((word) => word.replace(" ", ""));

const existsInList = (word, i, list) => list.indexOf(word) === i;

const possibilities = [
  ...catNames.all,
  ...dogNames.all,
  ...pokemon.all(),
  ...superheroes.all,
  ...supervillains.all,
  ...superb.all,
  ...yesNoWords.all,
  ...allStarwarsAndPokemon,
  ...allHarryPotter,
  ...wordList,
  ...times(100, phonetic.generate),
  ...humanNames.allEn,
  ...humanNames.allFr,
  ...humanNames.allNl,
  ...humanNames.allDe,
  ...humanNames.allIt,
]
  .join("-")
  .replace(/[\W,]/g, "-") // replace whitespace and commas with -
  .replace(/(-{2,})/g, "") // repeating - characters
  .split("-");

const wordlist = possibilities.filter(existsInList);

const generate = (wordCount = 3) => sampleSize(wordlist, wordCount).join(" ");

module.exports = generate;
