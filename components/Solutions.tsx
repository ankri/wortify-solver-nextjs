import * as React from "react";
import { findMatches } from "../utils/findMatches";
import { WithWords, Words, WortifyCharacters } from "./Types";

export interface SolutionsProps extends WortifyCharacters, WithWords {
  foundWords: Words;
}

export const Solutions: React.FC<SolutionsProps> = ({
  otherCharacters,
  orangeCharacter,
  words,
  foundWords,
}) => {
  const solutions = React.useMemo(() => {
    return findMatches({ otherCharacters, orangeCharacter, words });
  }, [otherCharacters, orangeCharacter, words]);

  return (
    <div>
      <strong>Lösungen: {solutions.length}</strong>
      {foundWords.length > 0 ? (
        <>
          {" "}
          &mdash; <strong>Davon gefunden: {foundWords.length}</strong>{" "}
        </>
      ) : null}
      <ul className="grid p-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-6 bg-gray-50">
        {solutions.map((word) => {
          const isFound = foundWords.includes(word);
          const isOrange = [
            ...otherCharacters.split(""),
            orangeCharacter,
          ].every((character) => word.includes(character));

          return (
            <li
              key={word}
              className={`p-1 ${isFound ? "font-bold" : ""} ${
                isOrange ? "text-orange-700" : ""
              }`}
            >
              {word}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
