import { SearchFilter, ToggleFilter } from './filter-items.js';

class UserNameSearchFilter extends SearchFilter {
    constructor(userService){
        super('name', userService);
        return this.element;
    }
}

class UserEmailSearchFilter extends SearchFilter {
    constructor(userService){
        super('email', userService);
        return this.element;
    }
}

class UserLocationSearchFilter extends SearchFilter {
    constructor(userService){
        super('location', userService);
        return this.element;
    }
}

class GenderToggleFilter extends ToggleFilter {
    constructor(userService){
        super('female', 'male', 'gender', userService);
        return this.element;
    }
}

export default [
    UserNameSearchFilter,
    UserEmailSearchFilter,
    UserLocationSearchFilter,
    GenderToggleFilter
];
