
/* Start the JS setup with document.ready*/
$(document).ready(function () {
    chatInit();
  
  //  user_fireChat();
  //  emt_fireChat();
});

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


function setChat() {
    $('#dynSt').html(' ');
    var setChat = '<div class="content-right"> ' +
      ' <div class="content-wrapper"> ' +
      '<div class="content-header row"> ' +
      '</div> ' +
      '<div class="content-body"> ' +
      '    <section class="chat-app-window"> ' +
      '        <div class="chats"> ' +
      '            <div class="chats"> ' +
      '                <!-- start  of chat for user ermGnc --> ' +
      '                <div class="chat"> ' +
      '                    <div class="chat-avatar user_in_emergency"> ' +
      '                        <a class="avatar" data-toggle="tooltip" href="#" data-placement="right" title="" data-original-title=""> ' +
      '                            <img src="assets/img/avatar-s-1.png" alt="avatar">  ' +
      '                        </a> ' +
      '                    </div>  ' +
      '                    <div class="chat-body"> ' +
      '                        <div class="chat-content user_chat_content"> ' +
      '                            <p>How can we help? Were here for you!</p>  ' +
      '                        </div> ' +
      '                    </div> ' +
      '                </div> ' +
      '                <p class="time">1 hours ago</p> ' +
      '                <!-- start of chat user EMT --> ' +
      '                <div class="chat chat-left"> ' +
      '                    <div class="chat-avatar emt_name"> ' +
      '                        <a class="avatar" data-toggle="tooltip" href="#" data-placement="left" title="" data-original-title=""> ' +
      '                            <img src="assets/img/avatar-s-7.png" alt="avatar"> ' +
      '                        </a> ' +
      '                    </div> ' +
      '                    <div class="chat-body"> ' +
      '                         <div class="chat-content emt_chat_content"> ' +
      '                            <p>Hey John, I am looking for the best admin template.</p> ' +
      '                            <p>Could you please help me to find it out?</p> ' +
      '                        </div> ' +
      '                        <div class="chat-content emt_chat_content"> ' +
      '                            <p>It should be Bootstrap 4 compatible.</p> ' +
      '                        </div> ' +
      '                    </div> ' +
      '                </div> ' +
      '                <!-- chat for user ermGnc--> ' +
      '                <div class="chat"> ' +
      '                    <div class="chat-avatar user_in_emergency"> ' +
      '                        <a class="avatar" data-toggle="tooltip" href="#" data-placement="right" title="" data-original-title=""> ' +
      '                            <img src="assets/img/avatar-s-1.png" alt="avatar"> ' +
      '                        </a> ' +
      '                    </div> ' +
      '                    <div class="chat-body"> ' +
      '                        <div class="chat-content user_chat_content"> ' +
      '                            <p>Absolutely!</p> ' +
      '                        </div> ' +
      '                        <div class="chat-content user_chat_content"> ' +
      '                            <p>Stack admin is the responsive bootstrap 4 admin template.</p> ' +
      '                        </div> ' +
      '                    </div> ' +
      '                </div> ' +
      '                <p class="time">1 hours ago</p> ' +
      '                    </div> ' +
      '                    </div> ' +
      '                    </div> ' +
      '                  </section> ' +
      '<section class="chat-app-form">' +
      '   <form class="chat-app-input d-flex">' +
      '       <fieldset class="form-group position-relative has-icon-left col-10 m-0">' +
      '           <div class="form-control-position">' +
      '               <i class="icon-emoticon-smile"></i>' +
      '                    </div> ' +
      '           <input class="form-control emt_chat" id="iconLeft4" placeholder="Type your message" type="text">' +
      '  <div class="form-control-position control-position-right">' +
      ' <i class="ft-image"></i>' +
      '                    </div> ' +
      ' </fieldset>' +
      ' <fieldset class="form-group position-relative has-icon-left col-2 m-0">' +
      ' <button type="button" class="btn btn-primary emt_send">' +
      ' <i class="fa fa-paper-plane-o d-lg-none"></i>' +
      ' <span id="emt_send" class="d-none d-lg-block"> <i class="fa fa-comments"></i> Send</span>' +
      ' </button>' +
      '</fieldset>' +
      '</form>' +
      '                  </section> ' +
      '                    </div> ' +
      '                    </div> ' +
      '                    </div> ';
    console.log(setChat);
    // THIS IS HORRIBLE I KNOW BUT IT IS FOR DEV PURPOSES SO WE CAN ISOLATE THE CHAT AND HAVE THE PROCESS FUNCTIONALITY WORK
    var chatCont = $('<div>');
    chatCont.addClass('col-12 py-4 px-3 card mb-4');
    console.log(chatCont);
    var chatTitle = $('<h5>');
    chatTitle.addClass('card-header emrGnC text-white text-center');
    var icon = $('<i>');
    icon.addClass('fa fa-heartbeat');
    chatTitle.append(icon);
    chatTitle.append('&nbsp;Emergency Chat');
    console.log(chatTitle);
    var fireChat = $('<div id="fireChat">');
    fireChat.addClass('card-body');
    console.log(fireChat);
    chatCont.append(chatTitle);
    fireChat.append(setChat);
    chatCont.append(fireChat);
    
    $('#dynSt').html(chatCont);
    console.log( $('#chat'));
    //$('#chat').html(chatCont);
  }
  
  function chatInit(){
    $('#chat').html(' ');
  //Create DOM Elements
  //chat body
  var chatCont = $('<div>').addClass('col-12 py-4 px-3 card mb-4');
  var chatTitle = $('<h5>').addClass('card-header emrGnC text-white  fucking text-center');
  var icon = $('<i>').addClass('fa fa-heartbeat');
  var fireChat = $('<div id="fireChat">').addClass('card-body');
  var chatBdy = $('<div>').addClass('content-body');
  var chatSect = $('<section>').addClass('chat-app-window');

  //Send Form 
  var sndSect = $('<section>').addClass('chat-app-form');
  var sndFrm = $('<form>').addClass('chat-app-input d-flex');
  //I had to create the fieldset like this it was not working the other way. 
  var fldSet1 = document.createElement("FIELDSET");
  fldSet1.classList.add("fldSet1","form-group", "position-relative", "has-icon-left", "col-10", "m-0");
 // this is a hack just to get it done I need more time on it
  var testCont = $('#testCont');
  testCont.html(fldSet1);
  var fld1node = $('.fldSet1');
  var sndIpt1 =  $('<input id="iconLeft4">').addClass('form-control emt_chat').attr('placeholder','Type your message').attr('type','text');
  fld1node.append(sndIpt1);
  var fld2node = $('<fieldset>').addClass('form-group position-relative has-icon-left col-2 m-0');
 // sndSect.html(sndFrm).html(fld1node).html(sndIpt);
  var sndIpt2 =  $('<button>').addClass('btn btn-primary emt_send').attr('placeholder','Type your message').attr('type','button');
  var iconPln = $('<i>').addClass('fa fa-paper-plane-o d-lg-none');
  var iconCmt = $('<i>').addClass('fa fa-comments');
  var span = $('<span id="emt_send">').addClass('d-none d-lg-block"');
  sndIpt2.append(iconPln);
  span.html(iconCmt).text('Send');
  sndIpt2.append(span);
fld2node.append(sndIpt2);
    // ' <span class="> <i class=""></i> Send</span>' +
    // ' </button>' +
    // '</fieldset>' +
    // '</form>' +
    // '                  </section> ';
 // var chatSnd = $('<section>').addClass('chat-app-form');
//  var sndFrm = $('<form>').addClass('chat-app-input d-flex');
  
  //Append Created Elements to DOM
chatSect.append(sndSect).html(fld1node).append(fld2node);
  chatTitle.append(icon).append('&nbsp;Emergency Chat');
  fireChat.append(chatBdy).html(chatSect);
  chatCont.append(chatTitle).append(fireChat);  
  console.log(fireChat);
  
  //fireChat.append(setChat);
  //$('#chat').html(' ');
  $('#chat').html(chatCont);
    
  }