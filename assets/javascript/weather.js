$(document).ready(function () {
 // wunderground weather api
 var queryURLLocation = "https://api.wunderground.com/api/828d2683238be78a/geolookup/q/autoip.json";
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
});