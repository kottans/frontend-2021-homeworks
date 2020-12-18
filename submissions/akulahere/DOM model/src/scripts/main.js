'use strict';

const galleryList = document.querySelector('.gallery_list');
const bigImage = document.querySelector('.gallery_large-img');
const title = document.querySelector('figcaption');

title.textContent = "Day and night"

galleryList.addEventListener('click', (event) => {
  event.preventDefault();
  bigImage.src = event.target.closest('.list-item_link').href;
  console.log(event.target.closest('.list-item_link').href);
  console.log(event.target.closest('.list-item_link').title);
  title.textContent = event.target.closest('.list-item_link').title;
});
