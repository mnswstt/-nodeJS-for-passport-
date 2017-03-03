// *** dependencies *** //

const path = require('path');
const gulp = require('gulp');
const jshint = require('gulp-jshint');
const jscs = require('gulp-jscs');
const runSequence = require('run-sequence');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const server = require('tiny-lr')();
const sass = require('gulp-ruby-sass');
const imagemin = require('gulp-imagemin');
const prefix = require('gulp-autoprefixer');

// *** config *** //

const paths = {
  scripts: [
    path.join('src', '**', '*.js'),
    path.join('src', '*.js')
  ],
  styles: [
    path.join('src', 'client', 'sass', '**', '*.sass')
  ],
  views: [
    path.join('src', 'server', '**', '*.html'),
    path.join('src', 'server', '*.html')
  ],
  images: path.join('src', 'client', 'images'),
  server: path.join('src', 'server', 'server.js')
};

const lrPort = 35729;

const nodemonConfig = {
  script: paths.server,
  ext: 'html js css',
  ignore: ['node_module'],
  env: {
    NODE_ENV: 'development'
  }
};

// *** default task *** //

gulp.task('default', () => {
  runSequence(
    ['jshint'],
    ['jscs'],
    ['lr'],
    ['nodemon'],
    ['image'],
    ['watch']
  );
});

// *** sub tasks ** //

gulp.task('jshint', () => {
  return gulp.src(paths.scripts)
  .pipe(plumber())
  .pipe(jshint({ esnext: true }))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', () => {
  return gulp.src(paths.scripts)
  .pipe(plumber())
  .pipe(jscs())
  .pipe(jscs.reporter())
  .pipe(jscs.reporter('fail'));
});

gulp.task('image', () => {
  gulp.src(paths.images)
  .pipe(imagemin())
  .pipe(gulp.dest(paths.images));
});

gulp.task('styles', () => {
  return sass(paths.styles, {style: 'compressed'})
  .pipe(prefix('last 2 versions'))
  .pipe(gulp.dest('src/client/css/'));
  /*gulp.src(paths.styles)
    .pipe(sass({style: 'compact'}))
    .pipe(prefix('last 2 versions'))
    .pipe(gulp.dest('src/client/css/'));*/
});

gulp.task('views', () => {
  return gulp.src(paths.views)
  .pipe(plumber());
});

gulp.task('lr', () => {
  server.listen(lrPort, (err) => {
    if (err) {
      return constole.error(err)
    }
  })
});

gulp.task('nodemon', () => {
  return nodemon(nodemonConfig);
});

gulp.task('watch', () => {
  gulp.watch(paths.views, ['views']);
  gulp.watch(paths.scripts, ['jshint', 'jscs']);
  gulp.watch(paths.styles, ['styles']);
});
