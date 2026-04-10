export function languageFormat(text: string, language: string) {
  if (typeof text !== 'string') {
    return text;
  }
  try {
    if (language === 'json') {
      return JSON.stringify(JSON.parse(text), null, 2);
    }
  } catch {
    // ignore parse errors; show raw text
  }
  return text;
}
