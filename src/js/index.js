import '../css/main.scss';


/* -----Load Random Color Schemes----- */
window.addEventListener("DOMContentLoaded", function () {
    getColorScheme();
}, false);
let colors = ['CAF1DE', 'E1F8DC', 'FEF8DD', 'FFE7C7', 'F7D8BA'];
document.addEventListener('DOMContentLoaded', getColorScheme());

function getColorScheme() {
    const divs = document.querySelectorAll('.content-wrapper');
    // console.log(divs);
    const navs = document.querySelectorAll('.nav-wrapper');
    for (let i = 0; i < divs.length; i++) {
        let randomIndex = Math.floor(Math.random() * (colors.length));
        const newStyle = "url('../img/bg-main.png') repeat #" + colors[randomIndex];
        // console.log(newStyle);
        divs[i].style.background = newStyle;
        navs[i].style.background = newStyle;
        colors = colors.filter((color, index) => index !== randomIndex);
    }
}
/* -----End of Color Schemes----- */


/* ----Click To Bring Tab To front----- */
const cards = document.querySelector('.cards');
const cardsArray = [...document.querySelectorAll('.card')];
// console.log(cardsArray);
function TabToFront(e) {
    const card = e.target.closest(".card");
    // console.log(card);
    if (card.classList.contains('to-front')) {
        return card.classList.remove('to-front')
    } else {
        cardsArray.forEach(card => card.classList.remove('to-front'));
        return card.classList.add('to-front')
    }
}
cards.addEventListener('click', (e) => { TabToFront(e); });





/* ----End of Click To Bring Tab To front----- */













/* ----Bee Flying Path----- */
// const flightPath = {
//     curviness: 1.25,
//     autoRotate: true,
//     values: [{ x: 100, y: -20 }]
// }

// const tl = new TimelineLite();
// tl.add(
//     TweenLite.to('.bee', 3, { bezier: flightPath, ease: Power1.easeInOut })
// )
/* ----End of Bee Flying Path----- */




/* ----Set Content Size----- */
const contents = document.querySelectorAll('.content-range');
const contentWidth = contents[0].closest('.content-wrapper').clientWidth;
// console.log(contentWidth);
contents.forEach((content, index) => {
    content.style.width = contentWidth * (100 - 12 * index - 5 * 2) / 100 + 'px';
});
/* ----End of Setting Content Size----- */


/* ----Experience Card: Image Hovering Effect----- */

// const imgCards = document.querySelectorAll('.website-screenshot');
// const imgFrames = document.querySelectorAll('.website-frame');
// const imgsWidth = document.querySelector('.experience .content-range');
// imgFrames.forEach((imgFrame, index) => imgFrame.addEventListener('mousemove', (e) => {
//     // console.log(imgsWidth.offsetWidth);
//     posX = (imgsWidth.offsetWidth / 2 - e.pageX) / 20;
//     posY = (imgsWidth.offsetWidth / 2 - e.pageY) / 10;
//     console.log(imgCards[index]);
//     imgCards[index].setAttribute('style', "transform: rotateY(" + posX + "deg) rotateX(" + posY + "deg);");
//     console.log(imgCards[index].style);
// }))

/* ----End of Experience Card: Image Hovering Effect----- */




        // 

