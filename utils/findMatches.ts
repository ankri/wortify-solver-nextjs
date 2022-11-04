import { WithWords, WortifyCharacters } from "../components/Types";

export const findMatches = ({
  orangeCharacter,
  otherCharacters,
  words,
}: WortifyCharacters & WithWords): string[] => {
  const allCharacters = orangeCharacter + otherCharacters;
  const matches = words.filter((word) => {
    const wordInLowerCase = word.toLowerCase();

    // only use the words with the orange character
    if (wordInLowerCase.includes(orangeCharacter)) {
      // each character in the word ...
      const characters = wordInLowerCase.split("");
      // ... has to be one of the entered characters
      return characters.every((char) => allCharacters.includes(char));
    } else {
      return false;
    }
  });
  return matches.map((word) => word.toLowerCase());
};
