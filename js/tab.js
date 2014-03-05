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

  var Day = function(){

    var $el = $("#clock");

    function updateDay(){

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

      var week = Math.floor(diffDays/7 + 1);
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

    updateDay();
    var intervalID = window.setInterval(updateDay, 10000);

  };

  //

  


  Day();

});