import * as React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { downloadWords } from "../utils/downloadWords";
import { WortifyForm } from "../components/WortifyForm";
import { WithWords, WortifyCharacters } from "../components/Types";
import { Solutions } from "../components/Solutions";
import { FoundWordsForm } from "../components/FoundWordsForm";

const Home: NextPage<WithWords> = ({ words }) => {
  const [characters, setCharacters] = React.useState<
    WortifyCharacters | undefined
  >(undefined);
  const [foundWords, setFoundWords] = React.useState<string[]>([]);

  return (
    <div className="md:w-full xl:w-1/2 mx-auto p-4">
      <div className="w-full flex flex-col space-y-4">
        <WortifyForm
          onSubmit={({ orangeCharacter, otherCharacters }) => {
            setCharacters({ orangeCharacter, otherCharacters });
          }}
        />
        {characters != null ? (
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

export const getServerSideProps: GetServerSideProps<WithWords> = async () => {
  const words = await downloadWords();

  return {
    props: {
      words,
    },
  };
};

export default Home;
