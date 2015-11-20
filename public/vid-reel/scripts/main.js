/**
 * Created by Sarah on 11/20/14.
 * Main js file
 * uses Browserify for requiring modules (instead of requireJS like on the last project)
 */
"use strict";

var main = {
  'dataLoader': require('./dataLoader.js'),
  'buttons': require('./buttons.js'),
  'introLoader': require('./introLoader.js'),
  'mainLoop': require('./mainLoop.js'),
  'slideNav': require('./slideNav.js'),
  'preloader': require('./preloader.js'),
  'Slide': require('./slide.js'),
  'videoModule': require('./video.js'),
  'init': function() {
    console.log("inited!");
    var self = this;

    // HOOK UP DOM
    var introVid = document.querySelector('[rel="js-intro-vid"'),
        introProgress = document.querySelector('[rel="js-intro-progress"'),
        skipBtn = document.querySelector('[rel="js-skip-intro"'),
        introContainer = document.querySelector('.intro-container');

    // preload
    self.preloader.load(introVid.src);

    // init the video events module
    self.videoModule.init();

    self.Slide.prototype.fillerUrl = "assets/videos/filler.mp4";
    self.slideNav.navContainer = document.querySelector('.slide-container');
    self.mainLoop.videoContainer = document.querySelector('.video-container');
    self.mainLoop.contentContainer = document.querySelector('.content-container');

    // START THE INTRO
    self.introLoader.init(introContainer, introVid, introProgress, skipBtn);

    // PRELOAD DATA from Firebase
    self.dataLoader.loadData();
  }
};

// init on document ready
document.addEventListener("DOMContentLoaded", function(event) {
  main.init();
});
