let start; // Variable to store the start time
let accumulatedTime = 0; // Variable to store the accumulated time
let timerInterval; // Variable to store the timer interval
let isRunning = false; // Flag to check if the stopwatch is running

// Create an array to store images for digits 0-9
let digits = [];
for (let i = 0; i < 10; i++) {
    digits[i] = new Image();
    digits[i].src = './digits/' + i + '.jpg';
}

// Add an event listener to the start button to start or resume the stopwatch
document.getElementById('start').addEventListener('click', function() {
    if (!isRunning) { // Only start if the stopwatch is not already running
        start = new Date() - accumulatedTime; // Adjust the start time based on the accumulated time
        timerInterval = setInterval(displayTime, 100); // Update the time every 100 milliseconds (0.1 second)
        isRunning = true; // Set the running flag to true
    }
});

// Add an event listener to the stop button to stop the stopwatch
document.getElementById('stop').addEventListener('click', function() {
    if (isRunning) {
        clearInterval(timerInterval); // Clear the timer interval to stop the stopwatch
        accumulatedTime = new Date() - start; // Accumulate the elapsed time
        isRunning = false; // Set the running flag to false
    }
});

// Add an event listener to the reset button to reset the stopwatch
document.getElementById('reset').addEventListener('click', function() {    
       location.reload();
});

// Function to display the current time on the stopwatch
function displayTime() {
    let diff = new Date() - start; // Calculate the difference between the current time and the start time
    let time = [];

    // Calculate hours and format them as a two-digit string
    let hrs = Math.floor(diff / 3600000);
    hrs = (hrs < 10 ? '0' : '') + hrs;
    time[0] = hrs.charAt(0);
    time[1] = hrs.charAt(1);
    diff -= hrs * 3600000; // Subtract the hours from the difference

    // Calculate minutes and format them as a two-digit string
    let mins = Math.floor(diff / 60000);
    mins = (mins < 10 ? '0' : '') + mins;
    time[2] = mins.charAt(0);
    time[3] = mins.charAt(1);
    diff -= mins * 60000; // Subtract the minutes from the difference

    // Calculate seconds and format them as a two-digit string
    let secs = Math.floor(diff / 1000);
    secs = (secs < 10 ? '0' : '') + secs;
    time[4] = secs.charAt(0);
    time[5] = secs.charAt(1);
    diff -= secs * 1000; // Subtract the seconds from the difference

    // Calculate milliseconds and format them as a two-digit string (0.1 second increments)
    let milisecs = Math.floor(diff / 10);
    milisecs = (milisecs < 10 ? '0' : '') + milisecs;
    time[6] = milisecs.charAt(0);
    time[7] = milisecs.charAt(1);

    // Update the image sources for each digit based on the current time
    for (let i = 0; i < time.length; i++) {
        let digit = document.getElementById('d' + i);
        digit.src = digits[time[i]].src;
        digit.alt = time[i];
    }
}

// When the window loads, display the initial time
window.onload = function() {
    displayTime();
};