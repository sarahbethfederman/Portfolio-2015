/**
 * Created by Sarah on 11/24/14.
 * Loads video data from firebase
 */

// require Firebase from node.js
var Firebase = require('firebase');

var dataLoader = {
    'ref': new Firebase('https://gallery-r.firebaseio.com/videos'),
    'vidData': undefined,
    'loadData': function(callback) {
        // loads the data from firebase
        var self = this;

        self.ref.once("value", function(data) {
            self.vidData = data.val();

            // when done loading, run the callback function with the data we loaded
            if (callback) {
                callback(self.vidData);
            }
        });
    },
    'getData': function(callback) {
        // getter method for firebase data
        var self = this;

        // if the data has already loaded, return it
        if (self.vidData) {
            callback(self.vidData);
        } else {
            self.loadData(callback);
        }
    }
};

module.exports = dataLoader;
