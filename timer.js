document.addEventListener('DOMContentLoaded', function () {

        // Pomodoro timer variables
        const work = 25;
        const longBreak = 15;
        const shortBreak = 5;
        let defaultTime = 20;
        let pauseTime = NaN;
        let remainingTime;
        let secIntervals;
        let pauseLength;
        let startTime;
        let endTime;
        let minutes;
        let seconds;
        let timeNow;
        let length;

        // Pomodoro timer query Selectors
        let displayId = document.querySelector('#displayTime');
        let moreId = document.querySelector('#more');
        let lessId = document.querySelector('#less');
        let startId = document.querySelector('#start');
        let pauseId = document.querySelector('#pause');
        let resetId = document.querySelector('#reset');
        let workId = document.querySelector('#work');
        let shortBreakId = document.querySelector('#shortBreak');
        let longBreakId = document.querySelector('#longBreak');

        // Method to display the time
        function display() {
            displayId.innerHTML = defaultTime + ':00';
        }

        // Method to add time
        moreId.addEventListener('click', function () {
            defaultTime += 1;
            display();
        });

        // Method to subtract time
        lessId.addEventListener('click', function () {
            if (defaultTime > 1) {
                defaultTime -= 1;
                display();
            }
        });

        // Method to cycle time
        function cycleTime() {
            // 1 second intervals assigned to a variable
            secIntervals = setInterval(function () {

                // Set the current time
                timeNow = $.now();

                // Calculate the remaining time
                remainingTime = endTime - timeNow;

                // Calculations for days, hours, minutes and seconds
                minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                seconds = Math.round((remainingTime % (1000 * 60)) / 1000);

                // Fix edge cases for display time
                if (seconds < 10) {
                    // Add ':0' in front of single digit seconds
                    displayId.innerHTML = minutes + ":0" + seconds;
                } else if (seconds === 60) {
                    // Write '1:00' when seconds === 60
                    displayId.innerHTML = minutes + 1 + ":00";
                } else {
                    // Add ':' in between minutes and seconds in all other cases
                    displayId.innerHTML = minutes + ":" + seconds;
                }

                // Print message when timer is done
                if (remainingTime <= 0) {
                    clearInterval(secIntervals);
                    displayId.innerHTML = "00:00";
                }

            }, 1000); // End of setInterval
        } // End of function cycleTime

        // Method for the start button to work
        startId.addEventListener('click', function () {
            if (isNaN(pauseTime)) {
                startTime = $.now();
                length = defaultTime * 60 * 1000;
                endTime = startTime + length;
                cycleTime();
            } else {
                startTime = $.now();
                endTime = startTime + pauseLength;
                cycleTime();
            }
        });

        // Method for the pause button to work
        pauseId.addEventListener('click', function () {
            pauseTime = $.now();
            pauseLength = endTime - pauseTime;
            clearInterval(secIntervals);
        });

        // Method for the stop button to work
        resetId.addEventListener('click', function () {
            clearInterval(secIntervals);
            defaultTime = 20;
            display();
            pauseTime = NaN;
        });

        // Method for the work button to work
        workId.addEventListener('click', function () {
            startTime = $.now();
            length = work * 60 * 1000;
            endTime = startTime + length;
            cycleTime();
        });

        // Method for the short break button to work
        shortBreakId.addEventListener('click', function () {
            startTime = $.now();
            length = shortBreak * 60 * 1000;
            endTime = startTime + length;
            cycleTime();
        });

        // Method for the long break button to work
        longBreakId.addEventListener('click', function () {
            startTime = $.now();
            length = longBreak * 60 * 1000;
            endTime = startTime + length;
            cycleTime();
        });


}) 