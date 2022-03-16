export function highlight(source: string, query: string) {
  const re = new RegExp(query, "gi");
  const result = source.replace(re, (match) => `<mark>${match}</mark>`);
  return result;
}
