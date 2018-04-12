/* jshint esversion:6 */

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
var name = '';
var age = '';
var number = '';
var person = '';
var gender = '';
var loc = '';
var aller = '';
var medical = '';
var d = new Date();

/* Start the JS setup with document.ready*/
$(document).ready(function () {

  jsSetup();
  $("input[name='gender']").on("click", function () {
    alert($(this).val());
  });
});
/* This function processes the form and sets the form data in the firebase DB in*/
function processForm() {
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
    /* This code pushes the form info to Firebase DB*/
    database.ref().push({
      date: date,
      name: name,
      age: age,
      number: number,
      person: person,
      gender: gender,
      loc: loc,
      allergies: aller,
      medical: medical,
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  });
}

/* I use this function to call the JS of my app */
function jsSetup() {
  processForm();


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

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);


