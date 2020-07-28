$(document).ready(function() {

  $(".saveBtn").on("click", function() {
    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");

    console.log('value:', value);
    console.log('time:', time);

  // This saves the itemm time in local storage with a value of "value"
    localStorage.setItem(time, value);
  });

  function hourUpdater() {
    var currentHour = moment().hours();
    console.log('current hour:', currentHour);

    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      console.log("block hour:", blockHour);

      // loads any saved data from localStorage
      var id = $(this).attr("id");

      var userInput = localStorage.getItem(id); 

      if (userInput != null){
        $(this).children(".description").val(userInput);
      }
      
      // if the current hour is greater than the block hour
      // then add class "past"
      if (currentHour > blockHour) {
        $(this).css("background", "#2cd3cc");
        $(this).addClass("past");
      }
      // if they are equal
      // then remove class "past" and add class "present"
      else if (currentHour === blockHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
        $(this).css("background", "red");
      }
      // else
      // remove class "past", remove class "present", add class "future"
      else{
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
        $(this).css("background", "grey");
      }
    });
  }

  hourUpdater();

  // Checks if time needs to be updated every 15 seconds
  setInterval(hourUpdater, 15000);
  
  // Displays current day on page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
});


