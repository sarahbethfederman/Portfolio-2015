var express = require('express');
var exphbs = require('express-handlebars');
var compression = require('compression');
var path = require('path');
var ImgixClient = require('imgix-core-js');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');

var app = express();

// Database
var dbURL = process.env.MONGOLAB_URI || "mongodb://localhost/portfolio";

var db = mongoose.connect(dbURL, function(err) {
  if (err) {
    console.log("could not connect to db");
    throw err;
  }
});

var port = process.env.PORT || process.env.NODE_PORT || 3000;
var env = process.env.NODE_ENV || 'development';

// Use compression
app.use(compression());

// Set up static assets
app.use(express.static(path.resolve(__dirname + '../../public'))); 

// Set up imgix
var client = new ImgixClient("sarahfederman.imgix.net", "UucTkLWkcRgKy2SZMYe5aHHfXo40bB3Q"); 

// Set up handlebars (views)
app.set('views', __dirname + '../../views');

var hbs = exphbs.create({
	defaultLayout: 'main',
	extname: '.hbs',
	helpers: {
		imageUrl: function(url, options) {
			// generate imgix image paths
			if (options.hash) {
				return client.path(url).toUrl(options.hash).toString();
			} else {
				return client.path(url).toString();
			}
		},
		host: function() {
			// helper for creating absolute links
			if (env === 'production') {
				return 'http://sarah.codes';
			}
			return 'http://localhost:3000';
		},
		debug: function(optionalValue) {
		  console.log("Current Context");
		  console.log("====================");
		  console.log(this);
		 
		  if (optionalValue) {
		    console.log("Value");
		    console.log("====================");
		    console.log(optionalValue);
		  }
		}, 
		formatDate: function(timestamp) {
			var date = new Date(timestamp);

			var monthNames = [
			  "January", "February", "March",
			  "April", "May", "June", "July",
			  "August", "September", "October",
			  "November", "December"
			];
			var day = date.getDate();
			var month = date.getMonth();
			var year = date.getFullYear();

			return monthNames[month] + ' ' + day + ', ' + year;
		}
	}
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// Routing
var router = require('./router')(app);

var server = app.listen(port, function(err) {
    //if the app fails, throw the err
    if (err) {
      throw err;
    }
    console.log('Listening on port ' + port);
});
