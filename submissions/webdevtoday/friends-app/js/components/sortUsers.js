export function sortUsers(sort, res) {
    switch (sort) {
        case 'age,a-z':
            res.sort((u1, u2) => {
                return u1.dob.age - u2.dob.age;
            });
            break;

        case 'age,z-a':
            res.sort((u1, u2) => {
                return u2.dob.age - u1.dob.age;
            });
            break;

        case 'name,a-z':
            res.sort((u1, u2) => {
                return u1.name.first.localeCompare(u2.name.first);
            });
            break;

        case 'name,z-a':
            res.sort((u1, u2) => {
                return u2.name.first.localeCompare(u1.name.first);
            });
            break;

        case 'registered,a-z':
            res.sort((u1, u2) => {
                return new Date(u1.registered.date) - new Date(u2.registered.date);
            });
            break;

        case 'registered,z-a':
            res.sort((u1, u2) => {
                return new Date(u2.registered.date) - new Date(u1.registered.date);
            });
            break;
    }
}
