export class UserCard {
    constructor(user){
        const innerHTML = `
        <div class="user-card">
            <div class="user-card__front">
                <header class="user-card__front-header user-card__header">
                    <h3 class="user-card__front-heading">
                        <bdo>${user.firstName}, </bdo>
                        <span>${user.age}</span>
                    </h3>
                    <div class="user-card__front-prop user-card__front-email">${user.email}</div>
                    <div class="user-card__front-prop user-card__front-country">${user.country}</div>
                    <div class="user-card__front-prop user-card__front-registration">${user.formattedRegistration}</div>
                </header>
            </div>
            <div class="user-card__back">
                <header class="user-card__back-header user-card__header">
                    <h3 class="user-card__back-first-name user-card__back-heading">${user.firstName}</h3>
                    <h3 class="user-card__back-last-name user-card__back-heading">${user.lastName}</h3>
                </header>
                <main class="user-card__back-main">
                    <div class="user-card__back-prop user-card__back-age">
                        <span class="user-card__back-prop-name">Age:</span>
                        <span class="user-card__back-prop-value">${user.age}</span>
                    </div>
                    <div class="user-card__back-prop user-card__back-email">
                        <span class="user-card__back-prop-name">Email:</span>
                        <span class="user-card__back-prop-value">${user.email}</span>
                    </div>
                    <div class="user-card__back-prop user-card__back-location">
                        <span class="user-card__back-prop-name">Location:</span>
                        <span class="user-card__back-prop-value">${user.location}</span>
                    </div>
                    <div class="user-card__back-prop user-card__back-registration">
                        <span class="user-card__back-prop-name">Registered:</span>
                        <span class="user-card__back-prop-value">${user.formattedRegistration}</span>
                    </div>
                </main>
            </div>
        </div>`;

        const element = document.createElement('li');
        element.classList.add('user-card-item');
        element.innerHTML = innerHTML;

        element.querySelector('.user-card__front').prepend(user.frontImage, user.frontBorderImage);
        element.querySelector('.user-card__back').prepend(user.backImage, user.backBorderImage);

        return element;
    }
}
