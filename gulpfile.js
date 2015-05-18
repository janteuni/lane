var gulp = require('gulp');
var server = require('gulp-server-livereload');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');

gulp.task('sass', function() {
	return gulp.src('app/style.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest('app/'));
});

gulp.task('build-css', function() {
    return gulp.src('app/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['build-css'], function() {
    return gulp.src([
        'app/fonts/*',
        'app/images/*',
        'app/index.html'
    ], { base: 'app' })
        .pipe(gulp.dest('dist'));
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
