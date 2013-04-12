function updateClock(){
  var currentTime = new Date();
  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();

  currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;

  var html = currentHours + ":" + currentMinutes;
  document.getElementById("clock").innerHTML = html;
}

updateClock();
var intervalID = window.setInterval(updateClock, 10000);
