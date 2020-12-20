"use strict";

const burger = document.querySelector(".burger");
const content = document.querySelector(".content");
const deBar = document.querySelector(".aside");
const navListOfElements = document.querySelector(".nav__list");

const defaultContent = "This demo site contains several articles on various topics. Choose any of them. I hope you find it interesting.";

const contentStorage = {
    "highway": {
        "title": " Highway Design and Road Safety",
        "imgurl": "img/road.jpg",
        "alt": "road",
        "text": "New paradigms in roadway design are focused on enhancing road user safety, convenience, and comfort while meeting the societal mobility, health, safety needs. For example, one recent trend in designing and adopting complete streets had greatly increased the demand for reduced lane widths. Traffic lane widths are often reduced to make space for extra lanes, parking, bike lanes, and wider sidewalks on the existing right of way. The impact of this trend is more evident in urban areas where the right of way is often in short supply. This trend is likely to continue with the increasing demand for more active modes of transport.This special issue of Journal of Transportation Safety & Security incorporates a collection of research articles examining urban and suburban roadway design. The six research articles contribute to integrated transportation safety solutions by identifying new design approaches for improving safety, evaluating new design approaches using driver simulation, and developing statistical approaches to evaluate the proposed safety solutions.     Strawderman et al. conducted a high-fidelity driver simulation experiment with 37 participants to evaluate the effectiveness of in-vehicle warning systems and roadway environment (such as pedestrian crossing signs, marked crosswalks, and sidewalks) on improving pedestrian safety at multimodal interchanges. The driving simulation experimental design involved a repeated-measures mixed design. The participants drove through four multimodal transfer facilities with different designs and in-vehicle warnings. The participant behavior in the simulation was evaluated based on driver speed and lane position. The study offered interesting results. Specifically, the authors observed that in-vehicle warning systems resulted in reduced driver speed while moving closer to shoulder. In the presence of sidewalks, drivers exhibited risky behavior by increasing speed and driving closer to shoulders. Overall, the results from the research effort contributed to our understanding of pedestrian and driver interactions for multimodal transfer locations. The analysis of in-vehicle warning systems can serve as a prelude to future research on autonomous and connected vehicles for driver behavior in general... Naveen Eluru, Anuj Sharma, and Richard Tay"
    },
    "lighthouse": {
        "title": "Lighthouse",
        "imgurl": "img/light.jpg",
        "alt": "lighthouse",
        "text": "A tower that serves as an orientation point in identifying shore and vessel locations and in warning of navigational hazards. Lighthouses are equipped with optical lighting systems and with technical means for producing signals: acoustic atmospheric devices (nautophone, diaphone, siren), underwater devices (underwater bells, oscillators), radio engineering devices (radio beacon), or combined radio and acoustic devices (a radio beacon receiver-transmitter operating synchronously with a nautophone or oscillator). Lighthouses are usually built on promontories at the entrances to ports, bays, and estuaries and sometimes on cliffs, reefs, or sandbars. Floating beacons are used to warn of hazards far from shore or to provide receivers at port entrances. These are anchored ships specially constructed to carry signaling equipment. For purposes of positive identification, each lighthouse is assigned a particular set of light, acoustic, or radio signals. The basic characteristics of a lighthouse include the distinctive architecture of its tower, its sector of illumination, the height of the light above sea level, and the color and character of the light (continuous uniform light, single flashes or groups of flashes at uniform time intervals, occulting light, and continuous light intensifying at uniform intervals). The characteristic features of radio beacons include their operating frequency, operating schedule, and code signal. Acoustic signals are usually operated only when visibility is poor. Like radio beacons, they are characterized by their schedule and code. The operating ranges are 20-50 km for light signals, 30-500 km or more for radio beacons, 5-15 km for acoustic signals transmitted through air, and up to 25 km for hydroacoustic signals. Lighthouses have been used since antiquity and are associated with the development of navigation itself. At first, bonfires on high shore points were used; later, artificial structures were built. The lighthouse at Alexandria on the Island of Pharos was 143 m high and was one of the seven wonders of the ancient world. Built of white marble in 283 B.Cl, it remained standing for about 1,500 years. In Russia, the first lighthouses were built in 1702 at the mouth of the Don River and in 1704 above the Peter and Paul Fortress in St. Petersburg. The optical light system of a lighthouse consists of light sources, optical apparatus, and a lanternlike structure protecting the optical equipment from atmospheric effects. The light sources in use include incandescent electric lamps, fluorescent tubes, flashers, acetylene lamps, and, less often, kerosene lamps. The optical apparatus includes a system of reflecting or refracting lenses that concentrates the light stream emitted by the source into a beam with a small scattering angle. Data on lighthouses are provided in special books, sailing directions, and marine navigation maps. REFERENCE:Martynov, K. B. Navigatsionnoe oborudovanie morskikh putei. Moscow, 1962"
    },
    "desert": {
        "title": "The desert biome",
        "imgurl": "img/desert.jpg",
        "alt": "desert",
        "text": "Deserts cover about one fifth of the Earth's surface and occur where rainfall is less than 50 cm/year. Although most deserts, such as the Sahara of North Africa and the deserts of the southwestern U.S., Mexico, and Australia, occur at low latitudes, another kind of desert, cold deserts, occur in the basin and range area of Utah and Nevada and in parts of western Asia. Most deserts have a considerable amount of specialized vegetation, as well as specialized vertebrate and invertebrate animals. Soils often have abundant nutrients because they need only water to become very productive and have little or no organic matter. Disturbances are common in the form of occasional fires or cold weather, and sudden, infrequent, but intense rains that cause flooding. There are relatively few large mammals in deserts because most are not capable of storing sufficient water and withstanding the heat. Deserts often provide little shelter from the sun for large animals. The dominant animals of warm deserts are nonmammalian vertebrates, such as reptiles. Mammals are usually small, like the kangaroo mice of North American deserts. Desert biomes can be classified according to several characteristics."
    },
    "lakes": {
        "title": "How Lakes Are Formed",
        "imgurl": "img/lake.jpg",
        "alt": "lake",
        "text": " All lakes fill bowl-shaped depressions in the Earth’s surface, called basins. Lake basins are formed in several ways. Many lakes, especially those in the Northern Hemisphere, were formed by glaciers that covered large areas of land during the most recent ice age, about 18,000 years ago. The huge masses of ice carved out great pits and scrubbed the land as they moved slowly along. When the glaciers melted, water filled those depressions, forming lakes. Glaciers also carved deep valleys and deposited large quantities of earth, pebbles, and boulders as they melted. These materials sometimes formed dams that trapped water and created more lakes. Many areas of North America and Europe are dotted with glacial lakes. The U.S. state of Minnesota is nicknamed  “The Land of 10,000 Lakes” because of the number of glacial lakes. Many lakes in North America, including the Great Lakes, were created primarily by glaciers. Some lake basins form where plate tectonics changed the Earth’s crust, making it buckle and fold or break apart. When the crust breaks, deep cracks, called faults, may form. These faults make natural basins that may fill with water from rainfall or from streams flowing in the basin. When these movements occur near the ocean, part of the ocean may be trapped by a new block of land thrust up from below the Earth’s surface. The Caspian Sea was formed this way. Lake Baikal was also formed by the movement of tectonic plates. Many lakes form as a result of volcanoes. After a volcano becomes inactive, its crater may fill with rain or melted snow. Sometimes the top of a volcano is blown off or collapses during an eruption, leaving a depression called a caldera. It, too, may fill with rainwater and become a lake. Crater Lake, in the U.S. state of Oregon, one of the deepest lakes in the world, was created when ancient Mount Mazama’s volcanic cone collapsed. Not all lakes are created by basins filling with water. Some lakes are formed by rivers. Mature rivers often wind back and forth across a plain in wide loops called meanders. During periods of flooding, a swollen, rushing river may create a shortcut and bypass a meander, leaving a body of standing water. This type of small lake is called an oxbow lake, because its shape resembles the U-shaped frame that fits over an ox’s neck when it is harnessed to pull a wagon or a plow. Lakes may also be created by landslides or mudslides that send soil, rock, or mud sliding down hills and mountains. The debris piles up in natural dams that can block the flow of a stream, forming a lake. Dams that beavers build out of tree branches can plug up rivers or streams and make large ponds or marshes. People make lakes by digging basins or by damming rivers or springs. These artificial lakes can become reservoirs, storing water for irrigation, hygiene, and industrial use. Artificial lakes also provide recreational use for boating, swimming, or fishing. Artificial lakes can provide electricity through hydroelectric power plants at the dam. Lake Mead, in the U.S. states of Arizona and Nevada, was formed when the Hoover Dam was built during the Great Depression. The dam was built to control the unpredictable Colorado River and provides electricity to the western United States."
    },
    "pantheon": {
        "title": "The Pantheon: The ancient building still being used after 2,000 years",
        "imgurl": "img/panth.jpg",
        "alt": "pantheon",
        "text": " When visitors walk into the Pantheon in Rome and encounter its colossal dome, they may experience the same theatricality as its guests nearly 2,000 years ago.\"Anyone who steps inside the Pantheon immediately feels the crushing weight of human history, but also the incredible lightness of human creativity,\" said John Ochsendorf, professor of architecture at MIT and former director of the American Academy in Rome. \"You come into this grand space and you look up and you see the sky or a passing cloud. And you think: \'How could they have done this nearly two millennia ago?\'\" The Pantheon is the oldest building in the world that's still in use today. Since the 7th century, it has been a Roman Catholic church. Built around 125 A.D. by the Roman emperor Publius Aelius Hadrianus, it was actually the third iteration of the structure. The first Pantheon caught fire around 80 A.D. and was rebuilt shortly after, but it was struck by lightning and burned down again around 110 A.D. The buildings' ill fate led to rumors that the Pantheon was cursed. The facade of the completed structure riffed on ancient Greek motifs, with a portico entrance featuring a pediment -- a triangular top -- and two rows of Corinthian columns. The interior was sweeping and airy, capped by a dome that to this day -- is still the largest unsupported concrete dome in the world."
    },
};


// CREATE NAV

let dynamicNav = function (e) {
    e.preventDefault();
    let insertNav = '';

    for (let i of Object.keys(contentStorage)) {
        let insetNavItem = `<li class="nav__item"><a href="#top" class="nav__link"><span>${i}</span></a></li> \n`;
        insertNav += insetNavItem;
    }
    navListOfElements.innerHTML = insertNav;
}

document.addEventListener('DOMContentLoaded', dynamicNav);

// ADD CONTENT ON PAGE DOWNLOAD

let addContentOnPageDownload = function (e) {
    e.preventDefault();
    content.innerHTML = defaultContent;
}

document.addEventListener("DOMContentLoaded", addContentOnPageDownload)

// MOVE NAV & CONTENT

function hideSideBar(e) {
    e.preventDefault();
    console.log(e);
    deBar.classList.toggle('hide__sidebar');
    burger.classList.toggle('burger__stop');
};

burger.addEventListener('click', hideSideBar);

// ENTER-KEY EVENT SHOW-HIDE ".aside"

burger.addEventListener('keydown', function (e) {
    e.preventDefault();
    if (e.keyCode == "13") {
        deBar.classList.toggle('hide__sidebar');
        burger.classList.toggle('burger__stop');
    }
}
);

// CLOSE ASIDE WHEN MOUSE CLICK OUT

function hideSideBarClickAway(e) {
    e.preventDefault();
    if (!e.target.classList.contains('burger') && !deBar.contains(e.target)) {
        if (deBar.classList.contains('hide__sidebar')) {
            deBar.classList.toggle('hide__sidebar');
            burger.classList.toggle('burger__stop');
        };
    };
};

document.addEventListener('click', hideSideBarClickAway);

// ADD CONTENT IN ".content"

function addContentOnClick(e) {

    if (e.target && e.target.nodeName === 'A' || e.target.nodeName === 'SPAN') {
        content.innerHTML = "";
        let contentRaw = contentStorage[e.target.textContent];
        let makeContent = `<div class="content__header">
        <h1 name="top">
        ${contentRaw.title}
        </h1>
    </div>
    <div class="content__body">
        <img src="${contentRaw.imgurl}" alt="${contentRaw.alt}" class="content__img">
        <p>
            <span class="content__text">
                ${contentRaw.text}
            </span>
        </p>
    </div>`;
        content.innerHTML = makeContent;
    };
};

navListOfElements.addEventListener('click', addContentOnClick);
