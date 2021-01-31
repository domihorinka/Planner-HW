//create a variable to store times 
var dayPlanner = [
    {
        id: "0",
        hour: "9",
        time: "9", //hour out of 24
        meridiem: "am", //am or pm, switch qt 12
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "1",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "2",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "3",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "4",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "5",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },

]
var todaysDate = moment().format('MMMM Do YYYY, h:mm:ss a');
//puts the date and time in the header from moment.js !!!
function retrieveHeaderDate() {
$("#currentDay").html(todaysDate);
}

//save data function 
function saveData() {
    localStorage.setItem("dayPlanner", JSON.stringify(dayPlanner));
}

//displays saved data from local storage to webpage
function displayData() {
    todaysDate.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
        console.log($(`#${_thisHour.id}`).val(_thisHour.reminder));
    })
}

//creates init function to retrieve local storage content
function init() {
    var storeDay = JSON.parse(localStorage.getItem("dayPlanner"));

    if (storeDay) {
        dayPlanner = storeDay;
    }

    saveData();
    displayData(); //functions call
}
retrieveHeaderDate(); //functions call
    
                      // _thisHour????
dayPlanner.forEach(function(thisHour) {
    
    var timeRow = $("<form>").attr({
        class: "row", //creates a row 
    });
    $(".container").append(timeRow);


    var timeField = $("div").text(`${thisHour.hour}${thisHour.meridiem}`).attr({
        class: "col-md-2 hour",
    });
    
    //planner table
    var hourPlanner = $("div").attr({
            class: "col-md-9 description p-0",
        });


    var plannerData = $("<textarea>");
    hourPlanner.append(plannerData);
    plannerData.attr("id", thisHour.id);


    if (thisHour.time < moment().format("HH")) {
        plannerData.attr ({
            class : "past",
        });
    } else if (thisHour.time === moment().format("HH")) { //else if
        plannerData.attr ({
            class : "present"
        });
    } else if (thisHour.time > moment().format("HH")) { //else if
        plannerData.attr({
            class : "future"
        });
    }

    //makes a button for save
    var saveeBtn = $("<i class='far fa-save fa-lg'></i>");
    var saveePlanner = $("<button>").attr({
        class: "col-md-1 saveBtn",
    });
    saveePlanner.append(saveeBtn);
    timeRow.append(timeField, hourPlanner, saveePlanner);
    });


    //calling init function to check local storage
    init();
 

$(".saveBtn").on("click" , function(event){
    event.preventDefault(); //default action will not be done ~ propagate 
    var saveIndex = $(this) 
        .siblings(".description") //DOM 
        .children(".future") 
        .attr("id");
    dayPlanner[saveIndex].reminder = $(this)
        .siblings(".description")
        .children(".future")
        .val();
    console.log(saveIndex); //log saved data
    saveData();
    displayData();

});