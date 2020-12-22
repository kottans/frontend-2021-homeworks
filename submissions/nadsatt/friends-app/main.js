import { ImgService } from './modules/img-service.js';
import { ApiService } from './modules/api-service.js';
import { UserService } from './modules/user-service.js';

import { Header } from './modules/header.js';
import { UserCardList } from './modules/user-card-list.js';
import { PageLinkList } from './modules/page-link-list.js';
import { FilterGroup } from './modules/filter-group.js';

class Program {
    constructor(){
        this.imgService = new ImgService();
        this.initPageElement = document.querySelector('.init-page');
    }

    removeInitPage(){
        this.initPageElement.remove();
    }

    loadComponents(){
        this.apiService = new ApiService(this.imgService);
        this.userService = new UserService(this.apiService);

        this.header = new Header();
        this.userCardList = new UserCardList(this.userService);
        this.pageLinkList = new PageLinkList(this.userService, this.userCardList);
        this.filterGroup = new FilterGroup(this.userService, this.pageLinkList);

        return this;
    }

    loadImgs(){
        return this.imgService.loadImgs();
    }


    getUsers(){
        this.userService.getUsers()
            .then(() => {
                this.pageLinkList.performPagination();
                this.removeInitPage();
            })
            .catch(message => {
                this.initPageElement.lastElementChild.remove();
                this.initPageElement.firstElementChild.textContent = message
            });
    }
}

const program = new Program();
program
    .loadComponents()
    .loadImgs()
    .then(() => program.getUsers());
