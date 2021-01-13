import { SearchStateKeeper,
         FilterStateKeeper } from './state-keepers.js';

const category = 'search';

export class UserNameSearchStateKeeper extends SearchStateKeeper {
    constructor(userService){
        const propertyToApplyStateBy = 'name';
        super({propertyToApplyStateBy, category, userService});
    }
}

export class UserEmailSearchStateKeeper extends SearchStateKeeper {
    constructor(userService){
        const propertyToApplyStateBy = 'email';
        super({propertyToApplyStateBy, category, userService});
    }
}

export class UserLocationSearchStateKeeper extends SearchStateKeeper {
    constructor(userService){
        const propertyToApplyStateBy = 'location';
        super({propertyToApplyStateBy, category, userService});
    }
}

export class UserGenderSearchStateKeeper extends FilterStateKeeper {
    constructor(userService){
        const propertyToApplyStateBy = 'gender';
        const states = ['female', 'male'];
        super({states, propertyToApplyStateBy, category, userService});
    }
}
