// Simple translation loader - fetch translations from server
export async function loadTranslations(language) {
  const response = await fetch(`/translations/${language}.json`);
  return await response.json();
}
