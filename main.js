var timerRunning = false;
var counter = 0;

//Initial time values
var initialMinutes = 25;
var initialSeconds = 0;

// Current time value
var minutes = initialMinutes
var seconds = initialSeconds

// Minutes and seconds formatted in a string
var timeString;

//Instance of setInterval
var timerInstance;

//HTML Timer ID
var timer = document.getElementById("timer");

function enableTimer(){
    if (timerRunning == true){
        console.log("PAUSE");
        timerRunning = false;
        clearInterval(timerInstance);
    }
    else {
        console.log("START");
        timerRunning = true;
        timerInstance = setInterval(runTimer,1000);
    }
}

function disableTimer(){
    console.log("STOP");
    clearInterval(timerInstance);
    resetTimer();
}

function resetTimer(){
    minutes = initialMinutes;
    seconds = initialSeconds;
    timeString = (String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0'));
    timer.innerHTML = timeString;
    timerRunning = false;
}

function runTimer(){
    timeCalculation();
    timeString = (String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0'));
    timer.innerHTML = timeString;
}

function timeCalculation(){
    if (seconds==0){
        if (minutes ==0){
            console.log("OVER");
        }
        else {
            minutes = minutes-1;
            seconds = 59;
        }
    }
    else {
        seconds = seconds - 1;
    }
}
