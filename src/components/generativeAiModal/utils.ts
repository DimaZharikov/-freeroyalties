import { GenerativeAiState } from './generativeAiModal';

export const FORM_STORAGE_KEY = 'generativeAiConfig';

export const saveGenerativeItem = (item: GenerativeAiState): void => {
  const currentSearches = localStorage.getItem(FORM_STORAGE_KEY);

  if (currentSearches) {
    const searches = JSON.parse(currentSearches) as GenerativeAiState[];
    localStorage.setItem(
      FORM_STORAGE_KEY,
      JSON.stringify(searches.concat(item)),
    );
  } else {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify([item]));
  }
};

export const getGenerativeItems = (): GenerativeAiState[] | null => {
  const savedItems = localStorage.getItem(FORM_STORAGE_KEY);
  return savedItems
    ? (JSON.parse(savedItems) as GenerativeAiState[] | null)
    : null;
};
