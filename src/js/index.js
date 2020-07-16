import '../css/main.scss';
import 'jquery';




/** =================
 ** - Embed Google Map -
** ===================
**
*/
function initMap() {
    const options = {
        center: { lat: -41.2865, lng: 174.7762 },
        zoom: 14
    };
    const map = new google.maps.Map(document.getElementById("map"), options);
    const flag = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

    const marker = new google.maps.Marker({
        // position: wellington lat: -41.2865, lng: 174.7762 
        position: { lat: -41.2865, lng: 174.7762 },
        map: map,
        icon: flag
    });
    const infowindow = new google.maps.InfoWindow({
        content: "<p>Marker Location:" + marker.getPosition() + "</p>"
    });

    google.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
    });
};
window.initMap = initMap;



/*End of Google Map */



/** ===================================
** - Function:Assign Random Main Colors -
** ====================================
**
*/

// let colors = ['#CAF1DE', '#E1F8DC', '#FEF8DD', '#FFE7C7', '#F7D8BA'];
// document.addEventListener('DOMContentLoaded', getColorScheme());

// function getColorScheme() {
//     const divs = document.querySelectorAll('.wrapper');
//     const navs = document.querySelectorAll('.nav-wrapper');
//     for (let i = 0; i < divs.length; i++) {
//         let randomIndex = Math.floor(Math.random() * (colors.length));
//         const newStyle = colors[randomIndex];
//         divs[i].style.background = "url('../img/bg-main.jpg') repeat " + newStyle;
//         colors = colors.filter((color, index) => index !== randomIndex);
//     }
// }
/* -----End of Random Content Background----- */




/** ============================================
** - Prevent CSS Transition Before Fully Loading -
** =============================================
**
*/
const preloader = document.querySelector('.preloader');
const currentCard = document.querySelector('.current-card');
const cardsRail = document.querySelector('.cards-track');
window.addEventListener('load', () => {
    // setTimeout(() => {  }, 500);
    preloader.classList.add('complete');
    cardsRail.style.transform = 'translateX(-' + currentCard.style.left + ')';
});


/** ===============
** - Load About Page -
** ================
**
*/
// const currentCard = document.querySelector('.current-card');
// const cardsRail = document.querySelector('.cards-track');
// window.addEventListener('load', () => {
//     cardsRail.style.transform = 'translateX(-' + currentCard.style.left + ')';
// })



/** =========================================== 
** - Menu Close Button + Toggle Responsive Menu  -
** =========================================== */

const menuSpan = document.querySelector('.nav-btn span');
const centerBar = document.querySelector('.nav-btn span i');
const navMenu = document.querySelector('.nav-menu');
const cardsNav = document.getElementById('cards-nav');

menuSpan.addEventListener('click', showHideMenu);
window.addEventListener('click', function (e) {
    if (!cardsNav.contains(e.target)) {
        hideMenu();
    }
});
function showHideMenu() {
    menuSpan.classList.toggle("active");
    centerBar.classList.toggle("active");
    navMenu.classList.toggle('toggle-menu');
}

function hideMenu() {
    menuSpan.classList.remove("active");
    centerBar.classList.remove("active");
    navMenu.classList.remove('toggle-menu');
}
/*End of Bars clicked to turn into close icon */


/** =============================
**  -  Main Slides Scrolling -
** ==============================
**
*/
const cards = Array.from(cardsRail.children);
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const navWraps = document.querySelectorAll('.nav-wrapper');
// const cardWidth = cards[0].getBoundingClientRect().width;
cards.forEach((card, index) => card.style.left = index * 90 + 'vw');
cardsRail.style.width = 90 * cards.length + 'vw';

navWraps.forEach(nav => {
    nav.addEventListener('click', (e) => {
        const currentCard = cardsRail.querySelector('.current-card');
        const clickedNav = e.currentTarget;
        const clickedIndex = [...navWraps].indexOf(clickedNav);
        const currentIndex = cards.indexOf(currentCard);
        //hightlight current nav
        hightlightNav(navWraps[currentIndex], navWraps[clickedIndex]);
        //able/disable left/right arrows
        if (clickedIndex === 0) { hideShowArrow(leftArrow); }
        else if (clickedIndex === navWraps.length - 1) { hideShowArrow(rightArrow); }
        else if (clickedIndex !== 0 || navWraps.length - 1) {
            showArrow(leftArrow);
            showArrow(rightArrow);
        }
        const nextCard = cards.find((card, index) => {
            return index === clickedIndex ? card : false;
        }
        );
        moveToCard(cardsRail, nextCard, currentCard);
    });
});

rightArrow.addEventListener('click', ToRightSlide);
leftArrow.addEventListener('click', ToLeftSlide);

/* ----keyboard controls left/right----- */
document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:
            //left
            // e.preventDefault();
            ToLeftSlide();
            break;
        case 39:
            //right
            // e.preventDefault();
            ToRightSlide();
            break;
    }
}

//highlight current nav
function hightlightNav(currentNav, targetNav) {
    currentNav.classList.remove('highlight');
    targetNav.classList.add('highlight');
}

//slide left to the sibling card
function ToLeftSlide() {
    const currentCard = cardsRail.querySelector('.current-card');
    const prevCard = currentCard.previousElementSibling || currentCard;
    const prevIndex = cards.indexOf(prevCard);
    const currentIndex = cards.indexOf(currentCard);
    //hightlight current nav
    hightlightNav(navWraps[currentIndex], navWraps[prevIndex]);
    //activate arrow when necessary
    showArrow(rightArrow);
    //move to the requested card
    if (cards.indexOf(prevCard) >= 0) {
        moveToCard(cardsRail, prevCard, currentCard);
        return cards.indexOf(prevCard) === 0 ? leftArrow.classList.add('disable-arrow') : null;
    }
}
//slide right to the sibling card
function ToRightSlide() {
    const currentCard = cardsRail.querySelector('.current-card');
    const nextCard = currentCard.nextElementSibling || currentCard;
    const nextIndex = cards.indexOf(nextCard);
    const currentIndex = cards.indexOf(currentCard);
    //hightlight current nav
    hightlightNav(navWraps[currentIndex], navWraps[nextIndex]);
    //activate arrow when necessary
    showArrow(leftArrow);
    //move to the requested card
    if (cards.indexOf(nextCard) < cards.length) {
        moveToCard(cardsRail, nextCard, currentCard);
        return cards.indexOf(nextCard) === (cards.length - 1) ? rightArrow.classList.add('disable-arrow') : null;
    }
}
//move to a certain card
function moveToCard(track, targetCard, currentCard) {
    cardsRail.style.transform = 'translateX(-' + targetCard.style.left + ')';
    currentCard.classList.remove('current-card');
    targetCard.classList.add('current-card');
}

//activate disabled arrows
function showArrow(arrow) {
    return arrow.classList.contains('disable-arrow') ? arrow.classList.remove('disable-arrow') : null;
}

//activate/deactivate arrows
function hideShowArrow(arrow) {
    return arrow.classList.contains('disable-arrow') ? arrow.classList.remove('disable-arrow') : arrow.classList.add('disable-arrow');
}


/** =============================
**  -Main Slides-Touch Screen-
** ==============================
**
*/
cardsRail.addEventListener('touchstart', handleTouchStart, false);
cardsRail.addEventListener('touchend', handleTouchEnd, false);
// cardsRail.addEventListener('touchmove', handleTouchMove, false);
let startX;
let endX;
function handleTouchStart(e) {
    startX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    endX = e.changedTouches[0].clientX;
    const dist = startX - endX;
    if (dist > 0) {
        ToRightSlide();
    } else if (dist < 0) {
        ToLeftSlide();
    } else {
        return false;
    }
}
/* ----End of Main Slides-Touch Screen----- */

/** ================================
** --   Skills Progress Bars    --
** =================================
**
*/
const starsTrack = document.querySelector('.stars-track');
const progress = document.querySelector('.progress');
const horrowStars = document.querySelectorAll('.stars-track > .star');
const hardStars = document.querySelectorAll('.progress > .star');
const starWidth = horrowStars[0].offsetWidth;


//Setting each horrow star width,left and position
starLeft([...horrowStars]);
//Setting each hard stars width,left and position
starLeft([...hardStars]);
//Setting starTrack's whole width
starsTrack.style.width = starWidth * (horrowStars.length) + 'px';

window.onload = (() => { setPercent(); });

//progress bar to display the skill level
function setPercent(percent = 0.6) {
    progress.style.width = percent * starWidth * (horrowStars.length) + 'px';
    //Moving mouse inside progress bar to get new level

}


//setting each star style.left;
function starLeft(stars) {
    stars.map((star, index) => {
        stars[index].style.left = starWidth * (index) + 'px';
    });
}

/* ----End of Skills Progress Bars----- */






/** ==========================  
 ** - About Page:Tag Buttons -
 ** ========================= */
// .btn - highlight
const tagBtns = document.querySelectorAll('.main-btns li button');
[...tagBtns].forEach(btn => {
    btn.addEventListener('click', (e) => {
        removeHighlight();
        const clickedBtn = e.currentTarget;
        clickedBtn.classList.add('btn-highlight');
    });
})
function removeHighlight() {
    tagBtns.forEach(btn => btn.classList.contains('btn-highlight') ? btn.classList.remove('btn-highlight') : null);
}



/* ----End of Skills Progress Bars----- */

/** ================ 
** - Tags Switch -

** ================ */
window.addEventListener('load', () => {
    var tagSlides = document.querySelector('.content-about');
    var Btns = document.querySelectorAll('.main-btns button');
    var nSlides = tagSlides.querySelectorAll(".tag-slide");
    for (var i = 0; i < Btns.length; i++) {
        Btns[i].index = i;
        Btns[i].onclick = function () {
            nSlides.forEach(slide => {
                slide.classList.remove('tag-slide-in');
                slide.classList.add('tag-slide-fade');
            });
            nSlides[this.index].classList.remove('tag-slide-fade');
            nSlides[this.index].classList.add('tag-slide-in');

        };
    }
});

/*End of Tag Switch */



/** ===========================
 ** --Show/Hide Login Modal --
 ** ===========================
 **
 */
// Get the modal
const modal = document.querySelector('.modal-login');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
/*End of Login Modal */



/** =========================
 ** - Contact Form Validation -
 ** ========================
 **
 */

const inputNodes = document.querySelectorAll('.contacts-validate .input100');
const newInputs = Array.from(inputNodes);
//remove alert message when input on focus
[...newInputs].forEach(input => {
    input.addEventListener('focus', function () {
        hideValidate(input);
        this.classList.remove('true-validate');
    })
});

//validate input value when on blur
[...newInputs].forEach(input => {
    input.addEventListener('blur', function () {
        if (validate(input) === false) {
            showValidate(input);
        } else {
            this.parentElement.classList.add('true-validate');
        }
    })
});
//function: validate the input value
function validate(input) {
    const trimValue = input.value.trim();
    if (input.getAttribute("type") === 'email' || input.getAttribute('name') === 'email') {
        if (trimValue.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            return false;
        };
    } else {
        if (trimValue == '') {
            return false;
        }
    };
};
//function: show validate alert message
function showValidate(input) {
    const alertNode = input.parentElement;
    alertNode.classList.add('alert-validate');
}
//function: hide alert message when input on focus
function hideValidate(input) {
    const alertNode = input.parentElement;
    alertNode.classList.remove('alert-validate');
}

/*End of Validating Contact Form */

/** ===============================
 ** - Submit Button Recaptcha -
 ** ================================
 **
 */
function onSubmit(e) {
    e.preventDefault();
    grecaptcha.ready(function () {
        grecaptcha.execute('6LfgI64ZAAAAAGQAHbRF8-FkXXAT6baiHzAiSOQj', { action: 'submit' }).then(function (token) {
            console.log(token);
        });
    });
}
const btnSubmit = document.querySelector('.submit-button');
btnSubmit.addEventListener('click', onSubmit);
/*End of Button Submit Recaptcha */



/** ===============================
** - Load Random Content Background -
** ================================
**
*/
// window.addEventListener("DOMContentLoaded", function () {
//     getColorScheme();
// }, false);
// let colors = ['#CAF1DE', '#E1F8DC', '#FEF8DD', '#FFE7C7', '#F7D8BA'];
// document.addEventListener('DOMContentLoaded', getColorScheme());

// function getColorScheme() {
//     const divs = document.querySelectorAll('.wrapper');
//     const navs = document.querySelectorAll('.nav-wrapper');
//     for (let i = 0; i < divs.length; i++) {
//         let randomIndex = Math.floor(Math.random() * (colors.length));
//         const newStyle = colors[randomIndex];
//         divs[i].style.background = "url('../img/bg-main.jpg') repeat " + newStyle;
//         colors = colors.filter((color, index) => index !== randomIndex);
//     }
// }
/* -----End of Random Content Background----- */


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

