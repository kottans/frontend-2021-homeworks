export class UserService {
    constructor(apiService){
        this.apiService = apiService;
        this.originalUsers;
        this.users;
        this.currentPageUsers;
    }

    get users(){
        return this._users;
    }
    set users(value){
        this._users = value;
    }

    async getUsers(usersCount){
        this._originalUsers = await this.apiService.getUsers(usersCount);
        this._users = [...this._originalUsers];
    }

    resetUsers(){
        this._users = [...this._originalUsers];
    }
}
