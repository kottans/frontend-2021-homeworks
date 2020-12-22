import { UserCard } from './user-card-item.js';

export class UserCardList {
    constructor(userService){
        this.userService = userService;

        this.defineElement();
        this.insertElement();
        this.fragment = new DocumentFragment();
    }

    defineElement(){
        this.element = document.createElement('ul');
        this.element.classList.add('user-card-list');
    }

    insertElement(){
        document.querySelector('.user-card-list-wrapper').append(this.element);
    }

    updateUserCards(){
        this.createUserCards();
        this.renderUserCards();
    }

    createUserCards(){
        this.userCards = this.userService.currentPageUsers
            .map(user => new UserCard(user).element);
    }

    renderUserCards(){
        this.element.textContent = '';
        this.fragment.append(...this.userCards);
        this.element.append(this.fragment);
    }
}
