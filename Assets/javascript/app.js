/*jshint esversion: 6 */

//Ajax 
var queryURL = "";
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
});


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
  firebase.initializeApp(config);
