//Initial time values
var initialWork = 25*60+0;
var initialPause = 5*60+0;
var initialLongPause = 10*60+0;
var startTime;
var currentTimerSeconds = initialWork;
var elapsedTimeSeconds;
var pausedTime = 0;
var pauseBegin;
var pauseEnd;
var timerInit = false;

// Current time value
var seconds = initialWork % 60;
var minutes = (initialWork-seconds)/60;

// Pomodoro state
var workState = true;
var pauseButtonOn = false;

// Current pomodoroCount
var pomodoroCount = 0;

// Maximum pomodoros
const maximumPomodoros = 4;

//Bool variable indicating timer status
var timerRunning = false;

// Minutes and seconds formatted in a string
var timeString;

//Instance of setInterval
var timerInstance;

//HTML IDs
var timer = document.getElementById("timer");
var pomodoroString = document.getElementById("pomodoroCount");
var pomodoroState = document.getElementById("pomodoroState");

//Function to enable timer, bounded to HTML button start/pause
function enableTimer(){
    //PAUSE
    if (timerRunning == true){
        pauseButtonCalculation();
        timerRunning = false;
        clearInterval(timerInstance);
        pomodoroState.innerHTML = "TIMER PAUSED";
    }
    //START
    else {
        if (timerInit == false){
            startTime = Date.now();
            timerInit = true;
        }
        if (pauseButtonOn == true){
            pauseButtonCalculation();
        }
        timerRunning = true;
        timerInstance = setInterval(runTimer,100);
        workStateMessageCheckup();
    }
}

//Function to disable timer (reset), bounded to HTML button stop
function disableTimer(){
    //STOP
    clearInterval(timerInstance);
    resetTimer();
    resetPomodoroCount();
    timerInit = false;
    pomodoroState.innerHTML = "WAITING TO START...";
}

function pauseButtonCalculation(){
    if (pauseButtonOn == false){
        pauseButtonOn = true;
        pauseBegin = Date.now();
    }
    else if (pauseButtonOn == true){
        pauseButtonOn = false;
        pauseEnd = Date.now();
        pausedTime = pausedTime + Math.floor((pauseEnd-pauseBegin)/1000);
    }
}

//Function to reset timer value to initial values (hardcoded in variable section)
function resetTimer(){
    setWorkTimer();
    timeString = (String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0'));
    timer.innerHTML = timeString;
    timerRunning = false;
}

//Function to increment time (time step) of a second
function runTimer(){
    timeCalculation();
    timeString = (String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0'));
    timer.innerHTML = timeString;
}

//Function to calculate time format (when 60 seconds passes, a minute has passed)
function timeCalculation(){
    elapsedTimeSeconds = Math.floor((Date.now() - startTime) / 1000);
    var remainingSeconds = currentTimerSeconds-elapsedTimeSeconds+pausedTime;

    seconds = remainingSeconds % 60;
    minutes = (remainingSeconds-seconds)/60;

    //This means time has ran out.
    if (remainingSeconds==0){
            timeOver();
        }
}

//Function to deal with state changes (work/short break/long break)
function timeOver(){
    if (workState == true){
        //Long break
        if (pomodoroCount == maximumPomodoros-1){
            playSound();
            workState = false;
            setLongPauseTimer();
            updatePomodoroCount();
            workStateMessageCheckup();
            
        }
        //Short break
        else {
            playSound();
            workState = false;
            setPauseTimer();
            updatePomodoroCount();
            workStateMessageCheckup();
        }
    }

    else if (workState == false){
        //End of loop
        if (pomodoroCount == maximumPomodoros){
            playSound();
            disableTimer();
            pomodoroState.innerHTML = "WAITING TO START...";
        }
        //Work
        else{
            playSound();
            console.log("TIME TO WORK !")
            workState = true;
            setWorkTimer();
            workStateMessageCheckup();
        }
    }
}

//Function to update PomodoroCount until it reaches maximum count.
function updatePomodoroCount(){
    if (pomodoroCount < maximumPomodoros){
        pomodoroCount = pomodoroCount + 1;
    }
    else {
        pomodoroCount = 0;
    }
    pomodoroString.innerHTML = "COUNT " + pomodoroCount + "/" + maximumPomodoros;
}

//Function to easily reset PomodoroCount and display.
function resetPomodoroCount(){
    pomodoroCount = 0;
    pomodoroString.innerHTML = "COUNT " + pomodoroCount + "/" + maximumPomodoros;
}

//Function to set time according to short pause timer settings.
function setPauseTimer(){
    startTime = Date.now();
    currentTimerSeconds = initialPause;
    seconds = initialPause % 60;
    minutes = (initialPause-seconds)/60;;
}

//Function to set time according to long pause timer settings.
function setLongPauseTimer(){
    startTime = Date.now();
    currentTimerSeconds = initialLongPause;
    seconds = initialLongPause % 60;
    minutes = (initialLongPause-seconds)/60;;
}

//Function to set time according to work timer settings.
function setWorkTimer(){
    startTime = Date.now();
    currentTimerSeconds = initialWork;
    seconds = initialWork % 60;
    minutes = (initialWork-seconds)/60;
}

//Function to load variables on page load.
function loadVariables(){
    resetTimer();
    pomodoroString.innerHTML = "COUNT " + pomodoroCount + "/" + maximumPomodoros;
    pomodoroState.innerHTML = "WAITING TO START...";
}

//Function to play sound notification once timer ran out.
function playSound() {
    document.getElementById("audio").play();
  }

//Function to check current state and display it.
function workStateMessageCheckup(){
    if (workState == true){
        pomodoroState.innerHTML = "TIME TO WORK !";
    }
    else if (workState == false){
        pomodoroState.innerHTML = "TIME TO RELAX !";
    }
}