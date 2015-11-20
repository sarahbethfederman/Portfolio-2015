// GLOBAL IIFE
(function() {

  // SMOOTH SCROLL via css-tricks ----------------------- //
  var smoothScroll = function() {
    $('a[href*=#]:not([href=#])').click(function() {
     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
       var target = $(this.hash);
       target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
       if (target.length) {
         $('html,body').animate({
           scrollTop: target.offset().top
         }, 1000);
         return false;
       }
     }
    });
  };

  // AJAX STUFF ------------------------------------------- //

  var APIBoxes = {
    'init': function($twitterBox, $blogBox, $treehouseBox) {
      this.twitter('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=sarah_federman&count=1');
      this.blog('http://sarahbethfederman.com/blog/feed/');
      this.treehouse('http://teamtreehouse.com/sarahfederman.json');
    },
    'twitter': function(url) {
      $.ajax({
        url: url,
        dataType: 'json',
        success: function(data) {
          //console.log(data);
        }
      });
    }, 
    'blog': function(url) {
      $.ajax({
        url: url,
        dataType: 'json',
        success: function(data) {
          //console.log(data.responseData.feed);
        }
      });
    },
    'treehouse': function(url) {
      $.ajax({
        url: url,
        dataType: 'json',
        success: function(data) {
          //console.log(data);
        }
      }); 
    }
  }
 
  function getWPpost(url, $blogBox) {
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        $blogBox.find('h2').html('<a href="' + data.posts[0].URL + '">' + data.posts[0].title + '</a>');
        $blogBox.find('p').html(data.posts[0].excerpt);
        //console.log(data);
      },
      error: function(err) { 
        //console.log(err);
      }
    });
  }

  var Carousel = function($root) {
    function Carousel($root, $slides) {
      this.$ul = $slides;
      this.$slideList = $('.slide', $slides);
      this.$slides = $(this.$slideList); // wrap in jquery prototype
      this.currentSlide = 0;

      this.slide();
    }

    Carousel.prototype.slide = function() {
      if (this.currentSlide === 0) {
        this.$ul.css('top', '0px');

        console.log(this.$ul.css('top'));
      } else {
        console.log("actual: " + this.currentSlide * -200 + "px", this.currentSlide);

        this.$ul.animate({
          'top': this.currentSlide * -200 + 'px'
        });

        console.log("what its set to: " + this.$ul.css('top'), this.currentSlide);
      }

      this.currentSlide++;

      // set slide loop
      if (this.currentSlide < this.$slides.length) {
        setTimeout(this.slide.bind(this), 1000);
      } else {
        this.currentSlide = 0;

        console.log("finished loop");
        this.slide();
      }
    }; // end slide

    return Carousel;
  }();

  // INIT FUNCTION -------------------------------------- //

  $(document).ready(function() {

    // Hook up DOM
    var $triggers = $('a[class="js-lightbox"]'),
        $treehouseBox = $('.treehouse-box'),
        $twitterBox = $('.twitter-box'),
        $blogBox = $('.blog-box');

    // assign work slide links
    $('[data-href]').click(function() {
      var url = $(this).attr('data-href');
      location.href = url;
    });

    // Init smooth scroll
    smoothScroll();

    // Init Skrollr
    if($(window).width() > 1000){
      skrollr.init({
          forceHeight: false
      });
    }

    // Init blogBox
    getWPpost("https://public-api.wordpress.com/rest/v1.1/sites/sarahbethfederman.com%2Fblog/posts/?number=1", $blogBox);

    // Init Fancybox
    $lightBox = $('.lightbox');
    if ($lightBox.length) {
      $lightBox.fancybox({"fitToView": false, "maxWidth": "90%"});
    }

    // Init Carousels
    //var c = new Carousel($('.carousel'), $('.carousel .slides'));
  });

  $(document).on('post-load', function() {
      // strip .infinite loader from page
      $('.infinite-loader').remove();
  });

})();
