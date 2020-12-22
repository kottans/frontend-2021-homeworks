export class UserCard {
    constructor(user){
        this.user = user;

        this.defineElement();
        this.insertImgsIntoElement();
    }

    defineElement(){
        const innerHTML = `
            <div class="user-card">
                <div class="user-card__front">
                    <header class="user-card__front-header user-card__header">
                        <h3 class="user-card__front-heading">
                            <bdo>${this.user.firstName}, </bdo>
                            <span>${this.user.age}</span>
                        </h3>
                        <span class="user-card__front-prop user-card__front-email">${this.user.email}</span>
                        <span class="user-card__front-prop user-card__front-country">${this.user.country}</span>
                        <span class="user-card__front-prop user-card__front-registration">${this.user.formattedRegistration}</span>
                    </header>
                </div>
                <div class="user-card__back">
                    <header class="user-card__back-header user-card__header">
                        <h3 class="user-card__back-first-name user-card__back-heading">${this.user.firstName}</h3>
                        <h3 class="user-card__back-last-name user-card__back-heading">${this.user.lastName}</h3>
                    </header>
                    <main class="user-card__back-main">
                        <div class="user-card__back-prop user-card__back-age">
                            <span class="user-card__back-prop-name">Age:</span>
                            <span class="user-card__back-prop-value">${this.user.age}</span>
                        <div>
                        <div class="user-card__back-prop user-card__back-email">
                            <span class="user-card__back-prop-name">Email:</span>
                            <span class="user-card__back-prop-value">${this.user.email}</span>
                        <div>
                        <div class="user-card__back-prop user-card__back-location">
                            <span class="user-card__back-prop-name">Location:</span>
                            <span class="user-card__back-prop-value">${this.user.location}</span>
                        <div>
                        <div class="user-card__back-prop user-card__back-registration">
                            <span class="user-card__back-prop-name">Registered:</span>
                            <span class="user-card__back-prop-value">${this.user.formattedRegistration}</span>
                        <div>
                    </main>
                </div>
            </div>`;

        this.element = document.createElement('li');
        this.element.classList.add('user-card-item');
        this.element.innerHTML = innerHTML;
    }

    insertImgsIntoElement(){
        this.element.querySelector('.user-card__front').prepend(this.user.imgElement, this.user.frontBorderImgElement);
        this.element.querySelector('.user-card__back').prepend(this.user.backImgElement, this.user.backBorderImgElement);
    }
}
