function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  //console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //console.log('Name: ' + profile.getName());
  //console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  var id_token = googleUser.getAuthResponse().id_token;
  //console.log("ID Token: " + id_token);

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
    success: function(ret) {
      CHAT.init(ret);

      CHAT.renderAdminTool(ret);
    },
  });

}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    //logout
  });
}

var CHAT = (function() {

  var $js_user_tool,
      user_id,
      user_name,
      is_admim;

  function init(profile) {
    user_id = profile.user_id;
    user_name = profile.user_name;
    is_admin = profile.is_admin;

    domCache();
    startSocket();
  }

  function domCache() {
    $js_user_tool = $('.js-user-tool');
  }

  function renderAdminTool(userData) {
    if (user_id != null && is_admin) {
      var p = document.createElement("P");
      p.appendChild(document.createTextNode("[ADMIN] Welcome : " + user_name));
      $js_user_tool.append(p);

      var a = document.createElement("A");
      a.appendChild(document.createTextNode("user list"));
      a.setAttribute("href", "/user");
      a.setAttribute("target", "_blank");

      $js_user_tool.append(a);
    } else {
      var p = document.createElement("P");
      p.appendChild(document.createTextNode("[USER] Welcome : " + user_name));
      $js_user_tool.append(p);
    }
  }

  function startSocket() {
    $(function () {
      var socket = io();
      $('form').submit(function(){

        var msgData = {
          content : $('#m').val(),
          user : user_name,
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
  }

  function getDatetime() {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+' '+time;
  }

  return {
    init: init,
    renderAdminTool: renderAdminTool,
  }
}());
