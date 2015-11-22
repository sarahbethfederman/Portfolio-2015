var Post = require('../models/Post');

var getAllPosts = function(req, res) {
	Post.find({}).sort('-date').exec(function(err, results) {
		if (err) {
			console.log(err);
			res.status(400).json({error: err});
		}
		res.render('blog', {posts: results});
	});
};

var addPost = function(req, res) {
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

var getPost = function(req, res) {
	Post.findBySlug(req.params.slug, function(err, post) {
		res.render('post', post);
	});
};

module.exports.addPost = addPost;
module.exports.getAllPosts = getAllPosts;
module.exports.getPost = getPost;
