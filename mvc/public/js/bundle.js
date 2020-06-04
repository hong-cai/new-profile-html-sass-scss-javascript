
$(function () {

  //-------------
  //- DONUT CHART -
  //-------------
  // Get context with jQuery - using jQuery's .get() method.
  if ($('#donutChart').length > 0) {
    var donutChartCanvas = $('#donutChart').get(0).getContext('2d');

    var donutData = {
      labels: [
        'PHP',
        'Html/Css',
        'Webpack',
        'Javascript',
        'Git/Github',
        'Scss/Sass',
      ],
      datasets: [
        {
          data: [700, 500, 400, 600, 300, 100],
          backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
        }
      ]
    }

    var donutOptions = {
      maintainAspectRatio: false,
      responsive: true,
    }
    //Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    var donutChart = new Chart(donutChartCanvas, {
      type: 'doughnut',
      data: donutData,
      options: donutOptions
    })
  }

  /* ----End of DONUT CHART----- */
})




//--------------------------
//- SUMMERNOTE.JS TEXT EDITOR -
//--------------------------
// 
// bootstrap WYSIHTML5 - text editor
$('.textarea').summernote('code');
// {
//   toolbar: [
//     ['basic', ['style', 'fontname', 'fontsize']],
//     ['style', ['bold', 'italic', 'underline', 'clear']],
//     ['font', ['strikethrough', 'superscript', 'subscript']],
//     ['fontsize', ['fontsize']],
//     ['color', ['forecolor', 'backcolor']],
//     ['block', ['ul', 'ol', 'paragraph']],
//     ['media', ['link', 'picture', 'video', 'table', 'hr']],
//     ['height', ['height', 'codeview', 'fullscreen', 'undo', 'redo']]
//   ]
// }
$('.daterange').daterangepicker({
  ranges: {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  },
  startDate: moment().subtract(29, 'days'),
  endDate: moment()
}, function (start, end) {
  window.alert('You chose: ' + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
});



//--------------------
//- EDITS USERS PROFILE-
//--------------------  
// 
//Use Ajax to update

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



//---------------------------
//- EDIT PAGE - ADD CATEGORIES -
//---------------------------
// 
const catInput = document.getElementById('add-category');
let catSelect = document.getElementById('cat-select');
const addBtn = document.getElementById('add-btn');
const option = document.createElement('option');
const p = document.createElement('p');
// const errorMsg = "Category exists";
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
  addBtn.addEventListener('click', () => { addCategory(), false })
};
/* ------End of Adding Category------ */



//---------------------------
//- NOTES PAGE - SEARCH A NOTE -
//---------------------------
//
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


//----------------------------------
//- FRONT PAGE-BACKGROUND MOVES WITH MOUSE -
//----------------------------------
//
// $('body').mousemove(function (e) {
// values: e.clientX, e.clientY, e.pageX, e.pageY
// console.log(moveX = (e.pageX));
//   let moveX = (e.pageX * -1 / 20);
//   let moveY = (e.pageY * -1 / 15);
//   $(this).css('background-position', moveX + 'px ' + moveY + 'px');
// });
/* ------End of Background image move with mouse ------ */




//----------------------------------
//- DASHBOARD-INPUT COUNT CHART -
//----------------------------------
// Use Chart.js

const ticksStyle = {
  fontColor: '#495057',
  fontStyle: 'bold'
}

const mode = 'index';
const intersect = true;

if ($('#visitors-chart').length > 0) {
  const $visitorsChart = $('#visitors-chart');
  let visitorsChart = new Chart($visitorsChart, {
    data: {
      labels: ['18th', '20th', '22nd', '24th', '26th', '28th', '30th'],
      datasets: [{
        type: 'line',
        data: [100, 120, 170, 167, 180, 177, 160],
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        pointBorderColor: '#007bff',
        pointBackgroundColor: '#007bff',
        fill: false
        // pointHoverBackgroundColor: '#007bff',
        // pointHoverBorderColor    : '#007bff'
      },
      {
        type: 'line',
        data: [60, 80, 70, 67, 80, 77, 100],
        backgroundColor: 'tansparent',
        borderColor: '#ced4da',
        pointBorderColor: '#ced4da',
        pointBackgroundColor: '#ced4da',
        fill: false
        // pointHoverBackgroundColor: '#ced4da',
        // pointHoverBorderColor    : '#ced4da'
      }]
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        mode: mode,
        intersect: intersect
      },
      hover: {
        mode: mode,
        intersect: intersect
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          // display: false,
          gridLines: {
            display: true,
            lineWidth: '4px',
            color: 'rgba(0, 0, 0, .2)',
            zeroLineColor: 'transparent'
          },
          ticks: $.extend({
            beginAtZero: true,
            suggestedMax: 200
          }, ticksStyle)
        }],
        xAxes: [{
          display: true,
          gridLines: {
            display: false
          },
          ticks: ticksStyle
        }]
      }
    }
  });
}
/* ------End of Input Count Chart ------ */



//----------------------------------
//- LOGIN REDIRECT- COUNTDOWN -
//----------------------------------
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


//----------------------------------
//- ADMIN EDITS USERS PROFILE -
//----------------------------------
// Use Ajax to 
