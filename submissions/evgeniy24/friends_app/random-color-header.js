let header = document.querySelector('.header-name');
let lettersArr = header.innerHTML.split('');
//convert int to hex
const colToHex = function(c) {
    //colors are bright enough?
    let color = (c < 75) ? c + 75 : c
    let hex = color.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
}

// colToHex to concatenate a full 6 digit hex code
const rgbToHex = function(r,g,b) {
    return '#' + colToHex(r) + colToHex(g) + colToHex(b);
} 

const getRandomColor = function() {
    return rgbToHex (
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
    )
}

Array.prototype.randomColor = function() {
 let html = '';
 this.map( function(letter) {
     let color = getRandomColor();
     return html += 
     `<span style= color:${color}>
      ${letter}
      </span>`
 })
 return html;
}

header.innerHTML = lettersArr.randomColor();