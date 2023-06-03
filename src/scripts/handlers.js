import { loadPhotos } from './ui.js';
let scrolling = false;

export async function searchForPhotos(e) {
  e.preventDefault();
  e.target.page.value = '1';
  const q = e.target.q.value;
  await loadPhotos({ q, page: '1' });
}

export async function scrollHandler() {
  if (scrolling) {
    return
  }
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight) {
    const searchForm = document.querySelector('#searchPhotosForm');
    const page = parseInt(searchForm.page.value);
    searchForm.page.value = page + 1;

    scrolling = true;

    await loadPhotos({ q: searchForm.q.value, page: searchForm.page.value });
    scrolling = false;

    setTimeout(() => {
      scrolling = false;
    }, 1000)
  }
}
