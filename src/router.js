var Post = require('./controllers/Post.js');
var Project = require('./controllers/Project.js');
var mainContent = require('./main.json');

var router = function(app) {

	app.get('/projects/:slug', Project.getProject);

	app.get('/blog', Post.getAllPosts);

	app.post('/blog', Post.addPost);

	app.get('/blog/:slug', Post.getPost);

	app.get('/index', function (req, res) {
		Project.getAllProjects(req, res, mainContent);
	});

	app.get('/', function (req, res) {
		Project.getAllProjects(req, res, mainContent);
	});
};

module.exports = router;