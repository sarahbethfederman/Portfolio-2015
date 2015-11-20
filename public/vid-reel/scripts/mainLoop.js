// Main loop
"use strict";

var Slide = require('./slide.js');  // Slide module
var dataLoader = require('./dataLoader.js');
var videoModule = require('./video.js');
var buttons = require('./buttons.js');
var slideNav = require('./slideNav');
var preloader = require('./preloader.js');

var loop = {
    'videoData': undefined,
    'slides': [],
    'currentSlide': 0,
    'videoContainer': undefined,
    'contentContainer': undefined,
    'video': undefined,
    'overlayOn': false,
    'timer': undefined,
    'init': function() {
        var self = this,
            progressBar = self.videoContainer.querySelector('progress');

        self.video = self.videoContainer.querySelector('video');

        // display the video
        self.videoContainer.classList.add('fade-in');

        // display the content
        self.contentContainer.classList.add('fade-in');

        // init events
        self.initEvents(this.video, progressBar);
        self.mouseEffect();

        // get the video data. When loaded, create the slides
        dataLoader.getData(self.createSlides.bind(self));
    },
    'mouseEffect': function() {
        var self = this,
            overlayOn = false;

        // start the timer
        self.startTimer();

        // reset the timers on every mouse move
        self.contentContainer.addEventListener('mousemove', function() {
            self.showOverlay();
        });
    },
    'startTimer': function() {
        var self = this;

        // if the mouse hasn't moved in 4 seconds
        self.timer = setTimeout(function() {
            // if the content is showing
            if (self.overlayOn) {
                // fade the content out
                self.contentContainer.classList.remove('fade-in');
                self.contentContainer.classList.add('fade-out');
                self.video.classList.remove('blur');

                // the overlay is off
                self.overlayOn = false;

                self.startTimer();
            }
        }, 4000);
    },
    'showOverlay': function() {
        var self = this;

        // clear the timer
        clearTimeout(self.timer);

        // blur the video
        self.video.classList.add('blur');

        // fade the content back in
        self.contentContainer.classList.remove('fade-out');
        self.contentContainer.classList.add('fade-in');

        // the overlay is on
        self.overlayOn = true;

        // don't clear the overlay if it's a filler vid
        if (!self.video.classList.contains('filler')) {
            self.startTimer();
        }
    },
    'createSlides': function(vidData) {
        this.videoData = vidData;
        var self = this;

        // init the slideNav
        slideNav.init(self.videoData, function(target) {
            // calculate the offset for each slide

            // move to next slide
            self.next(target);

            // move the slidenav
            slideNav.move(target, self.currentSlide);
        });

        // create a slide for each video
        for (var video in this.videoData) {
            if (this.videoData.hasOwnProperty(video)) {
                var slide = new Slide(this.videoData[video], this.videoContainer, this.contentContainer);
                slide.key = video;  // store the access key as the json object name
                self.slides.push(slide);
            }
        }

        // start looping
        this.startLoop();
    },
    'initEvents': function(video, progressBar) {
        // LOADER ANIMATION
        var self = this;

        // start video load
        video.load();

        video.addEventListener('loadstart', function () {
            videoModule.loaderStart(self.videoContainer, self.video);
            console.log("loadstarted");
        });

        video.addEventListener('canplaythrough', function () {
            videoModule.loaderEnd(self.videoContainer, self.video);
            console.log("canplaythrough");
        });

        //video.addEventListener('waiting', function () {
        //    videoModule.loaderStart(self.videoContainer, self.video);
        //    console.log('waiting');
        //});
        //
        //video.addEventListener('stalled', function () {
        //    videoModule.loaderStart(self.videoContainer, self.video);
        //    console.log('stalled');
        //});

        // progress bar length corresponds to timeupdate function
        video.addEventListener('timeupdate', function() {
            videoModule.progressBar(video, progressBar);
        });

        // once the video has ended, loop to the next one
        video.addEventListener('ended', function() {
            self.next();
        });

        // INIT VIDEO CONTROLS
        buttons.initVidBtns(this.contentContainer.querySelector('.video-controls'), video);
    },
    'startLoop': function() {
        // set the currentSlide to the beginning
        this.currentSlide = 0;

        // start preloader
        //preloader.start(this.slides);

        // cycle the current slide in
        this.next();
    },
    'next': function(target) {
        var self = this;

        // pause current video
        self.video.pause();

        // preload next video
        //preloader.load(self.slides[self.currentSlide].videoUrl);

        // once at the end, wrap around to loop
        if (self.currentSlide > self.slides.length-1) {
            self.currentSlide = 0;
        }

        // if navigating to a specific slide
        if (target) {
            // cycle the prev slide out
            if (self.currentSlide == 0) {
                // if at the beginning, cycle the last slide out
                self.slides[self.slides.length-1].cycleOut();
            } else {
                // else, cycle out the previous one
                self.slides[self.currentSlide-1].cycleOut();
            }

            // cycle in the target
            setTimeout(function() {
                self.slides[target].cycleIn();

                // show the overlay
                self.showOverlay();

                // set current slide to the target
                self.currentSlide = target;

                // iterate to next slide
                self.currentSlide++;
            }, 300);
        } else {
            // cycle the prev slide out
            if (self.currentSlide == 0) {
                // if at the beginning, cycle the last slide out
                self.slides[self.slides.length-1].cycleOut();
            } else {
                // else, cycle out the previous one
                self.slides[self.currentSlide-1].cycleOut();
            }

            // cycle the next one in
            setTimeout(function() {
                self.slides[self.currentSlide].cycleIn();

                // show the overlay
                self.showOverlay();

                // iterate to next slide
                self.currentSlide++;
            }, 300);
        }
    }
};

module.exports = loop;