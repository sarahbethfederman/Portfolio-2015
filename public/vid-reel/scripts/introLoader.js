// Loads the intro sequence
"use strict";

var mainLoop = require('./mainLoop.js');
var buttons = require('./buttons.js');
var videoModule = require('./video.js');

var introLoader = {
    'init': function(container, video, progressBar, skipBtn) {
        var self = this;

        // set up the skip button
        buttons.makeButton(skipBtn, function() {
            self.endIntro(container, video);
        });

        // start video load
        video.load();

      //  loader animation
        video.addEventListener('loadstart', function () {
            videoModule.loaderStart(container, video);
            console.log("loadstarted");
        });

        video.addEventListener('canplaythrough', function () {
            videoModule.loaderEnd(container, video);
        });

        //video.addEventListener('waiting', function () {
        //    videoModule.loaderStart(container, video);
        //    console.log('waiting');
        //});
        //
        //video.addEventListener('stalled', function () {
        //    videoModule.loaderStart(container, video);
        //    console.log('waiting');
        //});

        // progress bar length corresponds to timeupdate function
        video.addEventListener('timeupdate', function() {
            videoModule.progressBar(video, progressBar);
        });

        // when the video ends
        video.addEventListener('ended', function() {
            self.endIntro(container, video);
        });
    },
    'endIntro': function(container, video) {
        // fade out the whole intro container
        container.classList.add('fade-out');

        video.pause();

        // then start the main loop
        mainLoop.init();

        setTimeout(function() {
            document.body.removeChild(container);
        }, 300);
    }
};

module.exports = introLoader;