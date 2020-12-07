const content = document.getElementsByClassName("content");
const month = document.getElementsByClassName("month");
const imagesPaths = ["images/jan.jpg","images/feb.jpg","images/mar.jpg",
    "images/apr.jpg", "images/may.jpg", "images/june.jpg",
    "images/july.jpg", "images/aug.jpg", "images/sep.jpg",
    "images/oct.jpg", "images/nov.jpg", "images/dec.jpg"];
 
const soundsPaths = ["sounds/jan.mp3", "sounds/feb.mp3", "sounds/mar.mp3",
"sounds/apr.mp3","sounds/may.mp3","sounds/jun.mp3",
"sounds/jul.mp3","sounds/aug.mp3","sounds/sep.mp3",
    "sounds/oct.mp3", "sounds/nov.mp3", "sounds/dec.mp3"];    

function openMonth(evt, monthName) {
    for (let i = 0; i < content.length; i++) {
        content[i].style.display = "none"; 
        pauseAudio(i);
        }
    document.getElementById(monthName).style.display = "block";
    evt.currentTarget.classList.add('active');
    document.querySelector('.month.active').classList.remove('active');
}

window.addEventListener("load", addContent);
function addContent (){
    for (let i = 0; i < content.length; i++) {    
        content[i].innerHTML += '<img class="content_img" src="' + imagesPaths
    [i] + '" alt="Nice picture of nature">';
        content[i].innerHTML;    
        content[i].insertAdjacentHTML("afterbegin", "<audio controls><audio>");
        audTag = document.querySelectorAll("audio");
        audTag[i].innerHTML = '<source src="' + soundsPaths[i] + ' "type="audio/mp3", controls="controls">';
        audTag[i].innerHTML += "Your browser does not support the audio element.";
    }
};

function pauseAudio(i) {
    audTag[i].pause();
} 