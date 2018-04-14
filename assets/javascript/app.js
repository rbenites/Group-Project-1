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
var tHeadItems = ["Patient ID", "Date", "Who Needs Help", "Gender", "Name", "Age", "Number", "LOC", "Allergies", "Medical History","Chief Complaint", "Actions"];
var thead = $("#thead");
var tableResults = $("#tableResults");
var icon = '<i class="fa fa-trash-o text-white"></i>';
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

/* Start the JS setup with document.ready*/
$(document).ready(function () {
  jsSetup();
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

function getDirections() {

  var userLat = '';
  var userLon = '';
  var rezQrlat = '';
  var rezQrlon = '';

  $('#directions-btn').on('click', function () {
    console.log("get directions has been clicked");
    // wunderground weather api
    var queryURLLocation = "http://api.wunderground.com/api/828d2683238be78a/geolookup/q/autoip.json";
    $.ajax({
      url: queryURLLocation,
      method: "GET"
    }).then(function (response) {
      rezQrlat = response.location.lat;
      rezQrlon = response.location.lon;

      database.ref('/userCases').on("child_added", function (snapshot) {
        userLat = snapshot.val().userLat;
        userLon = snapshot.val().userLon;
      });

      var dirEmbed = $("<iframe>");
      dirEmbed.attr("src", "https://www.google.com/maps/embed/v1/directions?key=" + gMapsAPIKey + "&origin=" + rezQrlat + ',' + rezQrlon + "&destination=" + userLat + ',' + userLon);
      dirEmbed.attr("width", "50%");
      dirEmbed.attr("height", "450");
      dirEmbed.attr("frameborder", "0");
      dirEmbed.attr("style", "border:0");
      dirEmbed.addClass("mt-4");
      $("#get-directions").html(dirEmbed);

      console.log("Rescuer lat: " + rezQrlat);
      console.log("Rescuer lon: " + rezQrlon);
      console.log("User lat: " + userLat);
      console.log("User lon: " + userLon);
    });
  });
}

function weatherAPI() {
  // wunderground weather api
  var queryURLLocation = "http://api.wunderground.com/api/828d2683238be78a/geolookup/q/autoip.json";
  $.ajax({
    url: queryURLLocation,
    method: "GET"
  })
    // this gets the location from the IP address from wunderground
    .then(function (response) {
      $("#location").html("You are in " + response.location.city);
      $("#long").html(response.location.lon + " Longitude");
      $("#lat").html(response.location.lat + " Latitude");
      // grabbing the city name and location from the api 
      // cityName grabs the name of the city from the API for use on the open weather map api 
      var cityName = response.location.city;

      // open weather map api
      var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&APPID=1faeb28f5befbdab79657bc5ee510ef3";
      // this query url gets the city name from the other api and generates information from it 
      $.ajax({
        url: queryURLWeather,
        method: "GET"
      })
        .then(function (response) {
          $("#temperature").html(response.main.temp + " °F");
        });

      // google maps api
      // the google maps api also takes the city name from the wunderground api
      var mapsEmbed = $("<iframe>");
      mapsEmbed.attr("src", "https://www.google.com/maps/embed/v1/search?key=AIzaSyCF_5x7AkAOH8T7ijrquPSF5Lo3dullSiA&q=" + cityName);
      mapsEmbed.attr("width", "600");
      mapsEmbed.attr("height", "750");
      mapsEmbed.attr("frameborder", "0");
      mapsEmbed.attr("style", "border:0");
      $("#map").html(mapsEmbed);
    });
}

function user_fireChat() {
  var user_in_emergency = "";
  var text_input = "";
  //on button click to send user name and text message
  $(".user_send").on("click", function (event) {
    event.preventDefault();

    //get the date in the field
    var user_in_emergency = $('#inputName').val().trim();
    var text_input = $('.user_chat').val().trim();
    //code for handling the push to firebase
    database.ref('/chatResqe').push({
      user_in_emergency: user_in_emergency,
      text_input: text_input,
      //dateAdded: firebase.database.ServerValue.TIMESTAMP
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    console.log(user_in_emergency);
    console.log(text_input);
  });
  database.ref('/chatResqe').on("child_added", function (childSnapshot) {
    $(".user_in_emergency").append(childSnapshot.val().user_in_emergency);
    $(".user_chat_content").append("<p>" + childSnapshot.val().text_input);
    $(".user_chat").val("");
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function emt_fireChat() {
  var emt_name = "EMT";
  var text_input = "";
  //on button click to send user name and text message
  $(".emt_send").on("click", function (event) {
    event.preventDefault();

    //get the date in the field
    var text_input = $('.emt_chat').val().trim();
    //code for handling the push to firebase
    database.ref('/chatResqr').push({
      emt_name: emt_name,
      text_input: text_input,
      //dateAdded: firebase.database.ServerValue.TIMESTAMP
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    //console.log(user_in_emergency);
    console.log(text_input);
  });
  database.ref('/chatResqr').on("child_added", function (childSnapshot) {
    $(".emt_name").append(childSnapshot.val().emt_name);
    $(".emt_chat_content").append("<p>" + childSnapshot.val().text_input);
    $(".emt_chat").val("");
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
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
      console.log(csDta[k].aller);

      // Table generation is here
      var fireData = "";
      fireData += "<tr class='dataRW' id='tr" + x + "'>";
      fireData += "<td class='btn btn-link'>" + x + "</td>";
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
      fireData += "<td><button class='btn dr bg-danger' data-key='" + k + "'>" + icon + "</button></td>";
      fireData += "</tr>";

      $("#thead").append(fireData);
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
  var lat = '';
  var lon = '';
  var queryURLLocation = "http://api.wunderground.com/api/828d2683238be78a/geolookup/q/autoip.json";
  $.ajax({
    url: queryURLLocation,
    method: "GET"
  })
    // this gets the location from the IP address from wunderground
    .then(function (response) {
      $("#location").html("You are in " + response.location.city);
      $("#long").html(response.location.lon + " Longitude");
      $("#lat").html(response.location.lat + " Latitude");
      // grabbing the city name and location from the api 
      // cityName grabs the name of the city from the API for use on the open weather map api 
      var cityName = response.location.city;

      lat = response.location.lat;
      lon = response.location.lon;
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
      userLat: lat,
      userLon: lon
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
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
  weatherAPI();
  user_fireChat();
  emt_fireChat();
  processForm();
  results();
  getFire();
  getDirections();

}