
/* Start the JS setup with document.ready*/
$(document).ready(function () {
    chatInit();
    user_fireChat();
    emt_fireChat();
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
  $('#chat').html(' ');
  $('#chat').html(chatCont);
    
  }