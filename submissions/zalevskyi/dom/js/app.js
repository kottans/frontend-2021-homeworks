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
const ARTICLE_INNER_HTML = {
    'overview': `<h1 id='title' class='text_heading_1'></h1><p id='description' class='text'></p>`,
    'governor': `<h1 id='title' class='text_heading_1'></h1>
                 <img id='portrait' alt='' src='' class='portrait'>
                 <h2 class='text_heading_2 description_heading'>Description</h2>
                 <p id='description' class='text description'></p>
                 <h2 class='text_heading_2 context_heading'>Historical Context</h2>
                 <p id='context' class='text context'></p>`
}
Object.freeze(WIKI)
Object.freeze(ARTICLE_INNER_HTML)
function updateCommon(name) {
    document.getElementById('title').textContent = `${name} - ${WIKI[name].title}`
    document.getElementById('description').textContent = WIKI[name].description
}
function updateGovernor(name) {
    document.getElementById('context').textContent = WIKI[name].context
    document.getElementById('portrait').src = WIKI[name].img_src
    document.getElementById('portrait').alt = WIKI[name].img_alt
}
document.getElementById('menu').addEventListener('click', ({target}) => {
    const target_before = document.querySelector('.menu_item_selected')
    if (target!==target_before) {
        const article = document.getElementById('article')
        const name = target.textContent
        const name_before = target_before.textContent
        target_before.classList.toggle('menu_item_selected')
        target.classList.toggle('menu_item_selected')
        article.classList.add('hidden')
        if (WIKI[name]['type']!==WIKI[name_before]['type']) {
            article.innerHTML=ARTICLE_INNER_HTML[WIKI[name]['type']]
        }
        updateCommon(name)
        if (WIKI[name]['type']==='governor') updateGovernor(name)
        article.classList.remove('hidden')
    }
    document.querySelector('.main').classList.toggle('hidden_small')
    document.querySelector('.nav').classList.toggle('hidden_small')
})
document.getElementById('menu').addEventListener('click', e => e.preventDefault())
document.getElementById('menu_button').addEventListener('click', () => {
    document.querySelector('.main').classList.toggle('hidden_small')
    document.querySelector('.nav').classList.toggle('hidden_small')
})
document.getElementById('menu_button').addEventListener('click', e => e.preventDefault())
