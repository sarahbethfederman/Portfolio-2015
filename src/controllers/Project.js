var Project = require('../models/Project');

var getAllProjects = function(req, res, mainContent) {
	Project.find({}).select('-content').sort('order').exec(function(err, results) {
		mainContent.projects = results;
		res.render('index', mainContent);
	});
};

var getProject = function(req, res) {
	Project.findBySlug(req.params.slug, function(err, project) {
		res.render('project', project);
	});
};

module.exports.getAllProjects = getAllProjects;
module.exports.getProject = getProject;