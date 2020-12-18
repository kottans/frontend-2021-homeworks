document.addEventListener('DOMContentLoaded', () => {
    const gameboard = document.querySelector('.gameboard');
    const score = document.querySelector('.score');
    const newGameButton = document.querySelector('.button');
    const numberOfCards = 12;
    const animationSpeed = 500;
    let numberOfOpenCards = 0;
    const images = [
        'albatross', 'anchor', 'coral',
        'dolphin', 'fish', 'squid'
    ];

    const imagesTwice = doubleImages(images);

    const imgDirName = 'img';
    const imgFormat = 'png';
    let openCards = [];
    let blockClicks = false;



    function rand(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min));
    }

    function randomCutImage() {
        return imagesTwice.splice(rand(0, imagesTwice.length - 1), 1);
    }

    function doubleImages(images) {
        return images.concat(images);
    }

    function imgPathBuilder(imgName) {
        return `${imgDirName}/${imgName}.${imgFormat}`;
    }

    function createCardElement() {
        const cardTemplate = `
            <div class="flip-container card">
                <div class="flipper">
                    <div class="front"></div>
                    <div class="back">
                        <img src="${imgPathBuilder( randomCutImage() )}" alt="card image">
                    </div>
                </div>
            </div>
        `;
        return cardTemplate;
    }

    function createCardsFragment() {
        let fragment = '';
        for (let i = 1; i <= numberOfCards; i++) {
            fragment += createCardElement();
        }
        return fragment;
    }

    function checkPair() {
        const cardImgSrc1 = openCards[0].querySelector('img').src;
        const cardImgSrc2 = openCards[1].querySelector('img').src;
        if (cardImgSrc1 === cardImgSrc2) {
            markPair(openCards);
            numberOfOpenCards += 2;
        } else {
            removeOpenClass(openCards);
        }
        openCards = [];
    }

    function markPair(cards) {
        cards.forEach(card => {
            card.classList.add('pair');
        });
    }

    function removeOpenClass(cards) {
        cards.forEach(card => {
            card.classList.remove('open');
        });
    }

    function showScore() {
        score.innerHTML = numberOfOpenCards;
    }

    function checkWin() {
        if (numberOfOpenCards === numberOfCards) {
            score.innerHTML += ' YOU WIN!';
            console.log('%cWIN!!!', "color: yellow; font-style: italic; background-color: blue; padding: 2px;");
            showButton();
        }
    }

    function showButton() {
        newGameButton.classList.remove('button--hidden');
    }

    newGameButton.addEventListener('click', () => {
        window.location.reload();
    });

    gameboard.insertAdjacentHTML('beforeend', createCardsFragment());

    gameboard.addEventListener('click', (e) => {
        if (blockClicks) return false;
        const el = e.target.closest('.card');
        if (!el) return false;
        if (openCards.includes(el)) return false;
        if (el.classList.contains('pair')) return false;
        blockClicks = true;
        el.classList.add('open');
        openCards.push(el);

        setTimeout(() => {
            if (openCards.length === 2) checkPair();
            showScore();
            checkWin();
            blockClicks = false;
        }, animationSpeed);
    });

});
