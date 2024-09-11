export function capitalizeFirstLetter(word: string) {
  if (!word) return ""; // Handle empty strings
  return word.charAt(0).toUpperCase() + word.slice(1);
}
