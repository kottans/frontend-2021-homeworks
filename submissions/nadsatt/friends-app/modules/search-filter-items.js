import { SearchFilter, ToggleFilter } from './filter-items.js';

class UserNameSearchFilter extends SearchFilter {
    constructor(userService){
        super('name', userService);
    }
}

class UserEmailSearchFilter extends SearchFilter {
    constructor(userService){
        super('email', userService);
    }
}

class UserLocationSearchFilter extends SearchFilter {
    constructor(userService){
        super('location', userService);
    }
}

class GenderToggleFilter extends ToggleFilter {
    constructor(userService){
        super('female', 'male', 'gender', userService);
    }
}

export default [
    UserNameSearchFilter,
    UserEmailSearchFilter,
    UserLocationSearchFilter,
    GenderToggleFilter
];
