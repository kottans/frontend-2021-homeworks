export class UserService {
    constructor(apiService){
        this.apiService = apiService;

        this.originalUsers;
        this.users;
        this.currentPageUsers;
    }

    async getUsers(usersCount){
        this.originalUsers = await this.apiService.getUsers(usersCount);
        this.users = [...this.originalUsers];
    }

    resetUsers(){
        this.users = [...this.originalUsers];
    }
}
