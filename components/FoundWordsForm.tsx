import * as React from "react";
import { Button } from "./forms/Button";
import { FormTextArea } from "./forms/FormTextarea";
import { Words } from "./Types";

export interface FoundWordsFormProps {
  onSubmit: (foundWords: Words) => void;
}

export const FoundWordsForm: React.FC<FoundWordsFormProps> = ({ onSubmit }) => {
  const [copiedText, setCopiedText] = React.useState("");

  return (
    <form
      className="space-y-2 w-full"
      onSubmit={(event) => {
        event.preventDefault();
        const sanitizedInput = copiedText.split(/^.*\)\s((\w+\s?)*)/gm)[1];
        if (sanitizedInput == null) {
          console.log(sanitizedInput);
          alert("Bitte korrekten Text einfügen");
        } else {
          const foundWords = sanitizedInput.toLowerCase().split(" ");

          onSubmit(foundWords);
        }
      }}
    >
      <FormTextArea
        label="Hier gefundene Wörter einfügen"
        value={copiedText}
        onInput={(event) => {
          setCopiedText(event.currentTarget.value);
        }}
        name="copiedText"
      />

      <Button type="submit">Zeige Gefundene</Button>
    </form>
  );
};
