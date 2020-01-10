function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);

  // sign in to server
  $.ajax({
    type: "POST",
    url: "api/user/login",
    contentType: "application/json",
    data: JSON.stringify({
        "google_id": profile.getId(),
        "name" : profile.getName(),
        "email" : profile.getEmail(),
        "google_token" : id_token 
    }),
    success: function() {
      CHAT.init({
        name: profile.getName()
      });
    },
  });

}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
      console.log('User signed out.');
      });
}

var CHAT = (function() {

  function init(profile) {
      $(function () {
        var socket = io();
        $('form').submit(function(){

          var msgData = {
            content : $('#m').val(),
            user : profile.name,
            datetime : getDatetime(),
          }

          socket.emit('chat message', msgData);
          $('#m').val('');
          return false;
        });
        socket.on('chat message', function(msg){
          $('#messages').append($('<li>').text(msg));
          window.scrollTo(0, document.body.scrollHeight);
        });
      });

      function getDatetime() {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return date+' '+time;
      }
  }

  return {
    init: init,
  }
}());
