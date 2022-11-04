import * as React from "react";
import { Button } from "./forms/Button";
import { FormInput } from "./forms/FormInput";
import { WortifyCharacters } from "./Types";

export interface WortifyFormProps {
  characters?: WortifyCharacters;
  onSubmit: (props: WortifyCharacters) => void;
}

export const WortifyForm: React.FC<WortifyFormProps> = ({
  onSubmit,
  characters,
}) => {
  const [orangeCharacter, setOrangeCharacter] = React.useState(
    characters?.orangeCharacter ?? ""
  );
  const [otherCharacters, setOtherCharacters] = React.useState(
    characters?.otherCharacters ?? ""
  );

  return (
    <form
      action="POST"
      className="w-full space-y-2"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          orangeCharacter,
          otherCharacters,
        });
      }}
    >
      <div className="grid xs:grid-cols-1 sm:grid-cols-2">
        <FormInput
          label="Orangener Buchstabe"
          value={orangeCharacter}
          onInput={(event) => {
            const sanitizedInput = event.currentTarget.value.toLowerCase();
            setOrangeCharacter(sanitizedInput);
          }}
          name="orangeCharacter"
          pattern="[a-zA-Z]"
          minLength={1}
          maxLength={1}
          inputMode="text"
          required
        />
        <FormInput
          label="Andere Buchstaben"
          value={otherCharacters}
          onInput={(event) => {
            const sanitizedInput = event.currentTarget.value.toLowerCase();
            setOtherCharacters(sanitizedInput);
          }}
          name="otherCharacters"
          minLength={6}
          maxLength={6}
          pattern="[a-zA-Z]{6}"
          inputMode="text"
          required
        />
      </div>

      <Button type="submit">Zeige Lösungen</Button>
    </form>
  );
};
