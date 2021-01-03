import { ApiService } from './modules/api-service.js';
import { UserService } from './modules/user-service.js';

import { LoadingPage } from './modules/loading-page.js';
import { Header } from './modules/header.js';
import { UserCardList } from './modules/user-card-list.js';
import { PageLinkList } from './modules/page-link-list.js';
import { FilterGroup } from './modules/filter-group.js';

class Program {
    constructor(){
        this.defineServices();
        this.defineComponents();
    }

    defineServices(){
        this.apiService = new ApiService();
        this.userService = new UserService(this.apiService);
    }

    defineComponents(){
        this.loadingPage = new LoadingPage(this);
        document.body
            .append(this.loadingPage.element);

        this.header = new Header();
        document.body.querySelector('.header-wrapper')
            .append(this.header.element);

        this.userCardList = new UserCardList(this.userService);
        document.body.querySelector('.user-card-list-wrapper')
            .append(this.userCardList.element);

        this.pageLinkList = new PageLinkList(this.userService, this.userCardList);
        document.body.querySelector('.page-link-list-wrapper')
            .append(this.pageLinkList.element);

        this.filterGroup = new FilterGroup(this.userService, this.pageLinkList);
        document.body.querySelector('.filter-group-wrapper')
            .append(this.filterGroup.element);
    }

    getUsers(usersCount = 100){
        this.userService.getUsers(usersCount)
            .then(() => {
                this.pageLinkList.performPagination();
                this.loadingPage.remove();
            })
            .catch((e) => {
                this.loadingPage.displayLoadingError(e.message);
            });
    }
}

new Program().getUsers(150);
