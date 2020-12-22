export class User {
    constructor(user,imgElement, frontBorderImgElement, backBorderImgElement, backImgElement){
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

        this.imgElement = imgElement;
        this.frontBorderImgElement = frontBorderImgElement;
        this.backBorderImgElement = backBorderImgElement;
        this.backImgElement = backImgElement;
    }

    getFormattedDate(date){
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `0${day}`.slice(-2) + '-' + `0${month}`.slice(-2) + '-' + year;
    }
}
