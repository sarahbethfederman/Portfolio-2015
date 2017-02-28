var Project = require('../models/Project');
var async = require('async');

var totalProjects;

function projectCount(callback) {
	// get total number of projects
	Project.count({}, function(err, c) {
		totalProjects = c;

		return totalProjects;
	});
  return totalProjects;
}

var getAllProjects = function(req, res, mainContent) {
	// Get projects and sort them by order property
	Project.find({}).select('-content').sort('order').exec(function(err, results) {
		// assign the results to the mainContent json
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