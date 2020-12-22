export class UserService {
    constructor(apiService){
        this.apiService = apiService;

        this.originalUsers;
        this.users;
        this.currentPageUsers;
    }

    async getUsers(){
        this.originalUsers = await this.apiService.getUsers();
        this.users = [...this.originalUsers];
    }

    resetUsers(){
        this.users = [...this.originalUsers];
    }
}
