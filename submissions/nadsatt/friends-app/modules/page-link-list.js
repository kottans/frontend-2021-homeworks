import { PageLink, CornerPageLink } from './page-link-items.js';

export class PageLinkList {
    constructor(userService, userCardList){
        this.element = document.createElement('ul');
        this.element.classList.add('page-link-list');
        this.element.addEventListener('click', e => this.handleElementClick(e));

        this.userService = userService;
        this.userCardList = userCardList;
        this.usersPerPage = 10;
        this.maxPageLinksNumber = 5;
        this.fragment = new DocumentFragment();
        this.classNames = {
            cornerPageLink: 'corner-page-link-item',
            middlePageLink: 'page-link-item'
        };
        this.leftPageLinks = ['First', 'Prev'].map(value => new CornerPageLink(value));
        this.rightPageLinks = ['Next', 'Last'].map(value => new CornerPageLink(value));
    }

    handleElementClick({target, target:{textContent: value}}){
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
    }

    isMiddlePageLinkClicked(pageLink){
        return pageLink.classList.contains(this.classNames.middlePageLink);
    }

    isCornerPageLinkClicked(pageLink){
        return pageLink.classList.contains(this.classNames.cornerPageLink);
    }

    performPagination(currentPageNumber = 1){
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
    }

    getUsersNumber(){
        this.usersNumber = this.userService.users.length;
    }

    definePagesNumber(){
        this.pagesNumber = Math.ceil(this.usersNumber/this.usersPerPage);
    }

    validateCurrentPageNumber = function(currentPageNumber){
        if(currentPageNumber < 1) this.currentPageNumber = 1;
        else if (currentPageNumber > this.pagesNumber) this.currentPageNumber = this.pagesNumber;
        else this.currentPageNumber = currentPageNumber;
    }

    defineCurrentPageUsers(){
        let firstUserIndex = (this.currentPageNumber - 1) * this.usersPerPage;
        let lastUserIndex = Math.min(firstUserIndex + this.usersPerPage - 1, this.usersNumber - 1);
        this.currentPageUsers = this.userService.users.slice(firstUserIndex, ++lastUserIndex);
    }

    updateCurrentPageUsers(){
        this.userService.currentPageUsers = this.currentPageUsers;
    }

    defineFirstAndLastMiddlePageLinksNumbers(){
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
    }

    defineMiddlePageLinksNumbers(){
        this.middlePageLinksNumbers = [...Array(++this.lastPageLinkNumber).keys()].slice(this.firstPageLinkNumber);
    }

    defineMiddlePageLinks(){
        this.middlePageLinks = this.middlePageLinksNumbers.map(number => {
            const pageLink = new PageLink(number);
            if(number === this.currentPageNumber) pageLink.select();
            return pageLink;
        });
    }

    updateCornerPageLinks(){
        this.leftPageLinks.concat(this.rightPageLinks)
            .forEach(pageLink => pageLink.enable());
        if(this.currentPageNumber <= 1){
            this.leftPageLinks.forEach(pageLink => pageLink.disable());
        }
        if(this.currentPageNumber === this.pagesNumber){
            this.rightPageLinks.forEach(pageLink => pageLink.disable());
        }
    }

    renderPageLinks(){
        this.element.textContent = '';
        const pageLinks = this.leftPageLinks
            .concat(this.middlePageLinks, this.rightPageLinks)
            .map(pageLink => pageLink.element);

        this.fragment.append(...pageLinks);
        this.element.append(this.fragment);
    }
}
