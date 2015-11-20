/**
 * Created by Sarah on 11/29/14.
 */
"use strict";

var buttons = require('./buttons.js');

var slideNav = {
    'names': [],
    'slides': [],
    'currentSlide': undefined,
    'navContainer': undefined,
    'onLeft': false,
    'onRight': false,
    'init': function(data, callback) {
        var self = this;

        for (var key in data) {
           if (data.hasOwnProperty(key)) {
               self.names.push(key);
           }
        }

        self.names.forEach(function(element, index, array) {
            var li = document.createElement("li");
            li.classList.add('slide');
            li.setAttribute("data-target-video", index);
            li.innerHTML = array[index];

            self.slides.push(li);

            self.navContainer.appendChild(li);

            buttons.makeButton(li, function() {
                var target = li.getAttribute('data-target-video');
                callback(target);
            });
        });

        self.initEvents();

        self.initArrows();
    },
    'initArrows': function() {
        var self = this;
        var arrowLeft = document.createElement("div");
        var arrowRight = document.createElement("div");
        self.navContainer.parentNode.appendChild(arrowLeft);
        self.navContainer.parentNode.appendChild(arrowRight);

        arrowLeft.classList.add('arrow-left');
        arrowRight.classList.add('arrow-right');
        console.log(arrowLeft);
        console.log(arrowRight);
        arrowLeft.addEventListener("mouseleave", function() {
            self.onLeft = false;
        });

        arrowLeft.addEventListener("mouseleave", function() {
            self.onRight = false;
        });

        arrowLeft.addEventListener("mouseenter", function() {
            //if (curr > 0) {
            //
            //}
            self.onLeft = true;
            if (self.onLeft) {
                var curr = parseInt(getComputedStyle(self.navContainer).getPropertyValue("left"));
                curr += 200;

                self.navContainer.style.left = curr + "px";
            }
        });

        arrowRight.addEventListener("mouseenter", function() {
            //if (curr > 0) {
            //
            //}
            self.onRight = true;

            if (self.onRight) {
                var curr = parseInt(getComputedStyle(self.navContainer).getPropertyValue("right"));
                console.log(curr);
                curr += 200;

                self.navContainer.style.right = curr + "px";
            }
        });
    },
    'initEvents': function() {
        var self = this;
        var viewAll = document.querySelector('.view-all');
        var overlay = document.createElement('div');
        overlay.classList.add("overlay");

        buttons.makeButton(viewAll, function() {
            self.navContainer.classList.toggle('viewing-all');

            if (self.navContainer.classList.contains('viewing-all')) {
                viewAll.innerHTML = "Close";
            } else {
                viewAll.innerHTML = "View all videos";
            }
        });

    },
    'move': function(target, currentSlide) {
        var self = this;
        var slide = self.navContainer.querySelector('.slide');   // first instance of slide
        var translatePx = target * 275;
        self.currentSlide = currentSlide;

        var selected = self.navContainer.querySelectorAll('.selected');
        if (selected != null) {
            for (var i = 0; i < selected.length; i++) {
                selected[i].classList.remove('selected');
            }
        }

        if (target - currentSlide >= 0) {    // positive means moving forward
            translatePx = -translatePx;
        } else {
            translatePx = 0;
        }

        console.log(translatePx);
        self.slides[target].classList.add('selected');

        //self.navContainer.style.transform = 'translate(' + translatePx +'px,' + -1 * (slide.offsetHeight / 2) + 'px)';
    }
};

module.exports = slideNav;
