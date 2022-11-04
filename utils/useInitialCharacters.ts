import { WortifyCharacters } from "../components/Types";
import { getTargetPangram } from "./getTargetPangram";

export const useInitialCharacters = (
  words: string[]
): WortifyCharacters | undefined => {
  const pangram = getTargetPangram(words);

  if (pangram === undefined || pangram.length === 0) {
    return undefined;
  } else {
    const letters = new Set(pangram.split(""));
    const orangeCharacter = Array.from(letters).find(
      (letter) => letter.toUpperCase() === letter
    );

    if (orangeCharacter === undefined) {
      return undefined;
    } else {
      letters.delete(orangeCharacter);

      return {
        otherCharacters: Array.from(letters).join(""),
        orangeCharacter: orangeCharacter.toLowerCase(),
      };
    }
  }
};
