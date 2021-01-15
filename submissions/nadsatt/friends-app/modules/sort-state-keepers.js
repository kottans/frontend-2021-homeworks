import { StringSortStateKeeper,
         NumberSortStateKeeper } from './state-keepers.js';

const category = 'sort';

export class UserNameSortStateKeeper extends StringSortStateKeeper {
    constructor(userService){
        const propertyToApplyStateBy = 'name';
        super({propertyToApplyStateBy, category, userService});
    }
}

export class UserLocationSortStateKeeper extends StringSortStateKeeper {
    constructor(userService){
        const propertyToApplyStateBy = 'location';
        super({propertyToApplyStateBy, category, userService});
    }
}

export class UserAgeSortStateKeeper extends NumberSortStateKeeper {
    constructor(userService){
        const propertyToApplyStateBy = 'age';
        super({propertyToApplyStateBy, category, userService});
    }
}

export class UserRegistrationSortStateKeeper extends NumberSortStateKeeper {
    constructor(userService){
        const propertyToApplyStateBy = 'registration';
        super({propertyToApplyStateBy, category, userService});
    }
}
