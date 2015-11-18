var data = require('./models/content');

var router = function(app) {
	app.get('/projects/:slug', function (req, res) {
		var slug = req.params.slug;
		res.render('project', data.projects[slug]);
	});

	app.get('/index', function (req, res) {
		res.render('index', data);
	});

	app.get('/', function (req, res) {
	   res.render('index', data);
	});
};

module.exports = router;