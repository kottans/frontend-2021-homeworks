const WIKI = {
    'governors' : {
        type: 'overview',
        title:'Overview',
        description: `Governors are a feature added to Civilization VI in the Rise and Fall expansion pack.
                      They are agents of your government which may be appointed and assigned to cities in order to boost their Loyalty and enhance gameplay elements.
                      As such they directly channel the power of the central authority in their areas of specialty.`
    },
    'amani' : {
        type: 'governor',
        title: 'The Diplomat',
        description: 'Skilled in gaining support for your civilization, and spreading its influence to nearby cities. Amani is the only governor that can be given foreign assignment in a city-state.',
        context: 'Diplomats are representatives of their people to other parts of the world, and are one of the most ancient and respected roles of service to the state. Diplomats are traditionally accorded privilege and respect, and in turn the diplomat shows both politesse and courtesy to her host.',
        img_src: './img/Amani.png',
        img_alt: 'Amani portrait'
    },
    'liang' : {
        type: 'governor',
        title: 'The Surveyor',
        description: 'An expert in efficiency, Liang is skilled in all things related to building and construction. An expert planner, she can also supervise the development of custom improvements in the city.',
        context: `There's an old joke that says: "Invest in land; they've stopped making it." The truth is that effective use of land is an important job, and efficient use of space begins with understanding what you have through surveys and mapping. Surveying is another trade that goes back to antiquity, and which enjoyed considerable support from those who understand the value of land.`,
        img_src: './img/Liang.png',
        img_alt: 'Liang portrait'
    },
    'magnus' : {
        type: 'governor',
        title: 'The Steward',
        description: 'Enterprising and capable, Magnus is able to procure valuable resources when needed. He is also quite skilled in optimizing the overall  Production in the city.',
        context: 'The title of "steward" dates back to the Dark Ages, and is given to the representative of the lord of a manor who can act on their behalf in their absence. It is a position of great trust and importance, and a good steward acts to improve the wealth of the estate.',
        img_src: './img/Magnus.png',
        img_alt: 'Magnus portrait'
    },
    'moksha' : {
        type: 'governor',
        title: 'The Cardinal',
        description: 'Spiritual and Religious leader that can increase the  Religious Strength of a city, and the Religious units stationed there. Moksha is a beacon of  Faith in your empire.',
        context: 'A Cardinal is one of the highest ranks of priest in the Roman Catholic Church, although similar ecclesiastical ranks exist in many other religions, such as certain Metropolitans of Orthodox Churches or the Lama in Vajrayana Buddhism. The office may entail oversight of large portions of property or large groups responsible for important aspects of the faith.',
        img_src: './img/Moksha.png',
        img_alt: 'Moksha portrait'
    },
    'pingala' : {
        type: 'governor',
        title: 'The Educator',
        description: 'Pingala is focused on the cultivation of  Scientific and  Cultural endeavors in the city. He is also quite skilled in the attraction of  Great People to his city.',
        context: 'Educators are more than teachers - they are guardians of the knowledge of ages, and dedicate their lives to the preservation and dissemination of information. As education has become more widespread and comprehensive, so too has the educator\'s role in finding new and effective means of transmitting the collected wisdom of ages to their students.',
        img_src: './img/Pingala.png',
        img_alt: 'Pingala portrait'
    },
    'reyna' : {
        type: 'governor',
        title: 'The Financier',
        description: 'Shrewd and fiscally knowledgeable, Reyna is able to strengthen the economic power of a city, using finances to provide more than is normally possible.',
        context: 'A financier is an official tasked with resolving budgetary and financial matters, requiring an astute understanding of economics and the psychology of markets. Playing with the money of the state is not a matter for the faint-hearted.',
        img_src: './img/Reyna.png',
        img_alt: 'Reyna portrait'
    },
    'victor' : {
        type: 'governor',
        title: 'The Castellan',
        description: 'Military focused, once established in a city, Victor is instrumental in strengthening, preserving, and defending it from foreign threats.',
        context: 'A Castellan is a military officer responsible for directing the day-to-day affairs of a castle or fortress and the territory immediately around it. As castles were massive investments of treasure and important points of military power, the castellan had to be both competent and politically reliable. In times of war, a competent castellan could determine the fate of campaigns, and with that, the historical outcome.',
        img_src: './img/Victor.png',
        img_alt: 'Victor portrait'
    }
}
Object.freeze(WIKI)
const MAIN_INNER_HTML = `<input type='button' id='menu_button' class='menu_button' value='Menu'>
                         <div id='civilopedia_path' class='civilopedia_path'>Civilization VI | Governors</div>
                         <div id='article' class='article'><h1 id='title' class='text_heading_1'></h1>
                            <img id='portrait' alt='' src='' class='portrait'>
                            <h2 class='text_heading_2 description_heading'>Description</h2>
                            <p id='description' class='text description'></p>
                            <h2 class='text_heading_2 context_heading'>Historical Context</h2>
                            <p id='context' class='text context'></p>
                         </div>`
const MAIN = document.getElementById('main')
const NAV = document.getElementById('nav')
MAIN.innerHTML=MAIN_INNER_HTML
const TITLE = document.getElementById('title')
const DESCRIPTION = document.getElementById('description')
const PORTRAIT = document.getElementById('portrait')
const CONTEXT = document.getElementById('context')
const GOVERNOR_HEADINGS = document.querySelectorAll('.text_heading_2')
let menu_item_current

function createMenu() {
    let navHTML = `<ul id='menu' class='menu_list'>`
    navHTML += Object.keys(WIKI).map(element => `<li><a href='#' class='menu_item'>${element}</a></li>`).join('')
    navHTML +=`</ul>`
    NAV.innerHTML = navHTML
    const MENU_ITEMS = document.querySelectorAll('.menu_item')
    MENU_ITEMS[0].classList.add('menu_item_first')
    MENU_ITEMS[MENU_ITEMS.length-1].classList.add('menu_item_last')
    return MENU_ITEMS[0]
}
function selectMenuItem(item) {
    try {
        menu_item_current.classList.remove('menu_item_selected')
    } catch (TypeError) {}
    menu_item_current = item
    menu_item_current.classList.add('menu_item_selected')
    updateMain()
}
function updateMain() {
    const NAME = menu_item_current.textContent
    const TYPE = WIKI[NAME]['type']
    TITLE.textContent = `${NAME} - ${WIKI[NAME].title}`
    DESCRIPTION.textContent = WIKI[NAME].description
    if (TYPE==='governor') updateMainGovernor(NAME)
    else hideGovernorDetails()
}
function updateMainGovernor(name) {
    CONTEXT.textContent = WIKI[name].context
    PORTRAIT.src = WIKI[name].img_src
    PORTRAIT.alt = WIKI[name].img_alt
    showGovernorDetails()
}
function hideGovernorDetails() {
    GOVERNOR_HEADINGS.forEach(element => element.classList.add('hidden'))
    PORTRAIT.classList.add('hidden')
    CONTEXT.classList.add('hidden')
    CONTEXT.textContent = ''
    PORTRAIT.src = ''
    PORTRAIT.alt = ''
}
function showGovernorDetails() {
    GOVERNOR_HEADINGS.forEach(element => element.classList.remove('hidden'))
    PORTRAIT.classList.remove('hidden')
    CONTEXT.classList.remove('hidden')
}
function toggleHiddenSmallScreenNavMain() {
    MAIN.classList.toggle('hidden_small_screen')
    NAV.classList.toggle('hidden_small_screen')
}

selectMenuItem(createMenu())
document.getElementById('menu').addEventListener('click', evt => {
    selectMenuItem(evt.target)
    toggleHiddenSmallScreenNavMain()
    evt.preventDefault()
})
document.getElementById('menu_button').addEventListener('click', toggleHiddenSmallScreenNavMain)
