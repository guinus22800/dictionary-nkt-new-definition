/* Dependencies
========================================================================== */

// standard gulp plugins
import gulp from 'gulp'
import gpConcat from 'gulp-concat'
import gpRename from 'gulp-rename'
import gpSourcemaps from 'gulp-sourcemaps'

// scripts
import gpUglify from 'gulp-uglify'

// markup
import gpHtmlmin from 'gulp-htmlmin'

// styles
import gpSass from 'gulp-sass'
import gpCleanCss from 'gulp-clean-css'
import gpAutoprefixer from 'gulp-autoprefixer'

// server
import browserSync from 'browser-sync'







/* Paths
========================================================================== */

// Watch
const watchArray = [
  'assets/**/*',
  'pages/**/*',
  'data/**/*'
]

// Markup
const markup = {
  pages: {
    src: 'pages/**/*.html',
    dest: 'dist'
  },
  layouts: {
    src: 'layouts/**/*',
    dest: 'dist/layouts'
  }
}


// Styles
const styles = {
  src: 'assets/styles/main.scss',
  dest: 'dist/styles'
}



// Scripts
const js = {
  src: [
    'assets/js/index.js',
    'assets/js/custom/**/*.js',
    'node_modules/mark.js/dist/mark.min.js',
  ],
  dest: 'dist/js'
}


// Data
const data = {
  src: [
    'data/**/*',
  ],
  dest: 'dist/data'
}





/* Functions
========================================================================== */

// Process JS
export function processJs(done) {
  return gulp.src(js.src)
    .pipe(gpSourcemaps.init())
    .pipe(gpConcat('concat.js'))
    .pipe(gpRename('buddhist-addElement.min.js'))
    .pipe(gpUglify())
    .pipe(gpSourcemaps.write('./'))
    .pipe(gulp.dest(js.dest))
    done();
}


// Process styles
export function processStyles(done) {
  return gulp.src(styles.src)
    .pipe(gpSass().on('error', gpSass.logError))
    .pipe(gpAutoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(gpCleanCss())
    .pipe(gulp.dest(styles.dest));
    done();
}

// Process data
export function processData (done) {
  return gulp.src(data.src)
    .pipe(gulp.dest(data.dest))
    done();
}


// Process main markup
export function pages(done) {
  return gulp.src(markup.pages.src)
    .pipe(gpHtmlmin(
      {
        collapseWhitespace: true,
        removeComments: true
      }
    ))
    .pipe(gulp.dest(markup.pages.dest));
    done();
}

// Process layouts markup
export function layouts(done) {
  return gulp.src(markup.layouts.src)
    .pipe(gpHtmlmin(
      {
        collapseWhitespace: true,
        removeComments: true
      }
    ))
    .pipe(gulp.dest(markup.layouts.dest));
    done();
}

// Combine both of the above into a gulp series (written here for convenience)
const processHtml = gulp.series(pages, layouts)




// BrowserSync create
const server = browserSync.create();

// BrowserSync reload
export function reload(done) {
  server.reload();
  done();
}

// BrowserSync serve
export function serve(done) {
  server.init({
    server: {
      baseDir: './dist',
      open: true,
      notify: false
    }
  });
  done();
}




/* GULP COMMANDS
========================================================================== */
const process = gulp.parallel(processJs, processStyles, processHtml, processData)

const watch = () => gulp.watch(watchArray, gulp.series(process, reload));

const processAndServe = gulp.series(process, serve, watch)

exports.process = process
export default processAndServe
