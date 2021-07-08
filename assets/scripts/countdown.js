// Set the date we're counting down to
var countDownDate = new Date("Oct 1, 2021 00:00:00 PDT").getTime();

// Zero padding
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function setTimer() {
    // Get today's date and time
    var now = new Date();

    // Find the distance between now and the count down date
    var distance = countDownDate - now.getTime();

    if (distance < 0) {
        var hours = pad(now.getHours() % 12, 2);
        var minutes = pad(now.getMinutes(), 2);
        var seconds = pad(now.getSeconds(), 2);
        var period = (Math.floor(now.getHours() / 12) ? "PM" : "AM")

        document.getElementById("timer").innerHTML = hours + ":" + minutes + ":"
        + seconds + " " + period;
    } else {
        // Time calculations for days, hours, minutes and seconds
        var days = pad(Math.floor(distance / (1000 * 60 * 60 * 24)), 2);
        var hours = pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), 2);
        var minutes = pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)), 2);
        var seconds = pad(Math.floor((distance % (1000 * 60)) / 1000), 2);
        
        document.getElementById("timer").innerHTML = "T-" + days + ":" + hours + ":"
        + minutes + ":" + seconds;
    }
    setTimeout(setTimer, 1000);
}
// Run once to start
setTimer();