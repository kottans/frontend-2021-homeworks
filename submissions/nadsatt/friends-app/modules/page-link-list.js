import { PageLink, CornerPageLink } from './page-link-items.js';

export class PageLinkList {
    constructor(userService, userCardList){
        this.userService = userService;
        this.userCardList = userCardList;
        this.fragment = new DocumentFragment();

        this.usersPerPage = 10;
        this.maxPageLinksNumber = 5;

        this.defineCornerPageLinks();
        this.defineElement();
        this.insertElement();
        this.defineElementClickHandler();
    }

    defineCornerPageLinks(){
        this.leftPageLinks = ['First', 'Prev'].map(value => new CornerPageLink(value).element);
        this.rightPageLinks = ['Next', 'Last'].map(value => new CornerPageLink(value).element);
    }

    defineElement(){
        this.element = document.createElement('ul');
        this.element.classList.add('page-link-list');
    }

    insertElement(){
        document.querySelector('.page-link-list-wrapper').append(this.element);
    }

    defineElementClickHandler(){
        this.element.onclick = ({target, target:{textContent: value}}) => {
            if(this.checkIfMiddlePageLinkClicked(target)){
                let currentPageNumber = +value;
                this.performPagination(currentPageNumber);
            }
            else if(this.checkIfCornerPageLinkClicked(target)){
                let currentPageNumber = value === 'First' ? 1 :
                                        value === 'Prev' ? --this.currentPageNumber :
                                        value === 'Next' ? ++this.currentPageNumber :
                                        this.pagesNumber;
                this.performPagination(currentPageNumber);
            }
        }
    }

    checkIfMiddlePageLinkClicked(target){
        return target.classList.contains('page-link-item');
    }

    checkIfCornerPageLinkClicked(target){
        return target.classList.contains('corner-page-link-item');
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

    validateCurrentPageNumber(currentPageNumber){
        this.currentPageNumber =
            (currentPageNumber < 1) ? 1 :
            (currentPageNumber > this.pagesNumber) ? this.pagesNumber :
            currentPageNumber;
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
            const pageLink = new PageLink(number).element;
            if(number === this.currentPageNumber) pageLink.classList.add('page-link-item--current');
            return pageLink;
        });
    }

    updateCornerPageLinks(){
        this.leftPageLinks.concat(this.rightPageLinks)
            .forEach(pageLink => pageLink.instance.enable());

        if(this.currentPageNumber === 1 || this.currentPageNumber === 0){
            this.leftPageLinks.forEach(pageLink => pageLink.instance.disable());
        }
        if(this.currentPageNumber === this.pagesNumber){
            this.rightPageLinks.forEach(pageLink => pageLink.instance.disable());
        }
    }

    renderPageLinks(){
        this.element.textContent = '';
        this.fragment.append(...this.leftPageLinks.concat(this.middlePageLinks, this.rightPageLinks));
        this.element.append(this.fragment);
    }
}
