import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const options = {};
const lightbox = new SimpleLightbox('.gallery a', options);

import pingPixabay from './pixabay.js';

function drawPhotos({ photos, page }) {
  const photoContainer = document.querySelector('.gallery');
  if (page === '1') {
    photoContainer.innerHTML = '';
  }

  const gallery = photos.map(photo => {
    const container = document.createElement('a');
    container.classList.add('photo-card');
    container.href = photo.largeImageURL;

    const img = document.createElement('img');
    img.classList.add('photo');
    img.classList.add('lightbox');
    img.src = photo.webformatURL;
    img.alt = photo.tags;
    img.setAttribute('loading', 'lazy');
    container.appendChild(img);

    const figCaption = document.createElement('div');
    figCaption.classList.add('info');
    container.appendChild(figCaption);

    const likes = document.createElement('p');
    likes.classList.add('info-item');
    likes.innerHTML = `<b>Likes</b><p>${photo.likes}</p>`;
    figCaption.appendChild(likes);

    const views = document.createElement('p');
    views.classList.add('info-item');
    views.innerHTML = `<b>Views</b><p>${photo.views}</p>`;
    figCaption.appendChild(views);

    const comments = document.createElement('p');
    comments.classList.add('info-item');
    comments.innerHTML = `<b>Comments</b><p>${photo.comments}</p>`;
    figCaption.appendChild(comments);

    const downloads = document.createElement('p');
    downloads.classList.add('info-item');
    downloads.innerHTML = `<b>Downloads</b><p>${photo.downloads}</p>`;
    figCaption.appendChild(downloads);

    return container;
  });

  photoContainer.append(...gallery);

  lightbox.refresh();
}

export async function loadPhotos({ q, page }) {
  const photos = await pingPixabay({ q, page });
  if (photos.error) {
    alert(photos.error);
    return;
  }
  drawPhotos({ photos, page });
  return;
}
