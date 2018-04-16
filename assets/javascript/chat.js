/* Start the JS setup with document.ready*/
$(document).ready(function () {
  chatInit();

  // I commented  your function calls  bec I eded to set it up for you. You can now go back through your code and send them through to two functions I created for you.  
  //  rChat(chtMsg);  ~ rescuer function 
  //  eChat(chtMsg);  ~ person in trouble function 

  var bool = true;
  $('.emt_send').on('click', function (e) {
    e.preventDefault();
    var chtMsg = $('#chatMsg').val().trim();
    $('.alert').addClass('d-none');
    console.log(bool);
    if (bool === true) {
      rChat(chtMsg);
      bool = false;
    } else {
      eChat(chtMsg);
      bool = true;
    }
  });
  //  user_fireChat();
  //  emt_fireChat();
});


function rChat(rMsg) {
  var rName = "Roberto";
  var d = new Date();
  var date = d.toLocaleString([], {
    hour12: true
  });

  var chtBdy = $('#chtBdy');
  // this creates the left side chat styling. 
  var rIn = $('<div>').addClass('chat');
  var rvTr = $('<div>').addClass('chat-avatar reZQr');
  var rvTrA = $('<a>').addClass('avatar').attr('data-toggle', 'tooltip').attr('href', '#');
  var rvTrM = $('<img>').attr('src', 'assets/img/avatar-s-1.png');
  // the time needs to have more logic behind it. 
 // var time = $('<p>').addClass('time').text(date);
  var rezMz = $('<div>').addClass('chat-body').append($('<div>').addClass('chat-content emt_chat_content').text(rMsg)); // rMsg in this function is your input for variable you can get and set in firebase

  rvTrA.append(rvTrM);
  rvTr.append(rvTrA);
  rIn.append(rvTr);
  rIn.append(rezMz);
  chtBdy.append(rIn);
  //chtBdy.append(time);
  //rIn.append(time);
  database.ref('chat/chatResqr').push({
    emt_name: rName,
    text_input: rMsg,
    //dateAdded: firebase.database.ServerValue.TIMESTAMP
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

}
  // this creates the ride side chat styling. 
function eChat(eMsg) {
  var eName = "Avi";
  var d = new Date();
  var date = d.toLocaleString([], {
    hour12: true
  });

  var chtBdy = $('#chtBdy');
  var rIn = $('<div>').addClass('chat  chat-left');
  var rvTr = $('<div>').addClass('chat-avatar user_in_emergency');
  var rvTrA = $('<a>').addClass('avatar').attr('data-toggle', 'tooltip').attr('href', '#');
  var rvTrM = $('<img>').attr('src', 'assets/img/avatar-s-7.png');
  var time = $('<p>').addClass('time').text(date);
  var rezMz = $('<div>').addClass('chat-body').append($('<div>').addClass('chat-content user_chat_content').text(eMsg));

  rvTrA.append(rvTrM);
  rvTr.append(rvTrA);
  rIn.append(rvTr);
  rIn.append(rezMz);
  chtBdy.append(rIn);
  chtBdy.append(time);
  //rIn.append(time);
  database.ref('chat/chatResqe').push({
    emt_name: eName,
    text_input: eMsg,
    //dateAdded: firebase.database.ServerValue.TIMESTAMP
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



function chatInit() {
  $('#chat').html(' ');

  //Create DOM Elements
  //Chat Container Elements
  var chatCont = $('<div>').addClass('col-12 py-4 px-3 card mb-4');
  var chatTitle = $('<h5>').addClass('card-header emrGnC text-white  fucking text-center');
  var icon = $('<i>').addClass('fa fa-heartbeat');
  var fireChat = $('<div id="fireChat">').addClass('card-body pt-5 px-5');
  var chatBdy = $('<div>').addClass('content-body');
  var chatSect = $('<section>').addClass('chat-app-window');
  var chats = $('<div id="chtBdy">').addClass('chats px-5');

  var alert = $('<div>');
    alert.addClass('alert alert-warning');
    alert.attr('role', 'alert');
    console.log(alert);
    alert.text('type something');
    chats.append(alert);

  //Send Form Elements
  var sndSect = $('<section>').addClass('chat-app-form mt-4');
  var sndFrm = $('<form>').addClass('chat-app-input d-flex');
  var fld1node = $('<fieldset>').addClass('form-group position-relative has-icon-left col-10 m-0');
  var fld2node = $('<fieldset>').addClass('d-flex justify-content-center form-group position-relative has-icon-left col-2 m-0');
  var sndIpt1 = $('<input id="chatMsg">').addClass('form-control emt_chat').attr('placeholder', 'Type your message').attr('type', 'text');
  var sndIpt2 = $('<button>').addClass('btn btn-primary emt_send').attr('placeholder', 'Type your message').attr('type', 'button');
  var iconPln = $('<i>').addClass('fa fa-paper-plane-o d-lg-none');
  var iconCmt = $('<i>').addClass('fa fa-comments');
  var span = $('<span id="emt_send">').addClass('d-none d-lg-block');

  //Append Created Elements to DOM
  fld1node.append(sndIpt1);
  sndIpt2.append(iconPln);
  span.html(iconCmt).append('&nbsp;Send');
  sndIpt2.append(span);
  fld2node.append(sndIpt2);
  sndFrm.append(fld1node).append(fld2node);
  sndSect.append(sndFrm);
  chatSect.html(chats);
  chatSect.append(sndSect);
  chatTitle.append(icon).append('&nbsp;Emergency Chat');
  fireChat.append(chatBdy).html(chatSect);
  chatCont.append(chatTitle).append(fireChat);

  $('#chat').html(chatCont);

}