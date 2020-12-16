var dayDiv = $("#currentDay");
var timeblockContainer = $(".container");

dayDiv.text(moment().format('dddd - Do MMMM - YYYY'));

var timeBlocks = [{Time: "9", Activities: ""},
                {Time: "10", Activities: ""},
                {Time: "11", Activities: ""},
                {Time: "12", Activities: ""},
                {Time: "13", Activities: ""},
                {Time: "14", Activities: ""},
                {Time: "15", Activities: ""},
                {Time: "16", Activities: ""},
                {Time: "17", Activities: ""}];


init();

function init() {
    // Check if there is any saved timeblocks
    var savedBlocks = JSON.parse(localStorage.getItem("timeBlocks"));

    if (savedBlocks !== null)
        timeBlocks = savedBlocks;

    // Render the time blocks
    renderTimeBlocks();
}

// Draws the timeblock elements to the window
function renderTimeBlocks() {

    // For each time block
    timeBlocks.forEach(block => {

        // Create a containing div
        var blockDiv = $("<div></div>");
        blockDiv.attr("class", "row");

        // Create divs to hold the hour on the left of the time block
        var hourDiv = $("<div></div>");
        var hourText = $("<p></p>");

        // Convert from 24 hour to 12 hour AM PM time
        var AMorPM = (block.Time <= 12) ? "AM" : "PM";
        var time = (block.Time <= 12) ? block.Time : block.Time - 12;

        hourText.text(time + AMorPM);
        hourText.attr("class", "hourTxt");
        hourDiv.append(hourText);
        hourDiv.attr("class", "hour");
        blockDiv.append(hourDiv);

        // Create an input field for the activities
        var activityInput = $("<input type=\"text\"></input>");
        activityInput.val(block.Activities);
        activityInput.attr("id", block.Time);

        // Get the current hour then set the colour of the time block based on whether or not it's in the future, present or past
        var currentHour = moment().format("H");

        if (currentHour > Number(block.Time))
            activityInput.attr("class", "past");
        else if (currentHour == Number(block.Time))
            activityInput.attr("class", "present");
        else
            activityInput.attr("class", "future");
        
        blockDiv.append(activityInput);

        // Create a button to save the timeblock and give it an icon
        var activitySaveButton = $("<button></button>");
        activitySaveButton.attr("class", "saveBtn");
        activitySaveButton.attr("data-time", block.Time);
        activitySaveButton.click(saveTimeBlocks);

        var saveIcon = $("<i class=\"fas fa-lock\"></i>");
        activitySaveButton.append(saveIcon);

        blockDiv.append(activitySaveButton);

        timeblockContainer.append(blockDiv);
    });
    
}

// Saves the modified timeblocks
function saveTimeBlocks(event) {
    // Get
    var savedBlocks = JSON.parse(localStorage.getItem("timeBlocks"));

    if (savedBlocks === null)
        savedBlocks = timeBlocks;

    timeBlocks.forEach(block => {
        if (block.Time === event.currentTarget.dataset.time) {
            block.Activities = $("#" + block.Time)[0].value;
        }
    });

    localStorage.setItem("timeBlocks", JSON.stringify(savedBlocks));
}