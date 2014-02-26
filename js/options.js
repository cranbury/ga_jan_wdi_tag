$(document).ready(function(){

  $("#input-desk").val(localStorage["desk"] || "");
  $("#input-password").val(localStorage["password"] || "");

  $("form").on("submit", function(event){
    event.preventDefault();

    localStorage["desk"] = $("#input-desk").val();
    localStorage["password"] = $("#input-password").val();

    $(this).find("#info").addClass("show");
  });

});
