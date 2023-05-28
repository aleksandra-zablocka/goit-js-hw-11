import { API_PATH, DEFAULT_PARAMS } from './API-config.js';
import Notiflix from 'notiflix';

export default async function pingPixabay({ q = '', page = '1' }) {
  try {
    const queryString = new URLSearchParams({
      ...DEFAULT_PARAMS,
      page,
      q,
    });

    const response = await fetch(`${API_PATH}?${queryString}`);
    if (!response.ok) {
      if (response.status === 400) {
        return [];
      }
      return { error: response.status };
    }

    const { hits: photos } = await response.json();

    if (photos.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    return photos;
  } catch (e) {
    return { error: e.toString() };
  }
}
