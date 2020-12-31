import { StringSortFilter, NumberSortFilter } from './filter-items.js';

export class UserNameSortFilter extends StringSortFilter {
    constructor(category, userService){
        const property = 'name';
        super(property, category, userService);
        return this.element;
    }
}

export class UserAgeSortFilter extends NumberSortFilter {
    constructor(category, userService){
        const property = 'age';
        super(property, category, userService);
        return this.element;
    }
}

export class UserLocationSortFilter extends StringSortFilter {
    constructor(category, userService){
        const property = 'location';
        super(property, category, userService);
        return this.element;
    }
}

export class UserRegistrationSortFilter extends NumberSortFilter {
    constructor(category, userService){
        const property = 'registration';
        super(property, category, userService);
        return this.element;
    }
}
