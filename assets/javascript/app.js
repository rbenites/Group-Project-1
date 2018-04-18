/* jshint esversion: 6 */

/*:::::::: FireBase Connect :::::::::*/
var config = {
  apiKey: "AIzaSyD55v0OO7fbqD_SZqP0D4bw-2DrC5GUpDQ",
  authDomain: "group-project-1-ca0dc.firebaseapp.com",
  databaseURL: "https://group-project-1-ca0dc.firebaseio.com",
  projectId: "group-project-1-ca0dc",
  storageBucket: "group-project-1-ca0dc.appspot.com",
  messagingSenderId: "906231816914"
};
firebase.initializeApp(config);
database = firebase.database();

/*:::::::: GLOBAL VARIABLES :::::::::*/
var appId = "C467D171-6024-43EC-9943-FE2E0478AFBD";
var apiToken = "623cd37c96fc7faf33dd41b5e68894169d567d91";
var tHeadItems = ["Patient ID", "Date", "Who Needs Help", "Gender", "Name", "Age", "Number", "LOC", "Allergies", "Medical History", "Chief Complaint", "Actions"];
var thead = $("#thead");
var tableResults = $("#tableResults");
var dBtn = '';
var fBtn = '';
var name = '';
var age = '';
var number = '';
var person = '';
var gender = '';
var loc = '';
var aller = '';
var medical = '';
var complaint = '';
var d = new Date();
var gMapsAPIKey = 'AIzaSyCF_5x7AkAOH8T7ijrquPSF5Lo3dullSiA';
var address = '';
var userAddress = '';

/* Start the JS setup with document.ready*/
$(document).ready(function () {

  jsSetup();
  // Initialize tooltip component

});

$("body").on("click", '.dr', function (e) {
  // this is the remove button logic. It gets the data-key that I added it getFire and then removes it in Firebase, then resets table
  e.preventDefault();
  var key = $(this).data('key');
  console.log(key);
  if (confirm('Are you sure?')) {
    firebase.database().ref('/userCases').child(key).remove();
    tableResults.html(' ');
    results();
    getFire();
  }


});
$("body").on("click", '.vw', function (e) {
  e.preventDefault();
  var key = $(this).data('key');
  console.log(key);
  database = firebase.database();
  var ref = database.ref('/userCases');
  ref.on("value", function (snapshot) {

    var csDta = snapshot.val();
    $("#person").html(csDta[key].name);
    $("#patient").html(csDta[key].person);
    $("#number").html(csDta[key].number);
    $("#medicalLoc").html(csDta[key].loc);
    $("#medicalAllergic").html(csDta[key].allergies);
    $("#medicalHistory").html(csDta[key].medical);
    $("#chief-complaint").html(csDta[key].complaint);
    $("#activeCaseView").html("Active Case: " + csDta[key].age + " y/o" + " & gender: " + csDta[key].gender);
    $("#mark-completed").attr("data-key", k);
    userAddress = csDta[key].address;
  });


  console.log(userAddress);
});



$("#mark-completed").on("click", function () {
  console.log("mark completed has been clicked");
  firebase.database().ref('/userCases').child(key).remove();
  tableResults.html(' ');
  results();
  getFire();
  $("#person").html("");
  $("#patient").html("");
  $("#number").html("");
  $("#medicalLoc").html("");
  $("#medicalAllergic").html("");
  $("#medicalHistory").html("");
  $("#chief-complaint").html("");
  $("#activeCaseView").html("Active Case: ");
});

function getDirections() {

  if (userAddress == null) {
    console.log("No address!");
  } else {
    var rezQrlat = '';
    var rezQrlon = '';

    $('#directions-btn').on('click', function () {
      console.log("get directions has been clicked");
      rezQrlat = 34.0753;
      rezQrlon = -118.3804;

      // database.ref('/userCases').on("child_added", function (snapshot) {
      //   userAddress = snapshot.val().address;
      // });

      var dirEmbed = $("<iframe>"); 
      dirEmbed.attr("src", "https://www.google.com/maps/embed/v1/directions?key=" + gMapsAPIKey + "&origin=" + rezQrlat + ',' + rezQrlon + "&destination=" + userAddress);
      dirEmbed.attr("width", "50%");
      dirEmbed.attr("height", "450");
      dirEmbed.attr("frameborder", "0");
      dirEmbed.attr("style", "border:0");
      dirEmbed.addClass("mt-4");
      $("#get-directions").html(dirEmbed);
    });
  }
}

function getFire() {
  // this grabs my specific nested object called /userCases. I stringify the response and use the index to generate the the data I need in my table. 
  tableResults.html(' ');
  results();
  database = firebase.database();
  var ref = database.ref('/userCases');
  ref.on("value", function (snapshot) {
    var csDta = snapshot.val();
    var keys = Object.keys(csDta);



    for (var x = 0; x < keys.length; x++) {
      var k = keys[x];
      var date = csDta[k].date;
      var dIcon = $('<i>').addClass('fa fa-trash-o text-white');
      var fIcon = $('<i>').addClass('fa fa-eye text-white').attr("id", "view-button");
      var fBtn = $('<button>').addClass('btn vw bg-primary mr-1').attr('data-key', k).html(fIcon);
      var dBtn = $('<button>').addClass('btn dr bg-danger').attr('data-key', k).html(dIcon);
      var td = $('<td>').addClass('action');
      var nRow = td.append(fBtn).append(dBtn);
      // Table generation is here
      var fireHdr = $('<tr>');
      fireHdr.addClass('dataRW');
      var fireData = "";
      fireData += "<td>" + x + "</td>";
      fireData += "<td>" + csDta[k].date + "</td>";
      fireData += "<td>" + csDta[k].person + "</td>";
      fireData += "<td>" + csDta[k].gender + "</td>";
      fireData += "<td>" + csDta[k].name + "</td>";
      fireData += "<td>" + csDta[k].age + "</td>";
      fireData += "<td>" + csDta[k].number + "</td>";
      fireData += "<td>" + csDta[k].loc + "</td>";
      fireData += "<td>" + csDta[k].allergies + "</td>";
      fireData += "<td>" + csDta[k].medical + "</td>";
      fireData += "<td>" + csDta[k].complaint + "</td>";
      fireHdr.html(fireData);
      fireHdr.append(nRow);
      $("#thead").append(fireHdr);
    }
  });
}
$("#link").on("click", function () {
  // function changeEmergency (){
  //   getFire();

  console.log("button clicked");
});
// }
/* This function processes the form and sets the form data in the firebase DB in*/
function processForm() {
  var latW = '';
  var lonW = '';
  var queryURLLocation = "https://api.wunderground.com/api/828d2683238be78a/geolookup/q/autoip.json";
  $.ajax({
    url: queryURLLocation,
    method: "GET"
  })
    // this gets the location from the IP address from wunderground
    .then(function (response) {
      $("#location").html("You are in " + response.location.city);
      $("#long").html(response.location.lonW + " Longitude");
      $("#lat").html(response.location.latW + " Latitude");
      // grabbing the city name and location from the api 
      // cityName grabs the name of the city from the API for use on the open weather map api 
      var cityName = response.location.city;
    });



  console.log($('#rezQForm'));
  /* Find the form #rezQForm and execute code on submit*/
  $('#rezQForm').submit(function (e) {
    e.preventDefault();
    /* Takes the date at the time of submit and formats it in 12 hour format */

    var date = d.toLocaleString([], {
      hour12: true
    });
    /* Form Inputs: This is were we grab the value of the forms to set in DB */
    person = $(this).find('[name=person]').val().trim();
    gender = $(this).find('[name=gender]').val().trim();
    name = $("#inputName").val().trim();
    age = $(this).find('[name=age]').val().trim();
    number = $(this).find('[name=number]').val().trim();
    person = $('input[name=person]:checked').val();
    gender = $('input[name=gender]:checked').val();
    loc = $("#loc").val().trim();
    aller = $("#allergies").val().trim();
    medical = $("#mdclCond").val().trim();
    complaint = $("#inputComplaint").val().trim();
    address = $("#inputAddress").val().trim();

    /* This code pushes the form info to Firebase DB*/
    database.ref('/userCases').push({
      date: date,
      name: name,
      age: age,
      number: number,
      person: person,
      gender: gender,
      loc: loc,
      allergies: aller,
      medical: medical,
      complaint: complaint,
      address: address
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    var dynSt = $('#dynSt');
    var report = $('#reportArea');
    var secSte = $('#secSte');
    dynSt.html(' ');
    var alert = $('<div>');
    alert.addClass('alert alert-success');
    alert.attr('role', 'alert');
    console.log(alert);
    alert.text('You message has been sent. A chat will open up shortly');
    dynSt.append(alert);
    setTimeout(() => {
      report.addClass('d-none');
      secSte.removeClass('d-none').addClass('d-block');

      // 	chatIamge.attr('src', 'img/chat_2.png');
    }, 5000);
    setTimeout(() => {
      setChat();
    }, 10000);
  });

}


function results() {
  // I generate the table head in it's own function so I can call it again in other functions. 
  var table = $("<table class='table'>");
  var tblHD = $("<thead id='thead'>");
  var tr = $("<tr>");
  for (var i = 0; i < tHeadItems.length; i++) {
    var th = $("<th scope='col'>");
    th.text(tHeadItems[i]);
    tr.append(th);
  }
  tblHD.append(tr);
  table.append(tblHD);
  tableResults.html(table);
}

/* I use this function to call the JS of my app */
function jsSetup() {
  processForm();
  results();
  getFire();
  getDirections();


}