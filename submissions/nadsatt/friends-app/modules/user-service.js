export class UserService {
    constructor(apiService){
        this.apiService = apiService;
    }

    get users(){
        return this._users;
    }
    set users(value){
        this._users = value;
    }

    get currentPageUsers(){
        return this._currentPageUsers;
    }
    set currentPageUsers(value){
        this._currentPageUsers = value;
    }

    async fetchUsers(usersCount){
        this.originalUsers = await this.apiService.getUsers(usersCount);
        this.users = [...this.originalUsers];
    }

    resetUsers(){
        this.users = [...this.originalUsers];
    }
}
