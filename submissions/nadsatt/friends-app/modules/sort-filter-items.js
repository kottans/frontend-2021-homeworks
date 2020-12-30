import { StringSortFilter, NumberSortFilter } from './filter-items.js';

class UserNameSortFilter extends StringSortFilter {
    constructor(userService){
        super('name', userService);
        return this.element;
    }
}

class UserAgeSortFilter extends NumberSortFilter {
    constructor(userService){
        super('age', userService);
        return this.element;
    }
}

class LocationSortFilter extends StringSortFilter {
    constructor(userService){
        super('location', userService);
        return this.element;
    }
}

class RegistrationSortFilter extends NumberSortFilter {
    constructor(userService){
        super('registration', userService);
        return this.element;
    }
}

export default [
    UserNameSortFilter,
    UserAgeSortFilter,
    LocationSortFilter,
    RegistrationSortFilter,
];
