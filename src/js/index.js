console.log('in js file');


/** ==========================
 ** - Remove LocalStorage Key -
** ==========================
**
*/
window.onbeforeunload = function () { localStorage.removeItem('loginPopedUp'); return ''; };

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





/** ===========================================
** - DEPRECATED:Assign Main Random Colors To Icons-
** ============================================
**
*/
// let colors = ['#CAF1DE', '#E1F8DC', '#FEF8DD', '#FFE7C7', '#F7D8BA'];
// document.addEventListener('DOMContentLoaded', getColorScheme());
// const contactsIcons = document.querySelectorAll('.personal-contacts i');
// console.log(contactsIcons);
// window.addEventListener('load', () => {
//     contactsIcons.forEach(icon => {
//         for (let i = 0; i < [...contactsIcons].length; i++) {
//             let randomIndex = Math.floor(Math.random() * (colors.length));
//             icon.style.color = `darken(${colors[randomIndex]},10%)`;
//             colors = colors.filter((color, index) => index !== randomIndex);
//         }
//     });
// });





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




/** =========================================== 
** - Menu Close Button + Toggle Responsive Menu  -
** =========================================== */

const menuSpan = document.querySelector('.nav-btn span');
const centerBar = document.querySelector('.nav-btn span i');
const navMenu = document.querySelector('.nav-menu');
const cardsNav = document.getElementById('cards-nav');

menuSpan.addEventListener('click', showHideMenu);
window.addEventListener('touchstart', function (e) {
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
** ==============================*/
const cards = Array.from(cardsRail.children);
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const navWraps = document.querySelectorAll('.nav-wrapper');
// const cardWidth = cards[0].getBoundingClientRect().width;
const mainWidth = document.querySelector('.main').getBoundingClientRect().width;

// console.log(mainWidth);
// console.log(Math.floor(mainWidth));
// console.log(Math.round(mainWidth));
// console.log(document.documentElement.clientWidth);
const responsiveWidth = mainWidth / document.documentElement.clientWidth * 100;
cards.forEach((card, index) => { card.style.left = Math.floor(index * responsiveWidth) + 'vw'; });

//Cards track width based on all cards' width
cardsRail.style.width = responsiveWidth * cards.length + 'vw';

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
//Left/Right arrow clicks and slides move
rightArrow.addEventListener('click', ToRightSlide);
leftArrow.addEventListener('click', ToLeftSlide);

//keyboard controls left/right
document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:
            //left
            e.preventDefault();
            ToLeftSlide();
            break;
        case 39:
            //right
            e.preventDefault();
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
    if (dist > 80) {
        ToRightSlide();
    } else if (dist < -80) {
        ToLeftSlide();
    } else {
        return false;
    }
}
/* ----End of Main Slides-Touch Screen----- */



/** ================================
** --Animate When Slide Moves In--
** =================================
**
*/
// currentCard.addEventListener('')



/* ----End of Animation When Slide Moves In----- */



/** ===================================
** --  About Slide:Overal Level Rating  --
** ====================================
**
*/
const starsRating = document.querySelector('.stars-rating');
window.addEventListener('load', () => {
    handleStarsLength(starsRating, 0.4);
});

/* ----End of About Page:Level Rating----- */




/** ======================================================
 ** ---DEPRECATED: IN PHP INSTEAD: Display Recent Works ---
 ** ======================================================
 **
 */
// async function getWorksData() {
//     const res = await fetch(`http://localhost/profile-css-html-js/mvc/index.php`);
//     const data = await res.json();
//     console.log(data);
// }

// const works = [
//     { id: 1, name: 'BYO Homes', level: '0.4', time: '02/2020', description: 'A maximum 20-hour work created on Wordpress early 2020,A maximum 20-hour work created on Wordpress early 202,A maximum 20-hour work created on Wordpress early 20A maximum 20-hour work created on Wordpress early 2020,A maximum 20-hour work created on Wordpress early 202,A maximum 20-hour work created on Wordpress early 2022', img: './css/img/byohomes500x348.jpg' },
//     { id: 2, name: 'Woodend Golf Club', level: '0.5', time: '01/2020', description: 'A maximum 20-hour work created on Wordpress early 2020,A maximum 20-hour work created on Wordpress early 202,A maximum 20-hour work created on Wordpress early 202', img: './css/img/woodendgolfclub 500x348.jpg' }
// ];

// const worksFrame = document.querySelector('.frame-wrapper');
// window.addEventListener('load', () => {
//     works.forEach(work => {
//         const workDiv = document.createElement('div');
//         workDiv.classList.add('website-frame');
//         const worksList = `<div class="website-screenshot">
//         <div class="website-img" onclick="document.querySelector('.modal-img').style.display = 'block';">
//         <a href="${work.img}" onclick="event.preventDefault();">
//             <img src=" ${work.img} " alt=" ${work.name} " id="img-"+${work.id}/></a>
//         </div>
//         <div class="website-text">
//             <div>
//                 <a href="">
//                     <h4> ${work.name} </h4>
//                 </a>
//                 <div class='project-level'>
//                 <span> <strong>Difficulty:</strong></span>
//                 <div class="stars-track">
//                     <div class="progress">
//                         <div class="star"><i class="fa fa-star"></i></div>
//                         <div class="star"><i class="fa fa-star"></i></div>
//                         <div class="star"><i class="fa fa-star"></i></div>
//                         <div class="star"><i class="fa fa-star"></i></div>
//                         <div class="star"><i class="fa fa-star"></i></div>
//                     </div>
//                     <div class="star"><i class="fa fa-star-o"></i></div>
//                     <div class="star"><i class="fa fa-star-o"></i></div>
//                     <div class="star"><i class="fa fa-star-o"></i></div>
//                     <div class="star"><i class="fa fa-star-o"></i></div>
//                     <div class="star"><i class="fa fa-star-o"></i></div>
//                 </div>
//             </div>
//             <span> <strong>Time:</strong>${work.time}</span>
//                 <p>${work.description}
//             </div>
//             </p>
//         </div>`;
//         workDiv.innerHTML = worksList;
//         worksFrame.appendChild(workDiv);
//         handleStarsLength(workDiv, work.level);
//     });
// });

/*End of Displaying Works */


/** =====================================
 ** --- Display Recent Works Stars Level ---
 ** ====================================
 **
 */
function handleStarsLength(addedDiv, percent) {
    // Calculate the length of star progress bar
    const starsTrack = addedDiv.querySelector('.stars-track');
    const progress = addedDiv.querySelector('.progress');
    const horrowStars = addedDiv.querySelectorAll('.stars-track > .star');
    const hardStars = addedDiv.querySelectorAll('.progress > .star');
    const starWidth = horrowStars[0].offsetWidth;
    //Setting each horrow star width,left and position
    starLeft([...horrowStars]);
    //Setting each hard stars width,left and position
    starLeft([...hardStars]);
    //Setting starTrack's whole width
    starsTrack.style.width = starWidth * (horrowStars.length) + 'px';

    //progress bar to display the skill level,default:60%
    progress.style.width = percent * starWidth * (horrowStars.length) + 'px';
    //setting each star style.left;
    function starLeft(stars) {
        stars.map((star, index) => {
            stars[index].style.left = starWidth * (index) + 'px';
        });
    }
}

//Jquery Ajax here to get all the skills' levels for work projects
// const projects = document.querySelectorAll('.project-level');
// $('.experience').ready(function () {
//     $.ajax({
//         type: 'GET',
//         url: "http://localhost/profile-css-html-js/mvc/profile/getStarsLevel",
//         dataType: 'json',
//         success: function (data) {
//             for (let i = 0; i < projects.length; i++) {
//                 handleStarsLength(projects[i], parseFloat(data[i].content_detail));
//             }
//         },
//         error: function (response) {
//             alert('something wrong');
//         }
//     });
// });
/*End of Displaying Works Stars Level */


/** ================================
 ** --   Show Modal Images    --
 ** ================================
**
*/
// const imgDivs = document.querySelectorAll('.content-experience');
// console.log(imgDivs);
// debugger;
// const experienceContent = document.querySelector('.content-experience');
// imgDivs.forEach(imgDiv => {
//     imgDiv.addEventListener('click', (e) => {
//         e.preventDefault;
//         console.log(e.target.getAttribute('href'));
//         const imgModal = document.createElement('div');
//         imgModal.classList.add('.modal-img');
//         experienceContent.insertBefore(imgModal);
//         imgModal.innerHTML = `hello`;
//     })
// })

/*End of Displaying Modal Images */

/** ================================
** -- Display:Skills Progress Bars  --
** =================================
**
*/

// Display the skills level progress divs
// const progressDiv = document.querySelector('.progress-bars');
// $('.Skills').ready(function () {
//     $.ajax({
//         type: 'GET',
//         url: "http://localhost/profile-css-html-js/mvc/profile/getSkillsInfo",
//         dataType: 'json',
//         success: function (data) {
//             const skillGroup = Math.round(data.length / 3);
//             data.map(record=>{})
//             debugger;

//             for (let i = 0; i < data.length; i++) {
//                 // console.log(data[i].content_title);
//                 const skillDiv = document.createElement('div');
//                 skillDiv.classList.add('progress-bar');
//                 skillDiv.innerHTML = `
// <div class='skill'>
// <span class='skill-title'>${data[i].content_title}</span>
// </div>
// `;
//                 progressDiv.appendChild(skillDiv);
//                 // handleStarsLength(skillDiv, sample.level);
//             }
//         },
//         error: function (response) {
//             alert('something wrong');
//         }
//     });
// });
const skillsSample = [
    { id: 1, skill: 'Javascript', level: 0.6 },
    { id: 2, skill: 'HTML', level: 0.9 },
    { id: 3, skill: 'CSS', level: 0.8 }
];
const progressDiv = document.querySelector('.progress-bars');
// console.log(progressDiv);

window.addEventListener('load', () => {
    skillsSample.forEach(
        sample => {
            const skillDiv = document.createElement('div');
            skillDiv.classList.add('progress-bar');
            // skillDiv.setAttribute('id', 'skill-' + `${sample.skill}`);
            skillDiv.innerHTML = `
            <div class="skill">
            <span class="skill-title">${sample.skill}</span>
            <span class="skill-level">${sample.level * 100}%</span>
        </div>
        <div class="stars-track">
            <div class="progress">
                <div class="star"><i class="fa fa-star"></i></div>
                <div class="star"><i class="fa fa-star"></i></div>
                <div class="star"><i class="fa fa-star"></i></div>
                <div class="star"><i class="fa fa-star"></i></div>
                <div class="star"><i class="fa fa-star"></i></div>
            </div>
            <div class="star"><i class="fa fa-star-o"></i></div>
            <div class="star"><i class="fa fa-star-o"></i></div>
            <div class="star"><i class="fa fa-star-o"></i></div>
            <div class="star"><i class="fa fa-star-o"></i></div>
            <div class="star"><i class="fa fa-star-o"></i></div>
        </div>
        <div class="details">
            <span>
                <div class="level-btn">
                    <a href="/">
                        <i class="fa fa-link" aria-hidden="true"></i>
                    </a>
                </div>
            </span>
            <span>
                <div class="level-btn">
                    <a href="/">
                        <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                    </a>
                </div>
            </span>
        </div>
            `;
            progressDiv.appendChild(skillDiv);
            handleStarsLength(skillDiv, sample.level);
        }
    );
});


/* ----End of Skills Progress Bars----- */








/** ===========================
 ** ----- Hide Modal -------
 ** ===========================
 **
 */
// Get the modal
const modalLogin = document.querySelector('.modal-login');
const modalNote = document.querySelector('.modal-note');
const noteDisplay = modalNote.querySelector('.note-display');
const modalDelete = document.querySelector('.modal-delete');
const deleteCancel = document.querySelector('.confirm-n');
const imgCancel = document.querySelector('.modal-img');
const modalArray = [modalLogin, modalNote, modalDelete];
const noteBtns = document.querySelectorAll('button[data-id]');
[...noteBtns].forEach(btn => {
    btn.addEventListener('click', (e) => {
        const noteId = e.target.getAttribute('data-id');
        //Get note data from fetchAPI
        fetchNoteInfo(noteId);
        //Check if session exists,flag in localStorage
        controlModalNoteOpen();
    })
});

//Get note data from fetchAPI
function fetchNoteInfo(noteId) {
    fetch(`notes/getSingleNote/${noteId}`, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw (response.status + ': ' + Response.responseText);
            }
            return response.json();
        })
        .then(data => {
            // const parsedData = JSON.parse(data);
            noteDetails(data);
        })
        .catch(error => console.log(error))
}
function modalOpen(modal) {
    modal.style.display = 'block';
}
//Check if session exists,flag in localStorage
function controlModalNoteOpen() {
    if (sessionStorage.getItem("user_id") !== null) {
        modalOpen(modalNote);
    } else {
        //Remind to login once only,if 'use_id'not there,flag in localstorage
        if (localStorage.getItem('loginPopedUp') !== "1") {
            localStorage.setItem('loginPopedUp', 1);
            modalOpen(modalLogin);
            return;
        }
        modalOpen(modalNote);
    }
}
//Close modal and clean modalNote innerHTML
modalArray.forEach(modal => modal.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
        if (modal == modalNote) {
            modalNote.innerHTML = null;
        } else if (modal == modalLogin) {
            modalOpen(modalNote);
        }
    }
}
));
//Display the note contents
function noteDetails(data) {
    const note = document.createElement('div');
    note.classList.add('note', 'note-display', 'animate');
    note.innerHTML = `
    <div class="note-title">
        <h4> <strong>${data.title}</strong></h4>
        <div class="note-category">
            <span class="note-tag">
                <h5>${data.category}</h5>
            </span>
            <span class="note-tag">
                <h5>${data.created_at}</h5>
            </span>
        </div>
    </div>
    <div class="note-body">
        <p>
        ${data.body}
        </p>
    </div>
    <div class="note-footer">

        <button //REMIND: SHOULD BE REPLY CONTENT
            onclick="document.querySelector('.modal-note').style.display='none'"
            style="width:auto;">ok</button>
    </div>
    `;
    modalNote.appendChild(note);
}


deleteCancel.addEventListener('click', () => { modalDelete.style.display = 'none'; console.log('herehere'); })
/*End of Hiding Modal */

/** ==============================
 ** - ReadMore Btn Gets Note Info -
 ** ==============================
 **
 */
// [...noteBtns].forEach(btn => btn.addEventListener('click', (e) => {
//     console.log(e.target.getAttribute('data-id'));
//     const noteId = e.target.getAttribute('data-id');
// fetch('notes/getSingleNote', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//         'data': noteId
//     })
//         .then((response) => {
//             if (!response.ok) {
//                 throw (response.status + ': ' + Response.responseText);
//             }
//             return response.json();
//         })
//         .then((data) => {
//             // modalLogin.style.display = 'block'?modalLogin.style.display = 'none':null;
//             const parsedData = JSON.parse(data);
//             console.log(parsedData);
//         })
//         .catch(error => console.log(error))
// })
// }));



/* ----End of ReadMore Btn Gets Note Info----- */




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





/** =================================
 ** ----- Hide Contact Content -------
 ** =================================
 **
 */
const contactTitles = document.querySelectorAll('.card-contact .card-details');
const contactBlocks = document.querySelectorAll('.card-contact .content-range');
// const arrowIcons=document.querySelectorAll('.card-contact .content-range')
// console.log([...contactBlocks][0]);
for (let i = 0; i < contactTitles.length; i++) {
    contactTitles[i].addEventListener('click', () => {
        // contactBlocks[]
    })
}






/*End of Hiding Contact Content */

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







/** =====================
 ** - Contact Form Sumit -
 ** =====================
 **
 */
function checkFormSumit() {
    const checkform = document.getElementById('check').value;
    console.log(checkform);
}


/*End of Contact Form Sumit */


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

