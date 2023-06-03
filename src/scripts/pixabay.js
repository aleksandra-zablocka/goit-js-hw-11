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
    if (q === '') {
      return [];
    }
    const { hits: photos, totalHits } = await response.json();

    if (page !== '1' && photos.length === 0) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }

    if (photos.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    if (page === '1' && q !== '') {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    return photos;
  } catch (e) {
    return { error: e.toString() };
  }
}


// import axios from 'axios';
// import { API_PATH, DEFAULT_PARAMS } from './API-config.js';
// import Notiflix from 'notiflix';

// export default async function pingPixabay({ q = '', page = '1' }) {
//   try {
//     const queryString = new URLSearchParams({
//       ...DEFAULT_PARAMS,
//       page,
//       q,
//     }).toString();

//     const response = await axios.get(`${API_PATH}?${queryString}`);
//     if (response.status !== 200) {
//       if (response.status === 400) {
//         return [];
//       }
//       return { error: response.status };
//     }
//     if (q === '') {
//       return [];
//     }
//     const { hits: photos, totalHits } = response.data;

//     if (page !== '1' && photos.length === 0) {
//       Notiflix.Notify.failure(
//         "We're sorry, but you've reached the end of search results."
//       );
//       return;
//     }

//     if (photos.length === 0) {
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       return;
//     }

//     if (page === '1' && q !== '') {
//       Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
//     }

//     return photos;
//   } catch (e) {
//     return { error: e.toString() };
//   }
// }