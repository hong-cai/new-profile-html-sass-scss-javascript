
/**
 * ------------------------------------------------------------------------
 * - DISABLE REGISTER BUTTON IF 'I agree to the terms of service.' NOT TICKED-
 * ------------------------------------------------------------------------
 */
regCheck = document.getElementById('reg-check');
regBtn = document.querySelector('.card-footer button[type=submit]');
if (regCheck && regBtn) {
    regCheck.addEventListener('change', () => {
        regCheck.checked == true ? regBtn.disabled = false : regBtn.disabled = true;
    });
}



/**
 * -----------
 *- TEXT EDITOR -
 * -----------
 * 
 */
// const editor = document.querySelector('#editor');
// if (editor) {
// CKEDITOR.replace('editor');
// }
// CKEDITOR.editorConfig = function (config) {
//     config.language = 'de';
//     config.toolbarGroups = [
//         { name: 'document', groups: ['mode', 'document', 'doctools'] },
//         { name: 'clipboard', groups: ['clipboard', 'undo'] },
//         { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
//         { name: 'forms', groups: ['forms'] },
//         '/',
//         { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
//         { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
//         { name: 'links', groups: ['links'] },
//         { name: 'insert', groups: ['insert'] },
//         '/',
//         { name: 'styles', groups: ['styles'] },
//         { name: 'colors', groups: ['colors'] },
//         { name: 'tools', groups: ['tools'] },
//         { name: 'others', groups: ['others'] },
//         { name: 'about', groups: ['about'] }
//     ];
// };
/* ------End of Text Editor------ */

/**
 * ------------------------------
 *- EDIT PAGE - ADD CATEGORIES -
 * ----------------------------
 * 
 */

const catInput = document.getElementById('add-category');
const addBtn = document.getElementById('add-btn');
let catSelect = document.getElementById('cat-select');
const option = document.createElement('option');
const p = document.createElement('p');
// const errorMsg = "Category exists";
if (addBtn) {
    addBtn.addEventListener('click', addCategory);
}
function addCategory() {
    const opts = Object.values(catSelect.options);
    optValues = opts.map(opt => opt.value.toLowerCase());
    if (catInput.value !== "") {
        if (optValues.indexOf(catInput.value.toLowerCase()) !== -1) {
            p.innerHTML = "Category exists";
            p.classList.add('text-danger', 'm-0');
            catInput.nextElementSibling.after(p);
        } else {
            if (catInput.nextElementSibling.nextSibling) {
                catInput.nextElementSibling.nextSibling.remove();
            }
            option.value = catInput.value;
            option.text = catInput.value;
            catSelect.add(option);
            catSelect.value = option.value;
            catInput.value = '';
        }
    }
}
if (addBtn) {
    addBtn.addEventListener('click', () => { addCategory(), false });
};
/* ------End of Adding Category------ */

const catBtns = document.querySelectorAll('.filter-cat input[data-id]');
[...catBtns].forEach(btn => {
    btn.addEventListener('click', (e) => {
        console.log(e.target.getAttribute('data-id'));

    });
});
function filterNotes(category) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost/profile-css-html-js/mvc/notes/filterNotes/${category}`)
            .then((response) => handleErrors(response)) //check if status='ok'first
            .then((data) => success(data)) //then deal with data after status 200
            .catch(error => fail(error))//catch is an additional method 
    })
}


console.log('above jquery');
$(function () {
    //-------------
    //- DONUT CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.
    if ($('#donutChart').length > 0) {
        const donutChartCanvas = $('#donutChart').get(0).getContext('2d');

        $('.categories-count').ready(function () {
            $.ajax({
                type: 'POST',
                url: "http://localhost/profile-css-html-js/mvc/notes/categories",
                dataType: 'json',
                success: function (data) {
                    const notesNo = data['countCat'];
                    const catsArray = data['categories'];
                    const countNotes = data['countCat'];
                    const donutData = {
                        labels: catsArray,
                        datasets: [
                            {
                                data: countNotes,
                                backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#43c9d1', '#f39c12'],
                            }
                        ]
                    };

                    const donutOptions = {
                        maintainAspectRatio: false,
                        responsive: true,
                    }
                    //Create pie or douhnut chart
                    // You can switch between pie and douhnut using the method below.
                    const donutChart = new Chart(donutChartCanvas, {
                        type: 'doughnut',
                        data: donutData,
                        options: donutOptions
                    })
                },
                error: function (xhr, status, error) {
                    alert('something wrong: ' + error);
                }
            });
        });


    }
    //     /* ----End of DONUT CHART----- */

    /**
     * -----------------------------
     *-- DASHBOARD-INPUT COUNT CHART -
     * -----------------------------
     *  Use Chart.js
     */
    //-------------
    //- BAR CHART -
    //-------------

    if ($('#barChart').length > 0) {
        $('#barChart').ready(function () {
            $.ajax({
                type: 'POST',
                url: "http://localhost/profile-css-html-js/mvc/notes/categories",
                dataType: 'json',
                success: function (data) {
                    const categoriesMonthlyData = {
                        labels: data['categories'],
                        datasets: [
                            {
                                label: 'Current Month',
                                backgroundColor: 'rgba(60,141,188,0.9)',
                                borderColor: 'rgba(60,141,188,0.8)',
                                pointRadius: false,
                                pointColor: '#3b8bba',
                                pointStrokeColor: 'rgba(60,141,188,1)',
                                pointHighlightFill: '#fff',
                                pointHighlightStroke: 'rgba(60,141,188,1)',
                                data: data['lastMonCounts']
                            },
                            {
                                label: 'Last Month',
                                backgroundColor: 'rgba(210, 214, 222, 1)',
                                borderColor: 'rgba(210, 214, 222, 1)',
                                pointRadius: false,
                                pointColor: 'rgba(210, 214, 222, 1)',
                                pointStrokeColor: '#c1c7d1',
                                pointHighlightFill: '#fff',
                                pointHighlightStroke: 'rgba(220,220,220,1)',
                                data: data['currentMonCounts']
                            },
                        ]
                    };
                    const barChartCanvas = $('#barChart').get(0).getContext('2d');
                    const barChartData = jQuery.extend(true, {}, categoriesMonthlyData);
                    const temp0 = categoriesMonthlyData.datasets[0];
                    const temp1 = categoriesMonthlyData.datasets[1];
                    barChartData.datasets[0] = temp1;
                    barChartData.datasets[1] = temp0;

                    const barChart = new Chart(barChartCanvas, {
                        type: 'bar',
                        data: barChartData,
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            datasetFill: false
                        }
                    });
                },
                error: function (xhr, status, error) {
                    alert('something wrong : ' + error);
                }
            });
        })

    }
    /* ------End of Input Count Chart ------ */


    /**
     * ----------------------
     * - EDITS USERS PROFILE-
     * --------------------
     *Use Ajax to update
     * /
     
     /* ------span/input switch block------ */
    $('.editBtn').on('click', function () {
        // console.log($(this).closest('tr'));
        const tr = $(this).closest('tr');
        tr.find('.editSpan').hide();
        tr.find('.editInput').show();
        tr.find('.editBtn').hide();
        tr.find('.saveBtn').show();
    });

    $('.saveBtn').on('click', function () {
        const tr = $(this).closest('tr');
        const ID = tr.attr('id');
        const inputData = tr.find('.editInput').serialize();
        console.log(inputData);
        $.ajax({
            type: 'POST',
            url: 'users/editData',
            data: 'action=edit&id=' + ID + '&' + inputData,
            dataType: 'text',
            success: function (result) {
                // console.log(result);
                $data = JSON.parse(result);
                if ($data.status == "yes") {
                    tr.find('.editSpan.name').text($data.name);
                    tr.find('.editSpan.email').text($data.email);
                    tr.find('.editSpan.role').text($data.role);

                    tr.find(".editInput").hide();
                    tr.find(".saveBtn").hide();
                    tr.find(".editSpan").show();
                    tr.find(".editBtn").show();
                } else {
                    console.log('something wrong');
                }
            }
        });

    });

    $('.deleteBtn').on('click', function () {
        //hide delete button
        $(this).closest("tr").find(".deleteBtn").hide();
        //show confirm button
        $(this).closest("tr").find(".confirmBtn").show();

    });


    $('.confirmBtn').on('click', function (e) {
        e.preventDefault();
        const tr = $(this).closest("tr");
        const ID = tr.attr('id');
        $.ajax({
            type: 'POST',
            url: 'users/delete/' + ID,
            data: ID,
            success: function (result) {
                // console.log('result: ', result);
                tr.remove();
                // if (response.status == 'yes') {
                //     tr.remove();
                // } else {
                //     tr.find(".confirmBtn").hide();
                //     tr.find(".deleteBtn").show();
                //     alert(result.msg);
                // }
            }
        });
    });


    /* ------For input able/disabled block------ */
    $(".edit-user").on('click',
        function (e) {
            e.preventDefault();
            // console.log(e);
            // console.log($(this));
            // console.log($(this).parents('tr:first'));
            if ($(this).html() === 'edit') {
                $(this).parents('tr:first').find('input').prop('disabled', false);
                // $(".data-edit span").trigger("click");
                $(this).html('confirm');
            } else {
                if ($(this).html() === 'confirm') {
                    const tr = $(this).closest('tr');
                    const ID = tr.attr('id');
                    const inputData = tr.find('.editInput').serialize();
                    // console.log(inputData);
                    $.ajax({
                        type: "POST",
                        url: "users/editSave",
                        data: 'action=edit&id=' + ID + '&' + inputData,
                        success: function (result) {
                            console.log(result.status);
                        },
                        error: function () {
                            console.log('wrong');
                        }
                    });
                }
                $(this).parents('tr:first').find('input').prop('disabled', true);
                $(this).html('edit');

            }
        });
    /*----------End of EDITS USERS PROFILE-------------*/




}




);
/**
 * ------------------------------
 *- NOTES PAGE - SEARCH A NOTE -
 * ----------------------------
 * 
*/
// Search Bar disable/active
const searchForm = document.getElementById('search-form');
const searchBtn = document.querySelector('#search-form button');
const validateForm = (e) => {
    if (e.target.value !== "") {
        searchBtn.disabled = false;
        return true;
    }
};
// console.log(searchForm);
// searchForm.addEventListener('click', console.log('here'));
/* ------End of Search Bar Switches disabled------ */



/**
 * ------------------------------------------
 *- FRONT PAGE-BACKGROUND MOVES WITH MOUSE -
 * ----------------------------------------
 *
 */
// $('body').mousemove(function (e) {
// values: e.clientX, e.clientY, e.pageX, e.pageY
// console.log(moveX = (e.pageX));
//   let moveX = (e.pageX * -1 / 20);
//   let moveY = (e.pageY * -1 / 15);
//   $(this).css('background-position', moveX + 'px ' + moveY + 'px');
// });
/* ------End of Background image move with mouse ------ */






/**
 * -----------------------------
 *--- LOGIN REDIRECT- COUNTDOWN -
 * -----------------------------
 *
 */
// Use Ajax to 
// function countdownRedirect(){
//   const counter=5;
//   timer=setInterval(function(){
//     if(counter>0){
//       document.getElementById('countdown').innerHTML="Login successfully,you will be redirected in "+counter+" seconds.";
//     }elseif(counter==0){
//       $.ajax(
//         {
//           type:'post',
//           url:''
//         }
//       )
//     }

//     counter--;
//   }),1000
// }

/**
 * -----------------------------
 *- ADMIN EDITS USERS PROFILE -
 * -----------------------------
 *
 */

