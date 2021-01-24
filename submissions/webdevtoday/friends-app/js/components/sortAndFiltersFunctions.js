export function sortAndFiltersFunctions(type) {
    function sortByAge(user1, user2) {
        return user1.age - user2.age;
    }
    function sortByName(user1, user2) {
        return user1.fullname.localeCompare(user2.fullname);
    };

    const functions = {
        "age-desc": function ageDesc(user1, user2) {
            return sortByAge(user1, user2);
        },
        "age-asc": function ageAsc(user2, user1) {
            return sortByAge(user1, user2);
        },
        "name-desc": function nameDesc(user1, user2) {
            return sortByName(user1, user2);
        },
        "name-asc": function nameAsc(user2, user1) {
            return sortByName(user1, user2);
        },
        'age': function filterByAge(age) {
            return (user) => +user.age === +age;
        },
        'name': function filterByName(name) {
            return (user) => user.fullname.includes(name);
        },
        'gender': function filterByGender(gender) {
            return (user) => {
                if (gender === 'all') return true;
                return user.gender === gender;
            };
        },
    };

    if (functions.hasOwnProperty(type)) return functions[type];

    return false;
}
