let timer;
let isRunning = false;
let elapsedTime = 0;
let startTime = 0;
let lapCounter = 1;

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 100);
        isRunning = true;
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    lapCounter = 1;
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("laps").innerHTML = "";
}

function lapTime() {
    if (isRunning) {
        const lapDisplay = document.createElement("div");
        lapDisplay.textContent = `Lap ${lapCounter}: ${formatTime(elapsedTime)}`;
        document.getElementById("laps").appendChild(lapDisplay);
        lapCounter++;
    }
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    document.getElementById("display").textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
    return unit < 10 ? "0" + unit : unit;
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", lapTime);