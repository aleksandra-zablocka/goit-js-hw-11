import { API_PATH, DEFAULT_PARAMS } from './API-config.js';

export default async function pingPixabay({ q = '', page = '1' }) {
  try {
    const queryString = new URLSearchParams({ 
      ...DEFAULT_PARAMS, page, q });

    const response = await fetch(`${API_PATH}?${queryString}`);
    if (!response.ok) {
      if (response.status === 400) {
        return [];
      }
      return { error: response.status };
    }

    const { hits: photos } = await response.json();
    return photos;
  } catch (e) {
    return { error: e.toString() };
  }
}
