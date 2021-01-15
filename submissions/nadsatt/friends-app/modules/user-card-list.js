import { UserCard } from './user-card-item.js';

export class UserCardList {
    constructor(){
        this.element = document.createElement('ul');
        this.element.classList.add('user-card-list');

        this.fragment = new DocumentFragment();
    }

    updateUserCards(users){
        this.createUserCards(users);
        this.renderUserCards();
    }

    createUserCards(users){
        this.userCards = users.map(
            user => new UserCard(user).element);
    }

    renderUserCards(){
        this.element.textContent = '';
        this.fragment.append(...this.userCards);
        this.element.append(this.fragment);
    }
}
