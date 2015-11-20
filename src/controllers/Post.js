var Post = require('../models/Post');

var getAllPosts = function(req, res) {
	Post.find(function(err, posts) {
		if (err) {
			console.log(err);
			res.status(400).json({error: err});
		}
		res.render('blog', posts);
	});
};

var newPost = function(req, res) {
	if (!req.body.title || !req.body.excerpt || !req.body.content) {
		return res.status(400).json({error: 'Required field missing!'});
	}

	var postData = {
		title: req.body.title,
		excerpt: req.body.excerpt,
		content: req.body.content
	};

	var newPost = new Post(postData);

	newPost.save(function(err) {
		if (err) {
			console.log(err);
			return res.status(400).json({error: 'An error occurred'});
		}
		res.json({success: 'saved!'});
	});
};

var getPost = function()

module.exports.newPost = newPost;
module.exports.getAllPosts = getAllPosts;
