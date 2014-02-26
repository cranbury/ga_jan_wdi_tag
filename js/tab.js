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

      var week = 7;
      var day = 3;
      //Need to add functions to get week, day

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth(); //January is 0!

      var yyyy = today.getFullYear();
      if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;


      var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      var firstDate = new Date(2014,00,13);
      var secondDate = new Date(yyyy,mm,dd);

      //var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
      
      var diffDays = days_between(firstDate, secondDate);

      var week = Math.round(diffDays/7 + 1);
      var day = diffDays%7 + 1;

      var weekDay = "W" + week +" D" + day;

      $el.html(weekDay);
    }
    
    function days_between(date1, date2) {

      // The number of milliseconds in one day
      var ONE_DAY = 1000 * 60 * 60 * 24

      // Convert both dates to milliseconds
      var date1_ms = date1.getTime()
      var date2_ms = date2.getTime()

      // Calculate the difference in milliseconds
      var difference_ms = Math.abs(date1_ms - date2_ms)

      // Convert back to days and return
      return Math.round(difference_ms/ONE_DAY)

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

      $.getJSON("http://aa-progress-tracker.herokuapp.com/api/pairs.json", function(data){
        console.log(data);

        localStorage[Key("day")] = JSON.stringify(data);
        displayPairs(data);
      });
    }
  };

  Clock();
  Pairs();
});