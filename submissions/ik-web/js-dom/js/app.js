document.addEventListener("DOMContentLoaded", function (e) {
    'use strict';

    const cars = [{
            name: 'Mercedes',
            img: './img/merc.png',
            text: `Mercedes is both a German automotive marque and, from late 2019 onwards, a subsidiary – as Mercedes-Benz AG. Mercedes-Benz is known for producing luxury vehicles and commercial vehicles.The headquarters is in Stuttgart, Baden-Württemberg. The name first appeared in 1926 as Daimler-Benz. In 2018, Mercedes-Benz was the largest seller of premium vehicles in the world, having sold 2.31 million passenger cars.The company's origins come from Daimler-Motoren-Gesellschaft's 1901 Mercedes and Karl Benz's 1886 Benz Patent-Motorwagen, which is widely regarded as the first internal combustion engine in a self-propelled automobile. The fuel was not gasoline, but rather a much more volatile petroleum spirit called ligroin. The slogan for the brand is "the best or nothing".`
        },
        {
            name: 'BMW',
            img: './img/bmw.png',
            text: `Bayerische Motoren Werke AG, commonly known as Bavarian Motor Works, BMW or BMW AG, is a German automobile, motorcycle and engine manufacturing company founded in 1916.BMW is headquartered in Munich, Bavaria. It also owns and produces Mini cars, and is the parent company of Rolls-Royce Motor Cars. BMW produces motorcycles under BMW Motorrad. In 2012, the BMW Group produced 1,845,186 automobiles and 117,109 motorcycles across all of its brands. BMW is part of the “German Big 3” luxury automakers, along with Audi and Mercedes-Benz, which are the three best-selling luxury automakers in the world.`
        },
        {
            name: 'Lamborghini',
            img: './img/lamborg.png',
            text: `Lamborghini (Italian pronunciation: [lamborˈɡiːni]) is an Italian brand and manufacturer of luxury sports cars and SUVs based in Sant'Agata Bolognese. The company is owned by the Volkswagen Group through its subsidiary Audi. <br> Ferruccio Lamborghini, an Italian manufacturing magnate, founded Automobili Ferruccio Lamborghini S.p.A. in 1963 to compete with established marques, including Ferrari. The company was noted for using a rear mid-engine, rear-wheel drive layout. Lamborghini grew rapidly during its first decade, but sales plunged in the wake of the 1973 worldwide financial downturn and the oil crisis. The firm's ownership changed three times after 1973, including a bankruptcy in 1978. American Chrysler Corporation took control of Lamborghini in 1987 and sold it to Malaysian investment group Mycom Setdco and Indonesian group V'Power Corporation in 1994. In 1998, Mycom Setdco and V'Power sold Lamborghini to the Volkswagen Group where it was placed under the control of the group's Audi division.`
        },
        {
            name: 'Alfa Romeo',
            img: './img/a-r.png',
            text: `Alfa Romeo is an Italian premium car manufacturer. The company was founded on June 24, 1910, in Milan, Italy. "Alfa" is an acronym of its founding name, "Anonima Lombarda Fabbrica Automobili." "Anonima" means "anonymous", which was a legal form of company at the time, as it was founded by anonymous investors. In the initial set-up phase, in order to have a building to produce cars, the company bought the factory building of Darraq french company in Milan, which was closing up and selling all assets because it was going to fail. The brand is known for sport-oriented vehicles and has been involved in car racing since 1911. <br> The first car produced by the company was the 1910 24 HP, designed by Giuseppe Merosi. A.L.F.A. ventured into motor racing, with drivers Franchini and Ronzoni competing in the 1911 Targa Florio with two 24-hp models. In August 1915, the company came under the direction of Neapolitan entrepreneur Nicola Romeo, who converted the factory to produce military hardware for the Italian and Allied war efforts. In 1920, the name of the company was changed to Alfa Romeo with the Torpedo 20–30 HP the first car to be so badged.`
        },
        {
            name: 'Skoda',
            img: './img/skoda.png',
            text: `Škoda Auto a.s. (Czech pronunciation: [ˈʃkoda]), commonly called Škoda, is a Czech automobile manufacturer founded in 1895 as Laurin & Klement and headquartered in Mladá Boleslav, Czech Republic. <br> In 1925 Laurin & Klement was acquired by the industrial conglomerate Škoda Works, which itself became state owned in 1948. After 1991 it has been gradually privatized to the German Volkswagen Group, in 1994 became its subsidiary and in 2000 a wholly owned subsidiary. <br> Skoda automobiles are sold in over 100 countries and in 2018, total global sales reached 1.25 million units, an increase of 4.4% from the previous year. The operating profit was €1.6 billion in 2017, an increase of 34.6% over the previous year. As of 2017, Škoda's profit margin was the second highest of all VW Group brands after Porsche.`
        },
        {
            name: 'Mazda',
            img: './img/mazda.png',
            text: `Mazda Motor Corporation (commonly referred to as simply Mazda) is a Japanese multinational automaker based in Fuchū, Aki District, Hiroshima Prefecture, Japan. <br> In 2015, Mazda produced 1.5 million vehicles for global sales, the majority of which (nearly 1 million) were produced in the company's Japanese plants, with the remainder coming from a variety of other plants worldwide. In 2015, Mazda was the fifteenth largest automaker by production worldwide.`
        }
    ];

    const mainContent = document.querySelector('.main-content');
    const mainMenu = document.querySelector('.main-menu');
    const burger = document.querySelector('.burger');

    //Add listener to burger menu
    function addListenerToBurger() {
        burger.addEventListener('click', function (e) {
            e.preventDefault();
            this.classList.toggle('active');
            mainMenu.classList.toggle('active');
        });
    }

    //Create a button for main menu
    function createButton(buttonName) {
        const button = document.createElement('button');

        button.classList.add('menu-btn');
        button.innerHTML = buttonName;

        return button;
    }

    // Add buttons to to main menu
    function addButtons() {
        const docFrag = document.createDocumentFragment();
        const li = document.createElement('li');

        for (let i = 0; i < cars.length; i++) {
            li.appendChild(createButton(cars[i].name));
            docFrag.appendChild(li);
        }

        mainMenu.appendChild(docFrag);
    }

    // Show content on page after button click 
    function showContent(obj) {
        const content = `
            <section class="content-card">
                <h2 class="card-title" id="card-title">${obj.name}</h2>
                <div class="card-info">
                    <img src="${obj.img}" alt="img" class="card-img" id="card-img">
                    <p class="card-text" id="card-text">${obj.text}</p>
                </div>
            </section>
        `;
        mainContent.innerHTML = content;
    }

    // Hide the burger menu after button click
    function hideBurgerMenu() {
        if (document.querySelector('.active')) {
            burger.classList.remove('active');
            mainMenu.classList.remove('active');
        }
    }

    // Add event listener to main menu for buttons 
    function addListenerToMenu() {
        mainMenu.addEventListener('click', function (e) {
            const clickedButton = e.target.closest('.menu-btn');
            const buttonName = clickedButton.textContent;
            const buttonActive = document.querySelector('.btn-active');

            if (!clickedButton || clickedButton === buttonActive) {
                return;
            }

            if (buttonActive) {
                buttonActive.classList.remove('btn-active');
            }

            clickedButton.classList.add('btn-active');

            cars.forEach(function (obj) {
                if (obj.name === buttonName) {
                    showContent(obj);
                    hideBurgerMenu();
                }
            });

        });
    }

    // Add start app.js 
    function StartApp() {
        addListenerToBurger();
        addButtons();
        addListenerToMenu();
    }

    StartApp();
});
