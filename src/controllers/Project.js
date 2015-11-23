var Project = require('../models/Project');
var async = require('async');

var totalProjects;

function projectCount(callback) {
	Project.count({}, function(err, c) {
		totalProjects = c;
		
		callback(c);
	});
}

var getAllProjects = function(req, res, mainContent) {
	Project.find({}).select('-content').sort('order').exec(function(err, results) {
		mainContent.projects = results;
		res.render('index', mainContent);
	});
};

var getProject = function(req, res) {
	// THIS CODE IS SO GROSS EW
	var composeRefs = async.compose(getNext, getPrev);

	Project.findBySlug(req.params.slug, function(err, project) {
		projectCount(function() {
			// once we have the count saved
			composeRefs(project, function(err, result) {
				res.render('project', result);
			});
		});
	});
};

function getNext(project, callback) {
	var search;
	if (project.order >= totalProjects-1) {
		search = { order: 0 };
	} else {
		search = { order: project.order + 1 };
	}

	Project.findOne(search, 'slug', function(err, result) {
		project.set('next', result.slug);

		callback(null, project);
	});
}

function getPrev(project, callback) {
	var search;

	if (project.order <= 0) {
		search = { order: totalProjects-1 };
	} else {
		search = { order: project.order -1 };
	}

	Project.findOne(search, 'slug', function(err, result) {
		project.set('prev', result.slug);

		callback(null, project);
	});
}

module.exports.getAllProjects = getAllProjects;
module.exports.getProject = getProject;