export const downloadWords = async () => {
  const response = await fetch("https://6mal5.com/wortify/data/words.csv");
  const words = await response.text();
  return words.split("\r\n").map((word) => word.toLowerCase());
};
