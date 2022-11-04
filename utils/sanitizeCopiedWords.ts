export function sanitizeCopiedWords(copiedText: string): string[] {
  const sanitizedInput = copiedText.split(/^.*\)\s((\w+\s?)*)/gm)[1];
  if (sanitizedInput == null) {
    alert("Bitte korrekten Text einfügen");
    return [];
  } else {
    return sanitizedInput.toLowerCase().split(" ");
  }
}
