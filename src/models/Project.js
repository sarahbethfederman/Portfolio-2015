var mongoose = require('mongoose');

var SlideSchema = new mongoose.Schema({
	colorScheme: {
		type: String,
		default: "dark"
	},
	title: {
		type: String,
		required: true,
		trim: true
	}
	subtitle: {
		type: String,
		trim: true
	},
	content: {
		type: String,
		required: true
	},
	timeline: [	// another subdocument
		{
			image: {
				type: String,
				required: true
			},
			title: {
				type: String,
				required: true
				trim: true
			},
			description: {
				type: String,
				required: true
			}
		}
	]
});

var ContentSchema = new mongoose.Schema({
	backgroundImage: {
		type: String
	}
	description: {
		type: String,
		required: true
	},
	liveSite: {
		type: String
	},
	repo: {
		type: String
	},
	slides: [SlideSchema]
});

var ProjectSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	subtitle: {
		type: String,
		required: true,
		trim: true
	}
	description: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true,
		match: /^\S*$/		// no spaces allowed
 	},
	backgroundImage: {
		type: String,
		required: true
	},
	logo: {
		type: String
	},
	tags: {
		type: [String]
	}, 
	content: ContentSchema
});

// TO DO: Add NEXT / PREV references

ProjectSchema.static('findBySlug', function(slug, callback) {
	return this.findOne({slug: slug}, callback);
});

module.exports = mongoose.model('Project', ProjectSchema);