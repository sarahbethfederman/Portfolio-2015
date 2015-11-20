/**
 * Created by Sarah on 12/1/14.
 */

var preloader = {
    'ghost': document.createElement("video"),
    'ghost2': document.createElement("video"),
    'ghosts': [],
    'currentVid': 0,
    'load': function(url) {
        this.ghost2.src = url;
    },
    'start': function(vids) { // takes array of slide objects
        var self = this;
        console.log(vids);

        self.ghost.addEventListener('canplaythrough', startLoad);

        // load the first one
        self.ghosts[0] = document.createElement('video');
        self.ghosts[0].src = vids[0].videoUrl;

        self.ghosts[0].addEventListener('canplaythrough', startLoad);

        function startLoad() {
            if (self.currentVid > vids.length-1) {
                console.log("ended");
                return;
            }

            if (self.ghosts[self.currentVid].readyState == 4) {
                inc();
            } else {
                setTimeout(startLoad, 100);
            }
        }

        function inc() {
            self.currentVid++;
            self.ghosts.push(document.createElement('video'));

            self.ghosts[self.currentVid].src = vids[self.currentVid].videoUrl;
            console.log("can play" + self.currentVid);
            console.log(vids[self.currentVid]);

            startLoad();
        }
    }
};



module.exports = preloader;