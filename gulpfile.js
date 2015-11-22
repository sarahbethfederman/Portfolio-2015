'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps'); 
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var gulpUtil = require('gulp-util');

var jsFiles = ['./public/js/**/*.js', '!./public/js/global*.js']; // ! ignores output files (avoid infinite loop)
var jsDest = './public/js'; 
var jsServer = './src/**/*.js';
var cssFiles = './public/sass/**/*.scss';

gulp.task('lint', function() {
  gulp.src(jsServer)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('styles', function() {
	sass('./public/sass/style.scss', {sourcemap: true, style: 'compressed'})
	.pipe(autoprefixer("last 2 versions"))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./public'));
});

// Concat and uglify all public scripts
gulp.task('scripts', function() {
	return gulp.src(jsFiles)
		.pipe(concat('global.js'))
		.pipe(rename('global.min.js'))
		.pipe(uglify().on('error', gulpUtil.log))
		.pipe(gulp.dest(jsDest));
});

// watch for changes
gulp.task('watch', function () {
	// lint node files
	gulp.watch(jsServer, ['lint']);
	// concat/uglify public js
	gulp.watch(jsFiles, ['scripts']);
	// watch sass files
	gulp.watch(cssFiles, ['styles'])
});

// restart server on changes
gulp.task('start', function() {
	nodemon({
		script: 'src/server.js',
		ext: 'js hbs css', 
		env: { 'NODE_ENV': 'development'},
		tasks: function(changedFiles) {
			var tasks = [];
			changedFiles.forEach(function (file) {
				if (path.extname(file) === '.js' && !~tasks.indexOf('lint')) {
					tasks.push('lint');
				}
	      if (path.extname(file) === '.scss' && !~tasks.indexOf('styles')) {
	      	tasks.push('styles');
	      }
	    });
	    return tasks;
		}
	})
	.on('restart', function() {
		console.log('restarted!');
	});
});

gulp.task('default', ['start']);

