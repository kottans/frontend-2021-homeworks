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

window.addEventListener("load", addContent, stayActive);
    
function showMonth({target}) {
        if (target.classList.contains('month')) {
            const dataMonth = target.getAttribute('data-month');
            for (let i = 0; i < month.length; i++){
               document.querySelector('.month.active').remove('active');
            }
            target.classList.add('active');
            for (let i = 0; i < content.length; i++){
                if (dataMonth === i) {
                    content[i].style.display = "block";   
                } else {
                    content[i].style.display = "none";  
                    pauseAudio(i);
                }
            }
        }
    }

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

function stayActive() {
    content[0].style.display = "block";
    document.querySelector('.nav').addEventListener('click', showMonth);
}
