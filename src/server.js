var express = require('express');
var exphbs = require('express-handlebars');
var compression = require('compression');
var path = require('path');
var ImgixClient = require('imgix-core-js');
var favicon = require('serve-favicon');

var app = express();

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
			if (options.hash) {
				return client.path(url).toUrl(options.hash).toString();
			} else {
				return client.path(url).toString();
			}
		},
		host: function() {
			if (env === 'production') {
				return 'https://federman-portfolio.herokuapp.com';
			}
			return 'http://localhost:3000';
		},
		ifCond: function(v1, v2, options) {
			console.log(v2);
			if (options.hash['half']) {
				v2 = (v2-1)/2;
			}
		  if(v1 === v2) {
		    return options.fn(this);
		  }
		  return options.inverse(this);
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
