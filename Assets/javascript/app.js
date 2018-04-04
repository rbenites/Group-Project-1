/*jshint esversion: 6 */

//Ajax 
var queryURL = "";
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
});