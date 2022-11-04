import * as React from "react";
import type { GetStaticProps, NextPage } from "next";
import { downloadWords } from "../utils/downloadWords";
import { WortifyForm } from "../components/WortifyForm";
import { WithWords, WortifyCharacters } from "../components/Types";
import { Solutions } from "../components/Solutions";
import { FoundWordsForm } from "../components/FoundWordsForm";
import { useInitialCharacters } from "../utils/useInitialCharacters";

const Home: NextPage<WithWords> = ({ words }) => {
  const letters = useInitialCharacters(words);

  const [characters, setCharacters] = React.useState<
    WortifyCharacters | undefined
  >(letters);

  const [foundWords, setFoundWords] = React.useState<string[]>([]);
  const [showSolutions, setShowSolutions] = React.useState(false);

  return (
    <div className="p-4 mx-auto md:w-full xl:w-1/2">
      <div className="flex flex-col w-full space-y-4">
        <WortifyForm
          characters={characters}
          onSubmit={({ orangeCharacter, otherCharacters }) => {
            setCharacters({ orangeCharacter, otherCharacters });
            setShowSolutions(true);
          }}
        />
        {characters != null && showSolutions ? (
          <div className="space-y-4">
            <Solutions
              otherCharacters={characters.otherCharacters}
              orangeCharacter={characters.orangeCharacter}
              words={words}
              foundWords={foundWords}
            />
            <hr />
            <FoundWordsForm
              onSubmit={(_foundWords) => setFoundWords(_foundWords)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<WithWords> = async () => {
  const words = await downloadWords();

  return {
    props: {
      words,
    },
  };
};

// export const getServerSideProps: GetServerSideProps<WithWords> = async () => {
//   const words = await downloadWords();

//   return {
//     props: {
//       words,
//     },
//   };
// };

export default Home;
