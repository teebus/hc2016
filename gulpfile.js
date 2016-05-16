var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	sassGlob = require('gulp-sass-glob'),
	connect = require('gulp-connect'),
	autoprefixer = require('gulp-autoprefixer');
	sourcemaps = require('gulp-sourcemaps');

var mainSass = ['sass/styles.scss'],
	sassSources = ['sass/**/*.scss'],
	htmlSources = ['development/*.html'],
	outputDir = 'public';

gulp.task('sass', function() {
  gulp.src(sassSources)
  .pipe(sourcemaps.init())
  .pipe(sassGlob())
  .pipe(sass({
  	style: 'expanded',
  	includePaths: 'node_modules/foundation-sites/scss/'
}))
    .on('error', gutil.log)

    .pipe(autoprefixer({
  browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']}))
        .pipe(sourcemaps.write())
  .pipe(gulp.dest(outputDir + '/css'))
  .pipe(connect.reload())
});


gulp.task('html', function() {
	gulp.src(htmlSources)
	.pipe(gulp.dest(outputDir))
    .pipe(connect.reload());
});


gulp.task('watch', function () {
	gulp.watch(mainSass, ['sass']);
	gulp.watch(sassSources, ['sass']);
	gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
	connect.server({
		root: outputDir,
		livereload: true
	});
});


gulp.task('default', ['watch','sass','html','connect']);