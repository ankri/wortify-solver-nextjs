import * as React from "react";
import { Button } from "./forms/Button";
import { FormInput } from "./forms/FormInput";
import { WortifyCharacters } from "./Types";

export interface WortifyFormProps {
  onSubmit: (props: WortifyCharacters) => void;
}

export const WortifyForm: React.FC<WortifyFormProps> = ({ onSubmit }) => {
  const [orangeCharacter, setOrangeCharacter] = React.useState("u");
  const [otherCharacters, setOtherCharacters] = React.useState("fageln");

  return (
    <form
      action="POST"
      className="space-y-2 w-full"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          orangeCharacter,
          otherCharacters,
        });
      }}
    >
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
      <Button type="submit">Zeige Lösungen</Button>
    </form>
  );
};
