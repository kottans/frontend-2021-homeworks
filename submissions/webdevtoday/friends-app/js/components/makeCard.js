import {formatDate} from './formatDate.js';

export function makeCard({fullname, imgpath, age, email, phone, city, registered, gender}) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card__container">
            <div class="card__title card__title--${gender}">
                <h3 class="text-overflow">${fullname}</h3>
            </div>
            <div class="card__img">
                <img src="${imgpath}" alt="${fullname}">
            </div>
            <div class="card__info">
                <div class="card__age card__info--field">I have ${age} years old.</div>
                <div class="card__email card__info--field text-overflow" title="${email}</div>
                <div class="card__phone card__info--field">${phone}</div>
                <div class="card__city card__info--field">${city}</div>
                <div class="card__registered card__info--field">${formatDate(registered)}</div>
                <div class="card__gender card__info--field">${gender}</div>
            </div>
        </div>
    `;
    return card;
}
