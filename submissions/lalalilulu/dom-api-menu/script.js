const products = [
    {   type: "Шампуни",
        title: "Charles Worthington Volume&Bounce Weightless Shampoo",
        description: "Шампунь для объема волос",
        price: 532,
        image: "./images/shampoo/photo_1.jpg"
    },
    {   type: "Шампуни",
        title: "Charles Worthington Color Plex Protecting Brunette Shampoo 2-in-1",
        description: "Шампунь для защиты цвеита темных волос 2-в-1",
        price: 555,
        image: "./images/shampoo/photo_2.jpg"
    },
    {   type: "Шампуни",
        title: "Herbal Professıonal Care S.O.S Total Repair Shampoo",
        description: "Восстанавливающий шампунь для поврежденных волос",
        price: 661,
        image: "./images/shampoo/photo_3.jpg"
    },
    {   type: "Шампуни",
        title: "Herbal Professional Care Color and Protect Silicone-Free Shampoo",
        description: "Питательный шампунь для волос",
        price: 661,
        image: "./images/shampoo/photo_4.jpg"
    },
    {   type: "Шампуни",
        title: "Herbal Professional Nutri Lisse Anti Frizz Silicone-Free Shampoo",
        description: "Питательный шампунь для волос",
        price: 661,
        image: "./images/shampoo/photo_5.jpg"
    },
    {   type: "Шампуни",
        title: "Herbal Pharmaline Atopic Dermatologic Shampoo",
        description: "Шампунь для чувствительной кожи головы",
        price: 769,
        image: "./images/shampoo/photo_6.jpg"
    },
    {   type: "Шампуни",
        title: "O.K.Beauty Clarifying & Volumizing Hair Shampoo",
        description: "Шампунь для придания объема",
        price: 1130,
        image: "./images/shampoo/photo_7.jpg"
    },
    {   type: "Кондиционеры",
        title: "Moist Diane Extra Fresh & Hydrate Treatment",
        description: "Кератиновый бальзам-маска",
        price: 950,
        image: "./images/conditioner/photo_1.jpg"
    },
    {   type: "Кондиционеры",
        title: "Moist Diane Extra Vital Extra Vital Organic Argan Oil & Vitalizing Keratin Treatment",
        description: "Кератиновый бальзам-маска для увлажения и питания кожи головы",
        price: 950,
        image: "./images/conditioner/photo_2.jpg"
    },
    {   type: "Кондиционеры",
        title: "Hask Hemp Oil Moisturizing Conditioner",
        description: "Увлажняющий кондиционер с конопляным маслом",
        price: 633,
        image: "./images/conditioner/photo_3.jpg"
    },
    {   type: "Кондиционеры",
        title: "John Frieda Hydrate & Recharge Conditioner",
        description: "Увлажняющий кондиционер для сухих, ослабленных и поврежденных волос",
        price: 499,
        image: "./images/conditioner/photo_4.jpg"
    },
    {   type: "Маски, сыворотки",
        title: "Botavicos Skin Care and Aromatherapy Weekend Recovering Hair Mask",
        description: "Восстанавливающая маска для волос",
        price: 375,
        image: "./images/mask/photo_1.jpg"
    },
    {   type: "Маски, сыворотки",
        title: "O.K.Beauty Repair & Recovery Intensive Hair Concentrate",
        description: "Интенсивная маска для глубокого питания и восстановления волос",
        price: 1520,
        image: "./images/mask/photo_2.jpg"
    },
    {   type: "Маски, сыворотки",
        title: "O.K.Beauty Wake Up & Peel Scalp Activator",
        description: "Пилинг- маска для кожи головы",
        price: 950,
        image: "./images/mask/photo_3.jpg"
    },
    {   type: "Маски, сыворотки",
        title: "Wella Professionals Color Fresh Mask",
        description: "Оттеночная кремовая маска",
        price: 1249,
        image: "./images/mask/photo_4.jpg"
    },
    {   type: "Маски, сыворотки",
        title: "Hask Hemp Oil Moisturizing Deep Conditioner",
        description: "Увлажняющая маска с конопляным маслом",
        price: 280,
        image: "./images/mask/photo_5.jpg"
    },
    {   type: "Маски, сыворотки",
        title: "Matrix Biolage Fiberstrong Deep Treatment Pack",
        description: "Маска-концентрат для укрепления ломких, ослабленных волос",
        price: 850,
        image: "./images/mask/photo_6.jpg"
    },
    {   type: "Стайлинг",
        title: "John Frieda Volume Lift Thickening",
        description: "Мусс для уплотнения и придания объема волос",
        price: 723,
        image: "./images/styling/photo_1.jpg"
    },
    {   type: "Стайлинг",
        title: "Keune Style Heat Protect Instant Blowout N°37",
        description: "Термозащитный спрей для быстрой укладки",
        price: 2118,
        image: "./images/styling/photo_2.jpg"
    },
    {   type: "Стайлинг",
        title: "Keune Style Straight Cream N°57",
        description: "Выпрямляющий крем для волос",
        price: 1686,
        image: "./images/styling/photo_3.jpg"
    },
    {   type: "Стайлинг",
        title: "John Frieda Volume Lift Root Booster",
        description: "Спрей для прикорневого объема волос с термозащитным действием",
        price: 723,
        image: "./images/styling/photo_4.jpg"
    },
    {   type: "Окрашивание",
        title: "L'Oreal Excellence",
        description: "Краска для волос",
        price: 249,
        image: "./images/coloration/photo_1.jpg"
    },
    {   type: "Окрашивание",
        title: "Schwarzkopf Got2b Bright/Pastel Набор для тонирования волос",
        description: "Набор для тонирования волос",
        price: 299,
        image: "./images/coloration/photo_2.jpg"
    },
    {   type: "Окрашивание",
        title: "L'Oreal Magic Retouch",
        description: "Краска для волос",
        price: 204,
        image: "./images/coloration/photo_3.jpg"
    },
    {   type: "Окрашивание",
        title: "L'Oreal Colorista Spray",
        description: "Тонирующий спрей для волос",
        price: 299,
        image: "./images/coloration/photo_4.jpg"
    },
    {   type: "Аксессуары",
        title: "Invisibobble Original Hair-Rings Crystal Clear",
        description: "Резинка-браслет для волос",
        price: 503,
        image: "./images/accessories/photo_1.jpg"
    },
    {   type: "Аксессуары",
        title: "Invisibobble Original Hair-Rings Pretzel Brown",
        description: "Резинка-браслет для волос",
        price: 503,
        image: "./images/accessories/photo_2.jpg"
    },
    {   type: "Аксессуары",
        title: "Invisibobble Wrapstar Hair-Rings Snake It Off",
        description: "Резинка с лентой",
        price: 1092,
        image: "./images/accessories/photo_3.jpg"
    },
    {   type: "Аксессуары",
        title: "Invisibobble Original Hair-Rings Pinkerbell",
        description: "Резинка-браслет для волос",
        price: 503,
        image: "./images/accessories/photo_4.jpg"
    }];

function removeElementsIfExist(elementsList) {
    if(elementsList.length > 0) {
        Array.from(elementsList).forEach(element => element.remove());
        return true;
    }
    return false;
}

function createElementWithClass(tagName, cssClass) {
    const element = document.createElement(tagName);
    element.classList.add(cssClass);
    return element;
}

function createContentItem(product) {
    const productElement = createElementWithClass("div", "content-item");

    const itemImg = createElementWithClass("img", "content-item-image");
    itemImg.setAttribute("src", product.image);
    itemImg.setAttribute("alt", product.title);

    const itemTitle = createElementWithClass("a", "content-item-title");
    itemTitle.setAttribute("href", "#");
    itemTitle.textContent = product.title;

    const itemDescription = createElementWithClass("div", "content-item-description");
    itemDescription.textContent = product.description;

    const itemPrice = createElementWithClass("div", "content-item-price");
    itemPrice.textContent = product.price;
    const rubleSign = createElementWithClass("span", "rur");
    rubleSign.textContent = "p";
    itemPrice.appendChild(rubleSign);

    productElement.append(itemImg, itemTitle, itemDescription, itemPrice);
    return productElement;
}


document.getElementsByClassName("menu-list")[0].addEventListener("click", function (event) {
    const content = document.getElementById("content");
    const productType = event.target.textContent;

    removeElementsIfExist(document.getElementsByClassName("content-header"));
    removeElementsIfExist(document.getElementsByClassName("content-items"));

    const contentFragment = document.createDocumentFragment();
    const header = createElementWithClass("div", "content-header");
    const headerTitle = createElementWithClass("h3", "content-title");
    headerTitle.textContent = productType;

    const contentItems = createElementWithClass("div", "content-items");
    const prodArray = products.filter(product => product.type === productType).map(product => createContentItem(product))
    prodArray.forEach(item => contentItems.appendChild(item));
    header.appendChild(headerTitle);
    contentFragment.appendChild(header);
    contentFragment.appendChild(contentItems);
    content.appendChild(contentFragment);

});

