import Alea from "alea";

const PANGRAM_SIZE = 7;

function getDateWithOffset(offset = 0) {
  let today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  let tomorrow = today.setDate(today.getDate() + offset);
  return new Date(tomorrow);
}

function getDayNumber(offset = 0) {
  let d = getDateWithOffset(offset);
  let DAYS_TO_MILLISECONDS = 24 * 60 * 60 * 1000;
  return Math.floor(d.getTime() / DAYS_TO_MILLISECONDS);
}

function shuffleArray(arr: number[], seed = 0) {
  let rng = Alea(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(rng() * i);
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

function getShuffledNumberArray(n: number, seed = 0) {
  return shuffleArray(
    Array(n)
      .fill(1)
      .map((x, i) => i)
  );
}

function getAllPangrams(data: string[]) {
  return data.filter((word) => {
    word = word.toLowerCase();
    return new Set(word).size == PANGRAM_SIZE;
  });
}

function getAllValidPangrams(data: string[]) {
  const pangrams = getAllPangrams(data);
  return pangrams.filter((word) => {
    return word != word.toLowerCase();
  });
}

function capitalizeLetter(word: string, letter: string) {
  return word.split("").reduce((acc, elem) => {
    if (elem.toLowerCase() == letter.toLowerCase()) {
      return acc + elem.toUpperCase();
    } else {
      return acc + elem.toLowerCase();
    }
  }, "");
}

export function getTargetPangram(data: string[], offset: number = 0) {
  function countUpperCase(word: string) {
    let num_uppercase = 0;
    for (const letter of word) {
      if (letter == letter.toUpperCase()) {
        num_uppercase += 1;
      }
    }
    return num_uppercase;
  }

  const valid_pangrams = getAllValidPangrams(data);
  const num_choices = valid_pangrams.reduce((acc, elem) => {
    return acc + countUpperCase(elem);
  }, 0);
  const choice_arr = getShuffledNumberArray(num_choices);
  const choice = choice_arr[getDayNumber(offset) % num_choices];

  let counter = 0;
  for (const word of valid_pangrams) {
    for (const letter of word) {
      if (letter == letter.toUpperCase()) {
        if (counter == choice) {
          return capitalizeLetter(word, letter);
        } else {
          counter += 1;
        }
      }
    }
  }

  // throw new Error("Failure");
}
