/*jshint esversion: 6 */
$(document).ready(function(){

//Ajax 
// var queryURL = "https://api.sendbird.com";
// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function (response) {
//     console.log(response);
// });


//Firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD55v0OO7fbqD_SZqP0D4bw-2DrC5GUpDQ",
    authDomain: "group-project-1-ca0dc.firebaseapp.com",
    databaseURL: "https://group-project-1-ca0dc.firebaseio.com",
    projectId: "group-project-1-ca0dc",
    storageBucket: "group-project-1-ca0dc.appspot.com",
    messagingSenderId: "906231816914"
  };
  

  // firebase.initializeApp(config);



// wunderground weather api
var queryURLLocation = "http://api.wunderground.com/api/828d2683238be78a/geolookup/q/autoip.json"
$.ajax ({
  url: queryURLLocation,
  method: "GET"
})
// this gets the location from the IP address from wunderground
.then(function(response){
  $("#location").html("You are in " + response.location.city);
  $("#long").html(response.location.lon + " Longitude");
  $("#lat").html(response.location.lat + " Latitude");


// grabbing the city name and location from the api 
// cityName grabs the name of the city from the API for use on the open weather map api 
var cityName = response.location.city;

// open weather map api
var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName
+ "&units=imperial&APPID=1faeb28f5befbdab79657bc5ee510ef3";
// this query url gets the city name from the other api and generates information from it 
$.ajax ({
   url: queryURLWeather,
   method: "GET"
})
.then(function(response){
  $("#temperature").html(response.main.temp + " °F");
})


// google maps api
// the google maps api also takes the city name from the wunderground api
var mapsEmbed = $("<iframe>");
mapsEmbed.attr("src", "https://www.google.com/maps/embed/v1/search?key=AIzaSyCF_5x7AkAOH8T7ijrquPSF5Lo3dullSiA&q=" + cityName)
mapsEmbed.attr("width", "600");
mapsEmbed.attr("height", "750");
mapsEmbed.attr("frameborder", "0");
mapsEmbed.attr("style", "border:0");
$("#map").html(mapsEmbed);



})
})