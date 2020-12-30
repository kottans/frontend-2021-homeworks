export class User {
    constructor(user, frontImage, frontBorderImage, backBorderImage, backImage){
        this.gender = user.gender;
        this.firstName = user.name.first;
        this.lastName = user.name.last;
        this.name = `${user.name.first} ${user.name.last}`;
        this.email = user.email;
        this.age = user.dob.age;
        this.country = user.location.country;
        this.location = `${user.location.country}, ${user.location.city}`;
        this.registration = new Date(user.registered.date).getTime();
        this.formattedRegistration = this.getFormattedDate(new Date(user.registered.date));

        this.frontImage = frontImage;
        this.frontBorderImage = frontBorderImage;
        this.backBorderImage = backBorderImage;
        this.backImage = backImage;
    }

    getFormattedDate(date){
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `0${day}`.slice(-2) + '-' + `0${month}`.slice(-2) + '-' + year;
    }
}
