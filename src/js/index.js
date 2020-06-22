import '../css/main.scss';
import 'jquery';


/** ============================================
** - Prevent CSS Transition Before Fully Loading -
** =============================================
**
*/
const preloader = document.querySelector('.preloader');
window.addEventListener('load', () => {
    // setTimeout(() => {  }, 500);
    preloader.classList.add('complete');
})


/** =============================
** - Load Random Color Schemes -
** ==============================
**
*/
window.addEventListener("DOMContentLoaded", function () {
    getColorScheme();
}, false);
let colors = ['CAF1DE', 'E1F8DC', 'FEF8DD', 'FFE7C7', 'F7D8BA'];
document.addEventListener('DOMContentLoaded', getColorScheme());

function getColorScheme() {
    const divs = document.querySelectorAll('.wrapper');
    // console.log(divs);
    const navs = document.querySelectorAll('.nav-wrapper');
    for (let i = 0; i < divs.length; i++) {
        let randomIndex = Math.floor(Math.random() * (colors.length));
        const newStyle = "#" + colors[randomIndex];
        // console.log(newStyle);
        divs[i].style.background = newStyle;
        navs[i].style.background = newStyle;
        colors = colors.filter((color, index) => index !== randomIndex);
    }
}
/* -----End of Color Schemes----- */


/** =============================
**  -----  Main Slides  -----
** ==============================
**
*/
const cardsRail = document.querySelector('.cards-track');
const cards = Array.from(cardsRail.children);
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const cardsNav = document.querySelector('.cards-nav');
const nav = cardsNav.children;
// cardsRail.innerHTML = cardsRail.innerHTML + cardsRail.innerHTML;
const cardWidth = cards[0].getBoundingClientRect().width;
cards.forEach((card, index) => card.style.left = index * cardWidth + 'px');
cardsRail.style.width = cardWidth * cards.length + 'px';
cardsNav.addEventListener('click', (e) => {
    const currentCard = cardsRail.querySelector('.current-card');
    const navs = e.currentTarget.children;
    let clickedNav = e.target.closest('.nav-wrapper');
    clickedNav.classList.add('nav-shadow');
    const nextCard = cards.find((card, index) => {
        return index == [...navs].indexOf(clickedNav) ? card : false;
    }
    );
    moveToCard(cardsRail, nextCard, currentCard);
})

rightArrow.addEventListener('click', () => {
    const currentCard = cardsRail.querySelector('.current-card');
    const nextCard = currentCard.nextElementSibling;
    hideArrow(leftArrow);
    if (cards.indexOf(nextCard) < cards.length) {
        moveToCard(cardsRail, nextCard, currentCard);
        return cards.indexOf(nextCard) === (cards.length - 1) ? rightArrow.classList.add('disable-arrow') : null;
    }
});
leftArrow.addEventListener('click', () => {
    const currentCard = cardsRail.querySelector('.current-card');
    const prevCard = currentCard.previousElementSibling;
    hideArrow(rightArrow);
    if (cards.indexOf(prevCard) >= 0) {
        moveToCard(cardsRail, prevCard, currentCard);
        return cards.indexOf(prevCard) === 0 ? leftArrow.classList.add('disable-arrow') : null;
    }
});
function moveToCard(track, targetCard, currentCard) {
    cardsRail.style.transform = 'translateX(-' + targetCard.style.left + ')';
    currentCard.classList.remove('current-card');
    targetCard.classList.add('current-card');
}

function hideArrow(arrow) {
    return arrow.classList.contains('disable-arrow') ? arrow.classList.remove('disable-arrow') : null;
}

/** ================================
** --   Skills Progress Bars    --
** =================================
**
*/


/* ----End of Skills Progress Bars----- */
/** ================================
** --Click To Bring Tab To front--
** =================================
**
*/
// const cards = document.querySelector('.cards');
// const cardsArray = [...document.querySelectorAll('.card')];
// // console.log(cardsArray);
// function TabToFront(e) {
//     const card = e.target.closest(".card");
//     // console.log(card);
//     if (card.classList.contains('to-front')) {
//         return card.classList.remove('to-front')
//     } else {
//         cardsArray.forEach(card => card.classList.remove('to-front'));
//         return card.classList.add('to-front')
//     }
// }
// cards.addEventListener('click', (e) => { TabToFront(e); });
/* ----End of Click To Bring Tab To front----- */




/** ================
** - Tags Switch -
** ================ */
// window.onload = function () {
//     var tagSlides = document.querySelector('.tag-slides');
//     var Btns = document.querySelectorAll('.tag-btns button');
//     var nDiv = tagSlides.getElementsByTagName("div");
//     for (var i = 0; i < Btns.length; i++) {
//         Btns[i].index = i;
//         Btns[i].onclick = function () {
//             for (i = 0; i < Btns.length; i++) {
//                 nDiv[i].style.display = "none";
//             }
//             nDiv[this.index].style.display = "block";
//         };
//     }

// };
/*End of Tag Switch */








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
// const contents = document.querySelectorAll('.content-range');
// const contentWidth = contents[0].closest('.content-wrapper').clientWidth;
// // console.log(contentWidth);
// contents.forEach((content, index) => {
//     content.style.width = contentWidth * (100 - 12 * index - 5 * 2) / 100 + 'px';
// });
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

