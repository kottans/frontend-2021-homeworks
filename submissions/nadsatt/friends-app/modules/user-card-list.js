import { UserCard } from './user-card-item.js';

export class UserCardList {
    constructor(userService){
        this.element = document.createElement('ul');
        this.element.classList.add('user-card-list');

        this.userService = userService;
        this.fragment = new DocumentFragment();
    }

    updateUserCards = function(){
        this.createUserCards();
        this.renderUserCards();
    }

    createUserCards = function(){
        this.userCards = this.userService.currentPageUsers
            .map(user => new UserCard(user).element);
    }

    renderUserCards = function(){
        this.element.textContent = '';
        this.fragment.append(...this.userCards);
        this.element.append(this.fragment);
    }
}
