var gulp = require('gulp');
var server = require('gulp-server-livereload');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');

gulp.task('sass', function() {
	return gulp.src('app/style.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest('app/'));
});

gulp.task('watch', function() {
	gulp.watch('app/*.scss', ['sass']);
});

gulp.task('liveReload', ['watch'], function() {
  return gulp.src('app')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('default', ['liveReload']);
