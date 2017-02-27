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
	var composeRefs = async.compose(getNext, getPrev);

	Project.findBySlug(req.params.slug, function(err, project) {
		projectCount(function() {
      res.render('project', project);
			// // once we have the count saved
			// composeRefs(project, function(err, result) {
				
			// });
		});
	});
};

function getNext(project, callback) {
	var search;

	// if its the last project
	if (project.order >= totalProjects-1) {
		// the next project is the first project
		search = { order: 0 };
	} else {
		// else it's the next in order
		search = { order: project.order + 1 };
	}

	// set the next property to the correct project slug
	Project.findOne(search, 'slug', function(err, result) {
    if (err) console.log(err);

		project.set('next', result.slug);

		// pass the transformed current project to getPrev
		callback(null, project);
	});
}

function getPrev(project, callback) {
	var search;

	// if it's the first project
	if (project.order <= 0) {
		// the previous project is the last project
		search = { order: totalProjects-1 };
	} else {
		// else its the one before it
		search = { order: project.order -1 };
	}

	// set the prev property to the correct project slug
	Project.findOne(search, 'slug', function(err, result) {
		project.set('prev', result.slug);

		// pass the transformed project with prev & next set to the final project
		callback(null, project);
	});
}

module.exports.getAllProjects = getAllProjects;
module.exports.getProject = getProject;