import { SearchFilter, ToggleFilter } from './filter-items.js';

export class UserNameSearchFilter extends SearchFilter {
    constructor(category, userService){
        const property = 'name';
        super(property, category, userService);
        return this.element;
    }
}

export class UserEmailSearchFilter extends SearchFilter {
    constructor(category, userService){
        const property = 'email';
        super(property, category, userService);
        return this.element;
    }
}

export class UserLocationSearchFilter extends SearchFilter {
    constructor(category, userService){
        const property = 'location';
        super(property, category, userService);
        return this.element;
    }
}

export class UserGenderToggleFilter extends ToggleFilter {
    constructor(category, userService){
        const firstState = 'female';
        const secondState = 'male';
        const property = 'gender';
        super(firstState, secondState, property, category, userService);
        return this.element;
    }
}
