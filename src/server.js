var express = require('express');
var exphbs = require('express-handlebars');
var compression = require('compression');
var path = require('path');
var ImgixClient = require('imgix-core-js');
// TODO: add favicon

var app = express();

var port = process.env.PORT || process.env.NODE_PORT || 3000;

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
			return client.path(url).toUrl(options.hash).toString();
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
});

var indexData = {
	projects: [
		{
			title: "Design Portfolio Development",
			subtitle: "Custom Wordpress Theme",
			description: "For a fun freelance project, I developed a custom wordpress theme to house a client's design work.",
			link: "portfolio-theme"
		},
		{
			title: "Chadder",
			subtitle: "Website Reboot",
			description: "I designed and developed a new responsive website for RIT-based startup Chadder.",
			link: "chadder"
		},
		{
			title: "Interactive Particle Playground",
			subtitle: "HTML5 Canvas Experiment",
			description: "I developed a musical particle experience using HTML5 canvas and the web audio API",
			link: "chadder"
		},
	]
};

app.get('/', function (req, res) {
   res.render('index', indexData);
});


var server = app.listen(port, function(err) {
    //if the app fails, throw the err
    if (err) {
      throw err;
    }
    console.log('Listening on port ' + port);
});
