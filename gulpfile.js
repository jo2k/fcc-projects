// Required modules
const { dest, parallel, series, src, watch } = require('gulp');
const sass = require('gulp-sass');
const browsersync = require('browser-sync').create();

// Server Variables
const srcDir = 'src/';
const scssDir = srcDir + 'scss/';
const publicDir = 'public/';
const cssDir = publicDir + 'css/';

// Start server
function serve(done) {
  browsersync.init({
    server: {
      baseDir: publicDir
    },
    port: 3000
  });
  done();
}

// Reload Browser
function reload(done) {
  browsersync.reload();
  done();
}

// Compile Sass
function compileSass() {
  return src(scssDir + '**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(dest(cssDir))
    .pipe(browsersync.stream());
}

// Watch Files
function watchFiles() {
  watch(scssDir + '**/*.scss', compileSass);
  watch(publicDir + '**/*.html', reload);
}

// Default Task
exports.default = series(parallel(serve, compileSass, watchFiles));
