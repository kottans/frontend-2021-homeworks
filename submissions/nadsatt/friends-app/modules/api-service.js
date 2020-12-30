import { User } from './user.js';

export class ApiService {
    constructor(imageService){
        this.imageService = imageService;
        this.endpoint = 'https://randomuser.me/api/';
        this.page = 1;
        this.manResults = 40;
        this.womanResults = 60;
        this.inc = ['gender', 'name', 'email', 'dob', 'location', 'registered'];
    }

    async getUsers(retries = 3){
        let malesResponse = await fetch(`${this.endpoint}?gender=male&page=${this.page}&results=${this.manResults}&inc=${this.inc.join(',')}`);
        let femalesResponse = await fetch(`${this.endpoint}?gender=female&page=${this.page}&results=${this.womanResults}&inc=${this.inc.join(',')}`);

        if(malesResponse.status === 200 && femalesResponse.status === 200){
            const males = await malesResponse.json();
            const females = await femalesResponse.json();
            return this.createUsers(...females.results, ...males.results);
        }
        else if(retries > 0){
            return this.getUsers(--retries);
        }
        else throw new Error();
    }

    createUsers(...users){
        return users.map((user, i) =>
            new User(user, this.imageService.frontImages[i],
                     this.imageService.frontBorderImages[i],
                     this.imageService.backBorderImages[i],
                     this.imageService.backImages[i])
        );
    }
}
