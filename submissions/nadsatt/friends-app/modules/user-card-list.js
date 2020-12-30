import { UserCard } from './user-card-item.js';

export class UserCardList {
    constructor(userService){
        this.defineElement();
        this.defineElementProperties(userService);
        this.defineElementMethods();

        return this.element;
    }

    defineElement(){
        this.element = document.createElement('ul');
        this.element.classList.add('user-card-list');
    }

    defineElementProperties(userService){
        this.element.userService = userService;
        this.element.fragment = new DocumentFragment();
    }

    defineElementMethods(){
        this.element.updateUserCards = function(){
            this.createUserCards();
            this.renderUserCards();
        };

        this.element.createUserCards = function(){
            this.userCards = this.userService.currentPageUsers
                .map(user => new UserCard(user));
        };

        this.element.renderUserCards = function(){
            this.textContent = '';
            this.fragment.append(...this.userCards);
            this.append(this.fragment);
        };
    }
}
