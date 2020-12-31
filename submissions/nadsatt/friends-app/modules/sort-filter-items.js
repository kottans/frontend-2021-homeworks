import { StringSortFilter, NumberSortFilter } from './filter-items.js';

class UserNameSortFilter extends StringSortFilter {
    constructor(category, userService){
        const property = 'name';
        super(property, category, userService);
        return this.element;
    }
}

class UserAgeSortFilter extends NumberSortFilter {
    constructor(category, userService){
        const property = 'age';
        super(property, category, userService);
        return this.element;
    }
}

class LocationSortFilter extends StringSortFilter {
    constructor(category, userService){
        const property = 'location';
        super(property, category, userService);
        return this.element;
    }
}

class RegistrationSortFilter extends NumberSortFilter {
    constructor(category, userService){
        const property = 'registration';
        super(property, category, userService);
        return this.element;
    }
}

export default [
    UserNameSortFilter,
    UserAgeSortFilter,
    LocationSortFilter,
    RegistrationSortFilter,
];
