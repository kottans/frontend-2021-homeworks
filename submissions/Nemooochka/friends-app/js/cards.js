export class Cards {
    constructor(arrayCards, node) {
        this.arrayCards = arrayCards;
        this.node = node;

        this.renderCards();
    }

    static generateCard({name, gender, email, location, picture, dob}) {
        return `<div class="card-content">
                <div class="card-photo" style="background-image: url(${picture.large})"></div>
                <div class="card-title">
                    <div class="name">
                        <span class="name-first">${name.first}</span>
                        <span class="name-last">${name.last}</span>
                    </div>
                    <div>
                        <a href="mailto: ${email}">${email}</a>
                    </div>
                </div>
                <div class="card-bottom">
                    <div class="card__block">
                        <h3>Gender</h3>
                        <p>${gender}</p>
                    </div>
                    <div class="card__block">
                        <h3>Age</h3>
                        <p class="age">${dob.age}</p>
                    </div>
                    <div class="card__block">
                        <h3>Country</h3>
                        <p>${location.country}</p>
                    </div>
                </div>
            </div>
            `;
    }

    renderCards() {
        const cards = document.createDocumentFragment();
        this.node.innerHTML = '';

        this.arrayCards.map((elem, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.cardNumber = index;
            card.innerHTML = this.constructor.generateCard(elem);
            cards.appendChild(card);
        });

        this.node.appendChild(cards);
    }
}
