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
var  medical = '';
var d = new Date();



/* Start the JS setup with document.ready*/
$(document).ready(function () {
  jsSetup();
  $("input[name='gender']").on("click", function() {
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


}