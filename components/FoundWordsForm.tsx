import * as React from "react";
import { sanitizeCopiedWords } from "../utils/sanitizeCopiedWords";
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
      className="w-full space-y-2"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(sanitizeCopiedWords(copiedText));
      }}
    >
      <FormTextArea
        label="Hier gefundene Wörter einfügen"
        value={copiedText}
        setValue={(value) => {
          setCopiedText(value);
        }}
        onInput={(event) => {
          setCopiedText(event.currentTarget.value);
        }}
        name="copiedText"
      />

      <Button type="submit">Zeige Gefundene</Button>
      <button
        type="button"
        className="fixed w-12 h-12 bg-green-500 border border-green-700 rounded-full sm:invisible bottom-4 right-4 xs:visible"
        onClick={async () => {
          const text = await navigator.clipboard.readText();
          if (text) {
            setCopiedText(text);
            onSubmit(sanitizeCopiedWords(text));
          }
        }}
      >
        🔎
      </button>
    </form>
  );
};
