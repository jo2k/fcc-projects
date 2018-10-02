// Required packages
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var gulpSass = require('gulp-sass');

// Server Variables
var scssDir = 'scss/';
var publicDir = 'public/';
var cssDir = publicDir + 'css/';

// Compile Sass
gulp.task('compileSass', function () {
  return gulp.src([scssDir + 'main.scss'])
    .pipe(gulpSass({outputStyle: 'expanded'}).on('error', gulpSass.logError))
    .pipe(gulp.dest(cssDir))
    .pipe(browserSync.stream());
});

// Watch & Serve
gulp.task('serve', ['compileSass'], function () {
  browserSync.init({
    server: publicDir
  });

  gulp.watch([scssDir + '**/*.scss'], ['compileSass']);
  gulp.watch([publicDir + '**/*.html']).on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['serve']);
