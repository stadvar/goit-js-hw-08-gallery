import galerry from './gallery-items.js';
//
// Gallery Markup
let i = 0; // label for each <a> element
const ElemArr = galerry.map(({ preview, original, description }) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const img = document.createElement('img');

  img.classList.add('gallery__image');
  img.src = preview;
  img.alt = description;

  a.classList.add('gallery__link');
  a.href = original;
  a.title = description;
  a.setAttribute('data-num', i);

  li.classList.add('gallery__item');

  a.append(img);
  li.append(a);
  i += 1;
  return li;
});

const galleryList = document.querySelector('.js-gallery');
galleryList.append(...ElemArr);
//variables
const lightboxImg = document.querySelector('.lightbox__image');
const lightboxWrap = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const backdrop = document.querySelector('.lightbox__content');

//open modal
galleryList.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.tagName === 'UL') return;
  const currentLink = e.target.closest('a');
  lightboxImg.src = currentLink.href;
  lightboxImg.dataset.num = currentLink.dataset.num;
  lightboxImg.alt = currentLink.title;
  lightboxWrap.classList.add('is-open');
  window.addEventListener('keydown', onEscPress);
  window.addEventListener('keydown', onArrowsPress);
});

//close modal
closeModalBtn.addEventListener('click', onCloseModal);
backdrop.addEventListener('click', onBackdropClick);

// close modal function
function onCloseModal() {
  lightboxWrap.classList.remove('is-open');
  lightboxWrap.addEventListener('transitionend', function handler() {
    lightboxImg.src = '#';
    lightboxImg.dataset.num = '-1';
    lightboxImg.alt = '#';
    lightboxWrap.removeEventListener('transitionend', handler);
  });
  window.removeEventListener('keydown', onEscPress);
  window.removeEventListener('keydown', onArrowsPress);
}
//close modal by click to backdrop
function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}
// close modal by Escape
function onEscPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}
//Arrow Press function
function onArrowsPress(e) {
  if (e.code !== 'ArrowRight' && e.code !== 'ArrowLeft') return;
  const lightboxImgNum = Number(lightboxImg.dataset.num);

  let index; //element index in ElemArr
  switch (e.code) {
    case 'ArrowRight':
      index = lightboxImgNum + 1 > ElemArr.length - 1 ? 0 : lightboxImgNum + 1;
      break;
    case 'ArrowLeft':
      index = lightboxImgNum - 1 < 0 ? ElemArr.length - 1 : lightboxImgNum - 1;
      break;
  }
  const linkElem = ElemArr[index].children[0];

  lightboxImg.src = linkElem.href;
  lightboxImg.dataset.num = linkElem.dataset.num;
  lightboxImg.alt = linkElem.title;
}
