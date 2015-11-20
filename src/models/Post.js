var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	excerpt: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}, 
	content: {
		type: String,
		required: true
	}
});

PostSchema.pre('save', function(next) {
	// make a default slug based on the title
	this.slug = this.get('title').toLowerCase().replace(' ', '-');
});

PostSchema.static('findBySlug', function(slug, callback) {
	return this.findOne({slug: slug}, callback);
});

module.exports = mongoose.model('Post', PostSchema);