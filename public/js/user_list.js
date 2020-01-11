$(document).ready(function(){
  USER_LIST.init();
});

var USER_LIST = (function() {

  var $usersListBody,
      $update_btn;

  function init() {
    domCache();
    getUsers();
  }

  function domCache() {
     $usersListBody = $('.js-users-body');
  }

  function newItemDomCache() {
    $update_btn = $('.js-update-btn');
  }

  function newItemDomFuncBinding() {
    $update_btn.click(updateUser);
  }

  function updateUser() {
    let $this = $(this);
    let $tr = $this.parent().parent();
    let user_id = $tr.attr('data-idx');
    let is_admin = $tr.find("input[type='checkbox']").is(":checked");

    $.ajax({
       url: '/api/user/' + user_id,
       method: 'POST',
       contentType: "application/json",
       data: JSON.stringify({
         'is_admin' : is_admin,
       }),
       success: function(ret){
         console.log(ret);
         location.reload();
       },
     });

    console.log('updateUser', user_id, is_admin);
  }

  function getUsers() {
    $.ajax({
      url: '/api/user/list',
      method: 'GET',
      success: function(ret){
        console.log(ret);
          initBody();
          renderBody(ret);

          newItemDomCache();
          newItemDomFuncBinding();
      },
    });
  }

  function renderBody(users) {
    users.forEach(function (user) {
        var recordTR = document.createElement("TR");
        recordTR.setAttribute("data-idx", user.idx);

        var operationTD = document.createElement("TD");
        var updateBtn = document.createElement("BUTTON");
        updateBtn.appendChild(document.createTextNode("update"));
        updateBtn.setAttribute("class", "js-update-btn");
        operationTD.appendChild(updateBtn);
        recordTR.appendChild(operationTD);

        var nameTD = document.createElement("TD");
        nameTD.appendChild(document.createTextNode(user.name));
        recordTR.appendChild(nameTD);

        var emailTD = document.createElement("TD");
        emailTD.appendChild(document.createTextNode(user.email));
        recordTR.appendChild(emailTD);

        // <input type="checkbox" name="vehicle1" value="Bike">
        var isAdminTD = document.createElement("TD");
        var isAdminCheckbox = document.createElement("INPUT");
        isAdminCheckbox.setAttribute("type", "checkbox");
        isAdminCheckbox.setAttribute("name", "is_admin");
        if (user.is_admin) {
          isAdminCheckbox.setAttribute("checked", "");
        }
        isAdminTD.appendChild(isAdminCheckbox);
        recordTR.appendChild(isAdminTD);

        var updatedAtTD = document.createElement("TD");
        updatedAtTD.appendChild(document.createTextNode(user.updated_at));
        recordTR.appendChild(updatedAtTD);

        var createdAtTD = document.createElement("TD");
        createdAtTD.appendChild(document.createTextNode(user.created_at));
        recordTR.appendChild(createdAtTD);

        $usersListBody.append(recordTR);
    });
  }


  function initBody() {
    $usersListBody.find('tr').remove()
  } 

  return {
    init: init,
  }
}());
