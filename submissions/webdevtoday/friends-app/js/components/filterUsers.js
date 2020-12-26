export function filterUsers(filters, res) {
    let filtersArr = filters.split(';');
    filtersArr = filtersArr.reduce((acc, filter) => {
        if (filter === "") return acc;
        const [k, v] = filter.split(',');
        acc.push({
            name: k,
            value: v,
        });
        return acc;
    }, []);

    const filterMethods = {
        name(users, value) {
            return users.filter(user => {
                if (`${user.name.first} ${user.name.last}`.toLowerCase().indexOf(value.toLowerCase()) !== -1) return true;
                return false;
            });
        },
        age(users, value) {
            return users.filter(user => {
                if (+user.dob.age === +value) return true;
                return false;
            });
        },
        email(users, value) {
            return users.filter(user => {
                if (user.email.toLowerCase().indexOf(value.toLowerCase()) !== -1) return true;
                return false;
            });
        },
        location(users, value) {
            return users.filter(user => {
                if (user.location.city.toLowerCase().indexOf(value.toLowerCase()) !== -1) return true;
                return false;
            });
        },
    };
    filtersArr.forEach(filter => {
        if (filterMethods[filter.name]) {
            res = filterMethods[filter.name](res, filter.value);
        }
    });
    return res;
}
