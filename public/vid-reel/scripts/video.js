/**
 * Collection of video events
 * Created by Sarah on 11/28/14.
 */


var video = {
    'loader': undefined,
    'init': function() {
        this.loader = document.createElement('div');

        this.loader.classList.add('loader');
        this.loader.innerHTML = '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"width="80px" height="80px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"> <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/></path></svg>';

        this.loaderStart.bind(this);
        this.loaderEnd.bind(this);
    },
    'progressBar': function(video, progressBar) {
        // get the percentage of video played
        var percentage = (video.currentTime / video.duration) * 100;

        // set the progress bar value
        progressBar.value = percentage;
    },
    'loaderStart': function(root, video) {
        var self = this;

        // fill it with the loader SVG
        root.appendChild(self.loader);

        //self.loaderEnd(root, video);
    },
    'loaderEnd': function(root, video) {
        var self = this;

        root.removeChild(self.loader);

        video.play();

        //function checkLoad() {
        //    if (video.readyState === 4) {
        //        console.log("ready to play");
        //        root.removeChild(self.loader);
        //        video.play();
        //    } else {
        //        setTimeout(checkLoad, 100);
        //    }
        //}
        //
        //checkLoad();
    }
};

module.exports = video;