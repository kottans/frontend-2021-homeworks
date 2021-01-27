export function normalizeUsers(user) {
    return {
        fullname: `${user.name.first} ${user.name.last}`,
        imgpath: user.picture.large,
        age: user.dob.age,
        email: user.email,
        phone: user.phone,
        city: user.location.city,
        registered: user.registered.date,
        gender: user.gender,
    };
}
