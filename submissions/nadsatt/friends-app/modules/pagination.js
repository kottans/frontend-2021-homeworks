class PaginationItem {
    constructor(value, className ='pagination-item'){
        const innerElement = document.createElement('a');
        innerElement.setAttribute('href', '#');
        innerElement.classList.add('pagination-link');
        innerElement.textContent = value;
        this.element = document.createElement('li');
        this.element.classList.add(className);
        this.element.append(innerElement);

        this.selectedPaginationItemClass = 'pagination-item--selected';
    }

    select(){
        this.element.classList.add(this.selectedPaginationItemClass);
    }
}

class CornerPaginationItem extends PaginationItem {
    constructor(value){
        const className = 'corner-pagination-item';
        super(value, className);
        this.disabledCornerPaginationItemClass = 'corner-pagination-item--disabled';
    }

    enable(){
        this.element.classList.remove(this.disabledCornerPaginationItemClass);
    }

    disable(){
        this.element.classList.add(this.disabledCornerPaginationItemClass);
    }
}

export class Pagination {
    constructor(userService, userCardList){
        this.element = document.createElement('ul');
        this.element.classList.add('pagination-list');
        this.element.addEventListener('click',
            e => this.handleElementClick(e));

        this.userService = userService;
        this.userCardList = userCardList;
        this.usersPerPage = 10;
        this.maxPaginationItems = 5;
        this.fragment = new DocumentFragment();
        this.classNames = {
            cornerPaginationItem: 'corner-pagination-item',
            middlePaginationItem: 'pagination-item'
        };
        this.leftPaginationItems = ['First', 'Prev']
            .map(value => new CornerPaginationItem(value));
        this.rightPaginationItems = ['Next', 'Last']
            .map(value => new CornerPaginationItem(value));
    }

    handleElementClick({target, target:{textContent: value}}){
        let currentPage;

        if(this.isMiddlePaginationItem(target)){
            currentPage = +value;
            this.performPagination(currentPage);
        }
        else if(this.isCornerPaginationItem(target)){
            if(value === 'First'){
                currentPage = 1;
            }
            else if(value === 'Prev'){
                currentPage = --this.currentPage;
            }
            else if(value === 'Next'){
                currentPage = ++this.currentPage;
            }
            else {
                currentPage = this.pagesCount;
            }

            this.performPagination(currentPage);
        }
    }

    isMiddlePaginationItem(paginationItem){
        return paginationItem.classList.contains(
            this.classNames.middlePaginationItem);
    }

    isCornerPaginationItem(paginationItem){
        return paginationItem.classList.contains(
            this.classNames.cornerPaginationItem);
    }

    performPagination(currentPage = 1){
        this.getUsersCount();
        this.definePagesCount();
        this.validateCurrentPage(currentPage);
        this.defineCurrentPageUsers();
        this.updateCurrentPageUsers();
        this.userCardList.updateUserCards();
        this.defineFirstAndLastMiddlePaginationItem();
        this.defineMiddlePages();
        this.defineMiddlePaginationItems();
        this.updateCornerPaginationItems();
        this.renderPaginationItems();
    }

    getUsersCount(){
        this.usersCount = this.userService.users.length;
    }

    definePagesCount(){
        this.pagesCount = Math.ceil(this.usersCount/this.usersPerPage);
    }

    validateCurrentPage(currentPage){
        if(currentPage < 1){
            this.currentPage = 1;
        }
        else if(currentPage > this.pagesCount){
            this.currentPage = this.pagesCount;
        }
        else {
            this.currentPage = currentPage;
        }
    }

    defineCurrentPageUsers(){
        let firstUserIndex = (this.currentPage - 1) * this.usersPerPage;
        let lastUserIndex = Math.min(firstUserIndex +
            this.usersPerPage - 1, this.usersCount - 1);

        this.currentPageUsers = this.userService.users.slice(
            firstUserIndex, ++lastUserIndex);
    }

    updateCurrentPageUsers(){
        this.userService.currentPageUsers = this.currentPageUsers;
    }

    defineFirstAndLastMiddlePaginationItem(){
        if(this.pagesCount <= this.maxPaginationItems){
            this.firstPage = 1;
            this.lastPage = this.pagesCount;
        }
        else {
            let maxPaginationItemsBeforeCurrentPaginationItem = Math
                .floor(this.maxPaginationItems / 2);
            let maxPaginationItemsAfterCurrentPaginationItem = Math
                .ceil(this.maxPaginationItems / 2) - 1;

            if(this.currentPage <= maxPaginationItemsBeforeCurrentPaginationItem){
                // current paginationItem near the start of middle paginationItems
                this.firstPage = 1;
                this.lastPage = this.maxPaginationItems;
            }
            else if(this.currentPage + maxPaginationItemsAfterCurrentPaginationItem >= this.pagesCount){
                // current paginationItem near the end of middle paginationItems
                this.firstPage = this.pagesCount - this.maxPaginationItems + 1;
                this.lastPage = this.pagesCount;
            }
            else {
                // current paginationItem somewhere in the middle paginationItems
                this.firstPage = this.currentPage - maxPaginationItemsBeforeCurrentPaginationItem;
                this.lastPage = this.currentPage + maxPaginationItemsAfterCurrentPaginationItem;
            }
        }
    }

    defineMiddlePages(){
        this.middlePages = [...Array(++this.lastPage).keys()].slice(this.firstPage);
    }

    defineMiddlePaginationItems(){
        this.middlePaginationItems = this.middlePages
            .map(number => {
                const paginationItem = new PaginationItem(number);

                if(number === this.currentPage){
                    paginationItem.select();
                }

                return paginationItem;
            });
    }

    updateCornerPaginationItems(){
        this.leftPaginationItems
            .concat(this.rightPaginationItems)
            .forEach(paginationItem => paginationItem.enable());

        if(this.currentPage <= 1){
            this.leftPaginationItems
                .forEach(paginationItem => paginationItem.disable());
        }
        if(this.currentPage === this.pagesCount){
            this.rightPaginationItems
                .forEach(paginationItem => paginationItem.disable());
        }
    }

    renderPaginationItems(){
        this.element.textContent = '';
        const paginationItems = this.leftPaginationItems
            .concat(this.middlePaginationItems, this.rightPaginationItems)
            .map(paginationItem => paginationItem.element);

        this.fragment.append(...paginationItems);
        this.element.append(this.fragment);
    }
}
