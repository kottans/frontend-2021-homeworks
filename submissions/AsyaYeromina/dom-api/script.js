const tabContent = [
    {
        text : `Deep house is a subgenre of house music that originated in the 1980s, initially fusing elements of Chicago house with 1980s jazz-funk and touches of soul music. Its origins are attributed to Larry Heard's track "Mystery of Love" in 1984.`, 
        tabName : "Deep House",
        audio: `<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/334671843&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/digitalstreams" title="Westcoast Radio (EDM)" target="_blank" style="color: #cccccc; text-decoration: none;">Westcoast Radio (EDM)</a> · <a href="https://soundcloud.com/digitalstreams/sets/deephousehits" title="Best of Deep House (Vol. 02)" target="_blank" style="color: #cccccc; text-decoration: none;">Best of Deep House (Vol. 02)</a></div>`
    }, 
    {
        text :`Drum and bass (also written as "drum 'n' bass"; commonly abbreviated as "D&B", "DnB" or "D'n'B") is a genre of electronic music characterised by fast breakbeats (typically 165-185 beats per minute) with heavy bass and sub-bass lines, sampled sources, and synthesizers. The music grew out of breakbeat hardcore (and its derivatives of darkcore, and jungle).The popularity of drum and bass at its commercial peak ran parallel to several other homegrown dance styles. A major influence was the original Jamaican dub and reggae sound that came into London in the 1980s. By the 1990s, this had grown into the jungle/drum and bass sound which the UK is famous for. Another feature of the style is the complex syncopation of the drum tracks' breakbeat.Drum and bass subgenres include breakcore, ragga jungle, hardstep, darkstep, techstep, neurofunk, ambient drum and bass, liquid funk (a.k.a. liquid drum and bass), jump up, drumfunk, funkstep, sambass, and drill 'n' bass. `, 
        tabName : "Drum & Bass",
        audio: `<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/882397501&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/digitalstreams" title="Westcoast Radio (EDM)" target="_blank" style="color: #cccccc; text-decoration: none;">Westcoast Radio (EDM)</a> · <a href="https://soundcloud.com/digitalstreams/sets/technobass" title="Best of Drum &amp; Bass (Vol. 01)" target="_blank" style="color: #cccccc; text-decoration: none;">Best of Drum &amp; Bass (Vol. 01)</a></div>`
    },
    {
        text :`Tech house is a subgenre of house music that combines stylistic features of techno with house. The term tech house developed as a shorthand record store name for a category of electronic dance music that combined musical aspects of techno, such as "rugged basslines" and "steely beats," with the harmonies and grooves of progressive house. The music originally had a clean and minimal production style that was associated with techno from Detroit and the UK.`,
        tabName : "Progressive Tech House",
        audio: `<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/933599338&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/digitalstreams" title="Westcoast Radio (EDM)" target="_blank" style="color: #cccccc; text-decoration: none;">Westcoast Radio (EDM)</a> · <a href="https://soundcloud.com/digitalstreams/sets/newtracks" title="Best of Progressive Tech House" target="_blank" style="color: #cccccc; text-decoration: none;">Best of Progressive Tech House</a></div>`
    },
    {
        text :`Electro (or electro-funk) is a genre of electronic music and early hip hop directly influenced by the use of the Roland TR-808 drum machines, and funk. Records in the genre typically feature drum machines and heavy electronic sounds, usually without vocals, although if vocals are present they are delivered in a deadpan manner, often through electronic distortion such as vocoding and talkboxing. This is the main distinction between electro and previously prominent genres such as disco, in which the electronic sound was only part of the instrumentation.`,
        tabName : "Electro",
        audio: `<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/819362814&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/digitalstreams" title="Westcoast Radio (EDM)" target="_blank" style="color: #cccccc; text-decoration: none;">Westcoast Radio (EDM)</a> · <a href="https://soundcloud.com/digitalstreams/sets/electroworkout" title="Best Electro of All-Time (Vol. 01)" target="_blank" style="color: #cccccc; text-decoration: none;">Best Electro of All-Time (Vol. 01)</a></div>`
    },
]

const buttonList = document.querySelector(".menu__tab-list");
const contentWrapper = document.querySelector(".content__wrapper");
const contentList = document.querySelector(".content__list");


function initApp() {
    generateHTML();
    layoutSetup();
}
initApp();

function generateHTML() {
    for (let i = 0; i < tabContent.length; i++) {
        const tabItem = tabContent[i];
        const tabName = tabItem["tabName"];
        buttonList.insertAdjacentHTML("beforeend", `<li class="menu__tab-item"><button data-id="${i}" class="menu__tab-button">${tabName}</button></li>`);
        document.querySelectorAll(".menu__tab-button")[i].addEventListener("click", contentToggle);
    }
}

function layoutSetup() {
    document.querySelector(".menu__tab-button").classList.add("menu__tab-button--active");
    contentWrapper.insertAdjacentHTML("beforeend", tabContent[0]["text"]);
    contentList.insertAdjacentHTML("beforeend", tabContent[0]["audio"]);
}

function contentToggle(evt) {
    const currentBtn = evt.target;
    const currentBtnId = currentBtn.dataset.id;
    const currentText = tabContent[currentBtnId]["text"];
    const currentAudio = tabContent[currentBtnId]["audio"];

    resetContent();
    // todo:
    // function name(currentBtn, "menu__tab-button--active") {
    // }

    currentBtn.classList.add("menu__tab-button--active");
    contentWrapper.insertAdjacentHTML("beforeend", currentText);
    contentList.insertAdjacentHTML("beforeend", currentAudio);
}

function resetContent() {
    contentWrapper.innerHTML = "";
    contentList.innerHTML = "";
    document.getElementsByClassName("menu__tab-button--active")[0].classList.remove("menu__tab-button--active");
}
