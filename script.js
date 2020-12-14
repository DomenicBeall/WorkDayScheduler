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
    // Loads any time blocks stored in local storage
    

    renderTimeBlocks();
}

function renderTimeBlocks() {
    timeBlocks.forEach(block => {
        var blockDiv = $("<div></div>");
        blockDiv.attr("class", "row");

        var hourDiv = $("<div></div>");
        var hourText = $("<p></p>");

        var AMorPM = (block.Time <= 12) ? "AM" : "PM";
        var time = (block.Time <= 12) ? block.Time : block.Time - 12;

        hourText.text(time + AMorPM);
        hourText.attr("class", "hourTxt");
        hourDiv.append(hourText);
        hourDiv.attr("class", "hour");
        blockDiv.append(hourDiv);

        var activityInput = $("<input type=\"text\"></input>");
        activityInput.val(block.Activities);

        var currentHour = moment().format("H");

        if (currentHour > Number(block.Time))
            activityInput.attr("class", "past");
        else if (currentHour == Number(block.Time))
            activityInput.attr("class", "present");
        else
            activityInput.attr("class", "future");
        
        blockDiv.append(activityInput);

        
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

function saveTimeBlocks(event) {
    var savedBlocks = localStorage.getItem("timeBlocks");

    if (savedBlocks === null)
        savedBlocks = timeBlocks;
    else
        savedBlocks = JSON.parse(savedBlocks);

    savedBlocks.forEach(block => {
        if (block.time === event.currentTarget.dataset.time) {
            block.Activities = "";
        }
    });

    localStorage.setItem("timeBlocks", savedBlocks);
}