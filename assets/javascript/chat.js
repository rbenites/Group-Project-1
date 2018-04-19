/* Start the JS setup with document.ready*/
$(document).ready(function () {
  chatInit();

  $('body').on('click','.emt_send ',  function (e) {
    e.preventDefault();
    $('.alert').addClass('d-none ');
    var chtMsg = $('#chatMsg').val().trim();
    if (document.title === 'RezQr Dashboard') {
      fireRSet(chtMsg);
    } else {
      alert('in else');
      fireESet(chtMsg);
    }
  });
});

function fireRSet(chtMsg) {
  var myDataRef = firebase.database().ref('chat/chatResqr');
  var name = "Roberto";
  var d = firebase.database.ServerValue.TIMESTAMP;
  var ReZQr = 'ReZQr';
  myDataRef.push({
    name: name,
    text_input: chtMsg,
    date_stamp: d,
    type: ReZQr,
    //dateAdded: firebase.database.ServerValue.TIMESTAMP
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  eChat();
  rChat();
}



function fireESet(chtMsg) {
  var myDataRef = firebase.database().ref('chat/chatResqe');
  var name = "Avi";
  var d = firebase.database.ServerValue.TIMESTAMP;
  var ReZQe = 'ReZQe';

  myDataRef.push({
    name: name,
    text_input: chtMsg,
    date_stamp: d,
    type: ReZQe,
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  eChat();
  rChat();

}

// this creates the ride side chat styling. 
function eChat() {
  var database = firebase.database();
  var ref = database.ref('chat/chatResqe');
  ref.limitToLast(1).on("child_added", function (snapshot) {

    var message = snapshot.val();

    var eMsg = message.text_input;

    var date = message.date_stamp.toLocaleString([], {
      hour12: true
    });
    var chtBdy = $('.chtBdy');
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
  });
}

function rChat() {

  var database = firebase.database();
  var ref = database.ref('chat/chatResqr');
  ref.limitToLast(1).on("child_added", function (snapshot) {
  var message = snapshot.val();
   var rMsg = message.text_input;
   var date = message.date_stamp.toLocaleString([], {
          hour12: true
        });
        var chtBdy = $('.chtBdy');
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
      });
    }
      function chatInit() {
        $('chatst').html(' ');
        //Create DOM Elements
        //Chat Container Elements
        var chatCont = $('<div>').addClass('col-12 py-4 px-3 card mb-4');
        var chatTitle = $('<h5>').addClass('card-header emrGnC text-white  fucking text-center');
        var icon = $('<i>').addClass('fa fa-heartbeat');
        var fireChat = $('<div id="fireChat">').addClass('card-body pt-5 px-5');
        var chatBdy = $('<div>').addClass('content-body');
        var chatSect = $('<section>').addClass('chat-app-window');
        var chats = $('<div>').addClass('chats px-5 chtBdy');

        var alert = $('<div>');
        alert.addClass('alert alert-warning');
        alert.attr('role', 'alert');
        alert.text('type something');
        chats.append(alert);

        //Send Form Elements
        var sndSect = $('<section>').addClass('chat-app-form mt-4');
        var sndFrm = $('<form>').addClass('chat-app-input d-flex');
        var fld1node = $('<fieldset>').addClass('form-group position-relative has-icon-left col-10 m-0');
        var fld2node = $('<fieldset>').addClass('d-flex justify-content-center form-group position-relative has-icon-left col-2 m-0');
        var sndIpt1 = $('<input id="chatMsg">').addClass('form-control emt_chat').attr('placeholder', 'Type your message').attr('type', 'text');
        var sndIpt2 = $('<button>').addClass('btn btn-primary emt_send').attr('placeholder', 'Type your message').attr('type', 'button').attr('data-btn', 'true');
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
        $('.chatst').html(chatCont);
      }




      // function fireLoad() {

      //   var chatResqr = 'chatResqr';
      //   var chsnChat = '';
      //   database = firebase.database();
      //   chsnChat = chatResqr;
      //   var ref = database.ref('chat/' + chsnChat);

      //   ref.once("value", function (snapshot) {
      //     var chtDta = snapshot.val();
      //     console.log(chtDta);
      //     var keys = Object.keys(chtDta);
      //     console.log(keys);
      //     for (var x = 0; x < keys.length; x++) {
      //       var k = keys[x];
      //       // console.log(chtDta[k].text_input);
      //       console.log(chtDta[k].text_input);
      //       rChat(chtDta[k].text_input);
      //     }
      //   });
      //   var chatResqe = 'chatResqe';
      //   var chsnChat = chatResqe;
      //   var ref = database.ref('chat/' + chsnChat);
      //   ref.once("value", function (snapshot) {
      //     var chtDta = snapshot.val();
      //     console.log(chtDta);
      //     var keys = Object.keys(chtDta);
      //     console.log(keys);
      //     for (var x = 0; x < keys.length; x++) {
      //       var k = keys[x];
      //       // console.log(chtDta[k].text_input);
      //       console.log(chtDta[k].text_input);
      //       eChat(chtDta[k].text_input);
      //     }
      //   });
      // }