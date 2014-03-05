$(document).ready(function(){

  var $html = $("<b>:)</b>");

  $html.css({
    "display": "block",
    "position": "fixed",
    "bottom": "10px",
    "right": "10px",
    "-webkit-transform": "rotate(90deg)"
  });

  $("body").append($html);

});
