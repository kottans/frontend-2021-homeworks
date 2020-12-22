import { StringSortFilter, NumberSortFilter } from './filter-items.js';

class UserNameSortFilter extends StringSortFilter {
    constructor(userService){
        super('name', userService);
    }
}

class UserAgeSortFilter extends NumberSortFilter {
    constructor(userService){
        super('age', userService);
    }
}

class LocationSortFilter extends StringSortFilter {
    constructor(userService){
        super('location', userService);
    }
}

class RegistrationSortFilter extends NumberSortFilter {
    constructor(userService){
        super('registration', userService);
    }
}

export default [
    UserNameSortFilter,
    UserAgeSortFilter,
    LocationSortFilter,
    RegistrationSortFilter,
];
