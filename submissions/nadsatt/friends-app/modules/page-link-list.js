import { PageLink, CornerPageLink } from './page-link-items.js';

export class PageLinkList {
    constructor(userService, userCardList){
        this.defineElement();
        this.defineElementProperties(userService, userCardList);
        this.defineElementMethods();

        return this.element;
    }

    defineElement(){
        this.element = document.createElement('ul');
        this.element.classList.add('page-link-list');
    }

    defineElementProperties(userService, userCardList){
        this.element.userService = userService;
        this.element.userCardList = userCardList;

        this.element.usersPerPage = 10;
        this.element.maxPageLinksNumber = 5;
        this.element.fragment = new DocumentFragment();

        this.element.leftPageLinks = ['First', 'Prev'].map(value => new CornerPageLink(value));
        this.element.rightPageLinks = ['Next', 'Last'].map(value => new CornerPageLink(value));
    }

    defineElementMethods(){
        this.element.onclick = function({target, target:{textContent: value}}){
            if(this.isMiddlePageLinkClicked(target)){
                let currentPageNumber = +value;
                this.performPagination(currentPageNumber);
            }
            else if(this.isCornerPageLinkClicked(target)){
                let currentPageNumber;

                if(value === 'First') currentPageNumber = 1;
                else if(value === 'Prev') currentPageNumber = --this.currentPageNumber;
                else if(value === 'Next') currentPageNumber = ++this.currentPageNumber;
                else currentPageNumber = this.pagesNumber;

                this.performPagination(currentPageNumber);
            }
        };

        this.element.isMiddlePageLinkClicked = function(target){
            return target.classList.contains('page-link-item');
        };

        this.element.isCornerPageLinkClicked = function(target){
            return target.classList.contains('corner-page-link-item');
        };

        this.element.performPagination = function(currentPageNumber = 1){
            this.getUsersNumber();
            this.definePagesNumber();

            this.validateCurrentPageNumber(currentPageNumber);
            this.defineCurrentPageUsers();
            this.updateCurrentPageUsers();
            this.userCardList.updateUserCards();

            this.defineFirstAndLastMiddlePageLinksNumbers();
            this.defineMiddlePageLinksNumbers();

            this.defineMiddlePageLinks();
            this.updateCornerPageLinks();
            this.renderPageLinks();
        };

        this.element.getUsersNumber = function(){
            this.usersNumber = this.userService.users.length;
        };

        this.element.definePagesNumber = function(){
            this.pagesNumber = Math.ceil(this.usersNumber/this.usersPerPage);
        };

        this.element.validateCurrentPageNumber = function(currentPageNumber){
            if(currentPageNumber < 1) this.currentPageNumber = 1;
            else if (currentPageNumber > this.pagesNumber) this.currentPageNumber = this.pagesNumber;
            else this.currentPageNumber = currentPageNumber;
        };

        this.element.defineCurrentPageUsers = function(){
            let firstUserIndex = (this.currentPageNumber - 1) * this.usersPerPage;
            let lastUserIndex = Math.min(firstUserIndex + this.usersPerPage - 1, this.usersNumber - 1);

            this.currentPageUsers = this.userService.users.slice(firstUserIndex, ++lastUserIndex);
        };

        this.element.updateCurrentPageUsers = function(){
            this.userService.currentPageUsers = this.currentPageUsers;
        };

        this.element.defineFirstAndLastMiddlePageLinksNumbers = function(){
            if (this.pagesNumber <= this.maxPageLinksNumber) {
                this.firstPageLinkNumber = 1;
                this.lastPageLinkNumber = this.pagesNumber;
            } else {
                let maxPageLinksBeforeCurrentPageLink = Math.floor(this.maxPageLinksNumber / 2);
                let maxPageLinksAfterCurrentPageLink = Math.ceil(this.maxPageLinksNumber / 2) - 1;
                if (this.currentPageNumber <= maxPageLinksBeforeCurrentPageLink) {
                    // current pageLink near the start of middle pageLinks
                    this.firstPageLinkNumber = 1;
                    this.lastPageLinkNumber = this.maxPageLinksNumber;
                } else if (this.currentPageNumber + maxPageLinksAfterCurrentPageLink >= this.pagesNumber) {
                    // current pageLink near the end of middle pageLinks
                    this.firstPageLinkNumber = this.pagesNumber - this.maxPageLinksNumber + 1;
                    this.lastPageLinkNumber = this.pagesNumber;
                } else {
                    // current pageLink somewhere in the middle pageLinks
                    this.firstPageLinkNumber = this.currentPageNumber - maxPageLinksBeforeCurrentPageLink;
                    this.lastPageLinkNumber = this.currentPageNumber + maxPageLinksAfterCurrentPageLink;
                }
            }
        };

        this.element.defineMiddlePageLinksNumbers = function(){
            this.middlePageLinksNumbers = [...Array(++this.lastPageLinkNumber).keys()].slice(this.firstPageLinkNumber);
        };

        this.element.defineMiddlePageLinks = function(){
            this.middlePageLinks = this.middlePageLinksNumbers.map(number => {
                const pageLink = new PageLink(number);
                if(number === this.currentPageNumber) pageLink.classList.add('page-link-item--current');
                return pageLink;
            });
        };

        this.element.updateCornerPageLinks = function(){
            this.leftPageLinks.concat(this.rightPageLinks)
                .forEach(pageLink => pageLink.enable());

            if(this.currentPageNumber === 1 || this.currentPageNumber === 0){
                this.leftPageLinks.forEach(pageLink => pageLink.disable());
            }
            if(this.currentPageNumber === this.pagesNumber){
                this.rightPageLinks.forEach(pageLink => pageLink.disable());
            }
        };

        this.element.renderPageLinks = function(){
            this.textContent = '';
            this.fragment.append(...this.leftPageLinks.concat(this.middlePageLinks, this.rightPageLinks));
            this.append(this.fragment);
        };
    }
}
