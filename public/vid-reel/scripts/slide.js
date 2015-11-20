// slide module
"use strict";


var Slide = function() {
    var Slide = function(videoData, container, contentContainer) {           // videoData is JSON object
        this.posterUrl = videoData['posterUrl'];                        // path to poster URL
        this.bioPic = videoData['bioPic'];                              // path the bio avatar
        this.bioCopy = videoData['bioCopy'];                            // biography text/html string
        this.interviewee = videoData['interviewee'];                    // name of interviewee
        this.interviewer = videoData['interviewer'];                    // who interviewed them
        this.container = container;                                     // video container div
        this.contentContainer = contentContainer;                       // content container div
        this.videoEl = container.querySelector('.video-loop');          // <video> element
        this.header = contentContainer.querySelector('header');

        if (videoData['videoUrl']) {
            this.videoUrl = videoData['videoUrl'];
        } else {
            this.isFiller = true;
            this.videoUrl = this.fillerUrl;
        }
    };

    Slide.prototype.cycleIn = function() {              // start this slide
        // set up the header
        this.createHeader();

        // animate video in
        this.container.classList.remove('fade-out');
        this.container.classList.add('fade-in');

        // if there is a video, play it
        //if (!this.isFiller) {
            this.videoEl.src = this.videoUrl;
            this.videoEl.style.opacity = '.7';
            this.videoEl.style.width = '100%';
            this.videoEl.classList.add('blur');
            this.videoEl.classList.remove('filler');
           // this.videoEl.play();
        //} else {
        //    // else, dim and play the filler
        //    this.videoEl.src = this.fillerUrl;  // filler url is hooked up in main.js
        //    this.videoEl.style.opacity = '.2';
        //    this.videoEl.style.width = 'auto';
        //    this.videoEl.classList.add('blur');
        //    //this.videoEl.play();
        //}

    };

    Slide.prototype.cycleOut = function(callback) {     // end & move this slide out
        // animate video out
        this.container.classList.remove('fade-in');
        this.container.classList.add('fade-out');

        // if there's a callback, execute it
        if (callback) {
            callback();
        }
    };

    Slide.prototype.createHeader = function() {
        // fade out the header
        this.header.classList.remove('fade-in');
        this.header.classList.add('fade-out');

        // set the bio picture
        if (this.bioPic) {
            this.header.querySelector('.bio__pic').classList.add('show');
            this.header.querySelector('.bio__pic').classList.remove('hide');
            this.header.querySelector('.bio__pic').src = this.bioPic;
        } else {
            this.header.querySelector('.bio__pic').classList.remove('show');
            this.header.querySelector('.bio__pic').classList.add('hide');
        }

        // set the bio title
        this.header.querySelector('.bio__title').innerHTML = this.interviewee;

        // set the bio copy
        this.header.querySelector('.bio__copy').innerHTML = this.bioCopy;

        // fade it back in w/ changes applied
        this.header.classList.remove('fade-out');
        this.header.classList.add('fade-in');
    };

    return Slide;
}();


module.exports = Slide;