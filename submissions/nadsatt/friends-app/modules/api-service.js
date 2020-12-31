import { ImageService } from './image-service.js';
import { User } from './user.js';

export class ApiService {
    constructor(){
        this.imageService = new ImageService();
        this.endpoint = 'https://randomuser.me/api/';
        this.page = 1;
        this.propertiesToFetch = ['gender', 'name', 'email', 'dob', 'location', 'registered'];
    }

    async getUsers(usersCount, retries = 3){
        const response = await fetch(`${this.endpoint}?page=${this.page}&results=${usersCount}&inc=${this.propertiesToFetch.join(',')}`);

        if(response.status === 200){
            const json = await response.json();
            let users = json.results.map(user => new User(user));
            let usersWithImages = await this.imageService.loadImages(users);

            return usersWithImages;
        }
        else if(retries > 0){
            return this.getUsers(usersCount, --retries);
        }
        else throw new Error(response);
    }
}
