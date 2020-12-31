export class User {
    constructor(user){
        this.gender = user.gender;
        this.firstName = user.name.first;
        this.lastName = user.name.last;
        this.name = `${user.name.first} ${user.name.last}`;
        this.email = user.email;
        this.age = user.dob.age;
        this.country = user.location.country;
        this.location = `${user.location.country}, ${user.location.city}`;
        this.date =  new Date(user.registered.date);
        this.registration = this.date.getTime();
        this.formattedRegistration = new Intl.DateTimeFormat(['ban', 'id']).format(this.date);
    }
}
