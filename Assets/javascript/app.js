/*jshint esversion: 6 */
//SENDBIRD 
var appId = "C467D171-6024-43EC-9943-FE2E0478AFBD";
var apiToken = "623cd37c96fc7faf33dd41b5e68894169d567d91";
var name = '';
var age = '';
var number = '';
var person = '';
var gender = '';
var loc = '';
var aller = '';
var  medical = '';
var d = new Date();


$("input-group").on("click", function () {
  console.log($('input[name=person]:radio'));
  console.log(gender);
});

//console.log(person.val());
//Ajax 
var queryURL = "https://api.sendbird.com";
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  console.log(response);
});


//Firebase
// Initialize Firebase
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
database = firebase.database();
$(document).ready(function () {
  jsSetup();
  $("input[name='gender']").on("click", function() {
    alert($(this).val());
});
});

function processForm() {
  console.log($('#rezQForm'));
  $('#rezQForm').submit(function (e) {

    e.preventDefault();
    var date = d.toLocaleString([], {
      hour12: true
    });
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

function jsSetup() {
  processForm();


}