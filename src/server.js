var express = require('express');
var exphbs = require('express-handlebars');
var compression = require('compression');
var path = require('path');
var ImgixClient = require('imgix-core-js');
// TODO: add favicon

var app = express();

var port = process.env.PORT || process.env.NODE_PORT || 3000;

// use compression
app.use(compression());
app.use(express.static(path.resolve(__dirname + '../../public')));

// set up imgix
var client = new ImgixClient("sarahfederman.imgix.net", "UucTkLWkcRgKy2SZMYe5aHHfXo40bB3Q");

// Set up handlebars
var hbs = exphbs.create({
	defaultLayout: 'main',
	extname: '.hbs',
	helpers: {
		imageUrl: function(url) {
			return client.path(url);
		}
	}
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.get('/chadder', function (req, res) {
	res.render('chadder');
});

app.get('/index', function (req, res) {
	res.render('index');
})

app.get('/', function (req, res) {
   res.render('index');
});


var server = app.listen(port, function(err) {
    //if the app fails, throw the err
    if (err) {
      throw err;
    }
    console.log('Listening on port ' + port);
});
