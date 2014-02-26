$(document).ready(function(){

  var Key = function(){
    var date;

    return function(name){
      if(!date){
        var t = new Date();
        date = t.getDate() + "/" + t.getMonth() + "/" + t.getFullYear();
      }

      return date + "/" + name;
    }
  }();


  //

  var Clock = function(){

    var $el = $("#clock");

    function updateClock(){
      var currentTime = new Date();
      var currentHours = currentTime.getHours();
      var currentMinutes = currentTime.getMinutes();
      currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;

      $el.html(currentHours + ":" + currentMinutes);
    }

    updateClock();
    var intervalID = window.setInterval(updateClock, 10000);

  };

  //

  var Pairs = function(){
    var desk = localStorage["desk"];

    if(!desk){
      return;
    }

    function displayPairs(obj){
      var html = "<p>Desk <strong>";
      html += desk;
      html += "</strong> &mdash; Day <strong>";
      html += obj.day;
      html += "</strong>";

      if(obj.pairs[desk].length){
        html += " &mdash; Students ";

        html += obj.pairs[desk].map(function(student){
          var sHtml = "<a href='https://github.com/";
          sHtml += student.github + "'>";
          sHtml += student.name + "</a>";

          return sHtml;
        }).join(" &amp; ");
      }

      html += "</p>";

      $("#info").html(html);
    }

    if(localStorage[Key("day")]){
      displayPairs(JSON.parse(localStorage[Key("day")]));
    } else {

      $.getJSON("http://localhost:3000/api/pairs.json", function(data){
        console.log(data);

        localStorage[Key("day")] = JSON.stringify(data);
        displayPairs(data);
      });
    }
  };

  Clock();
  Pairs();
});