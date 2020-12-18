const backpacks = [
    {
        name: "ALPINE",
        img: "./img/alpine.webp",
        description: [
            "On your back, ready, go. The new Guide is not only lighter than its predecessor, but also cleverly thought out. With the frontal access, you can get to your equipment quickly and don't lose any time on your tour. If you want to save additional weight, simply remove the hip fins, the helmet bracket or the frame. Thanks to the Alpine Back System, the rucksack sits tight and close to your body: you are safe on the mountain. "],
    },
    {
        name: "URBAN",
        img: "./img/urban.webp",
        description: [
            "Hit the road with style! The urban companion in three sizes and three colours each are true winners with their optimum function: Drinking bottles, mobile phones, tablets, laptops, books and snacks all find a home in the ingenious side pockets, organiser and security compartments – and yet, everything still is clearly visible and extremely comfortable to carry!",
        ]
    },
    {
        name: "BIKE",
        img: "./img/bike.webp",
        description: [
            "On the road for a day bike tour with luggage light as a feather: Race Air 10 weighs no more than 800 grams. Thanks to its three-sided ventilation and compact fit with ergonomically designed mesh shoulder straps and hip fins the Race Air models can be used on the most challenging stretches. And thanks to the volume expansion, you can take even more on tour with the Race EXP Air 14+3."
        ],
    },
    {
        name: "FREERIDE",
        img: "./img/freeride.webp",
        description: [
            "The Freerider Pro has all the features and flexible capacity you need for multi-day winter adventures in the mountains. This latest incarnation of the Freerider Pro has a new roll-top closure. This allows you to expand the capacity of the pack by 10 litres. The roll-top itself is also fitted with a stowable strap for the attachment of extra kit or a climbing rope, or to compress the roll-top itself. At times during the day when you don’t need your skis, snowshoes or snowboard, they can be attached to the outside of the pack quickly and easily using two dedicated gear straps; skis can be affixed diagonally across the back or in an A-frame, a snowboard or snowshoes in an upright position. These versatile gear straps can also be used for compression."
        ]
    },
    {
        name: "CHILDREN",
        img: "./img/children.webp",
        description: [
            "The perfect friend: This child's backpack with the funny ears is a delightful companion for daily life, when going swimming or for hiking trips. The Kikki is a fun alternative to the kindergarten bag. Its large, friendly eyes not only trigger your curiosity for the world - they also light up in traffic. This kindergarten backpack is PFC-free and manufactured according to the bluesign(R) standard, which is the most demanding standard worldwide for consumer protection, health and safety at work and environmental protection."
        ]
    },
    {
        name: "CLIMBING",
        img: "./img/climbing.webp",
        description: [
            "And if extreme climbers had one wish? Perhaps a haul bag and backpack in one? Voilà, here it is. Extremely robust and with lots of space, it can cope with the full complement of heavy climbing equipment. And with the exposed back system, it can even do that with comfort!"
        ]
    },
    {
        name: "TRAVEL",
        img: "./img/travel.webp",
        description: [
            "Do you often spend a few days away on business? Are you looking for a practical bag to accompany you? The Carry On makes travelling a breeze, thanks to the hand luggage dimensions and the full-length zip, which means this bag opens out fully for at-a-glance access. There’s a large compartment for clothing and another for work materials, so that everything is always organised and easy to find. Thanks to the stowable shoulder straps, the backpack doubles as a practical carry case as well."
        ],
    },
    {
        name: "SCHOOL",
        img: "./img/school.webp",
        description: [
            "Active kids need an active school backpack that follows their activities throughout the school day and on the way to and from school. Without any complicated settings, the Ypsilon with its Deuter Contact carry system is perfect for growing kids. The perfect alternative to satchels! The newly developed Lumbal Pad ensures the best fit and distribution of weight and, thus, supports the natural development of children."
        ],
    },
    {
        name: "SKI",
        img: "./img/ski.webp",
        description: [
            "Our robust, iconic ski touring pack with a lid compartment has had a body makeover! Its slim-format, athletic design makes it the perfect companion for snowshoe hikes or ski tours. Whether it’s a weekend ski tour or a multi-day mountain traverse, this pack has the safety equipment stashed neatly in the front compartment so that it’s quickly accessible and a full-length zip on the back panel for easy access to contents. Skis, a snowboard and snowshoes can be fastened individually thanks to clever stowable straps and bungee cords."
        ],
    },
    {
        name: "TREKKING",
        img: "./img/trekking.webp",
        description: [
            "Our Aircontact trekking backpack has won the title of “indestructible”. Therefore, we have opted for gentle changes: It is extremely robust, but now it is even neater, more modern and streamlined when trekking. And even more comfortable: Thanks to the new, flexible, suspended Active Fit shoulder straps and the re-designed hip fins, the backpack moulds itself comfortably around the wearer – for noticeably more comfort. For women, the new system is equipped with the tried and tested features of the SL fit."
        ],
    },
    {
        name: "HIKING",
        img: "./img/hiking.webp",
        description: [
            "The Fox, our trekking backpack for kids and teenagers, was revised to provide the technical design and great functionality of our “big” backpacks fully adapted to the needs of kids. Thanks to the VariQuick back length adjustment system, the Fox also grows with the child so they can enjoy with their adventure backpack for a longer time."
        ],
    },
    {
        name: "CHILD CARRIER",
        img: "./img/child-carrier.webp",
        description: [
            "The new, compact Lite Air contact back with ventilation makes this child carrier absolutely lightweight. The sporty frame offers the height of comfort and naturally bears the TÜV GS safety seal of approval. The seating area for the child is a comfort zone with the simple-to-use and easy-to-access safety harness, the side access and the very soft cover material. The unisex fit with specially adapted shoulder straps and hip fins lets mum and dad take turns carrying the child."
        ],
    },
];

const headerUl = document.querySelector(".header__ul");
const mainHeader = document.querySelector(".main__header");
const mainImage = document.querySelector(".main__img");
const mainDescription = document.querySelector(".main__description");

const generateDescription = (section) => {
    const fragmentDescription = document.createDocumentFragment();

    section.description.forEach((description) => {
        const desc = document.createElement("p");
        desc.textContent = description;
        desc.classList.add("main__description-p");
        fragmentDescription.appendChild(desc);
    });
    mainDescription.innerHTML = "";
    mainDescription.appendChild(fragmentDescription);
};

const handleHeaderLinkClick = (target) => {
    const activeElement = document.querySelector(".header__link.header__link--decorated");

    if (activeElement) {
        activeElement.classList.remove("header__link--decorated");
    }
    target.classList.add("header__link--decorated");
};

const handleHeaderClick = ({target}) => {
    if (target.classList.contains("header__link")) {
        const sectionName = target.textContent;
        const section = backpacks.find(
            (item) => item.name.toLowerCase() === sectionName.toLowerCase()
        );
        mainHeader.textContent = section.name;
        mainImage.setAttribute("src", section.img);

        generateDescription(section);
        handleHeaderLinkClick(target);
    }
};

const loadHeaderLi = () => {
    const fragmentUlList = document.createDocumentFragment();
    backpacks.forEach((section) => {
        const li = document.createElement("li");
        li.classList.add("header__li");
        const link = document.createElement("a");
        link.classList.add("header__link");
        link.textContent = section.name;
        li.append(link);
        fragmentUlList.append(li);
    });
    headerUl.append(fragmentUlList);
};

const initApp = () => {
    loadHeaderLi();
    headerUl.addEventListener("click", handleHeaderClick);
};

document.addEventListener("DOMContentLoaded", initApp);
