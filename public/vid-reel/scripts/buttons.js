"use strict";

var buttons = {
    'makeButton': function(button, clickEvent) {
        button.addEventListener('click', clickEvent);
    },
    'initVidBtns': function(container, video) {
        var playPauseBtn = container.querySelector('#play-pause');
        this.makeButton(playPauseBtn, function() {
           // if the video is paused, play it
           if (video.paused) {
              video.play();

               // Update the button text to 'Pause'
               playPauseBtn.innerHTML = "Pause";
           } else {
               video.pause();

               // Update the button text to 'Play'
               playPauseBtn.innerHTML = "Play";
           }
        });

        var muteButton = container.querySelector("#mute");

        this.makeButton(muteButton, function() {
            // if not muted, mute the video
            if (!video.muted) {
                video.muted = true;

                // Update the button text
                muteButton.innerHTML = "Unmute";
            } else {
                // Unmute the video
                video.muted = false;

                // Update the button text
                muteButton.innerHTML = "Mute";
            }
        });

        var volumeBar = container.querySelector("#volume-bar");

        volumeBar.addEventListener("change", function() {
            // Update the video volume
            video.volume = volumeBar.value;
        });
    }
};

module.exports = buttons;