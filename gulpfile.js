'use strict';

const gulp       = require('gulp');
const sass       = require('gulp-sass');
const concat     = require('gulp-concat');
const uglify     = require('gulp-uglify');
const rename     = require('gulp-rename');
const handlebars = require('gulp-compile-handlebars');
const cleanCSS   = require('gulp-clean-css');

gulp.task('default', [ 'sass', 'js:vendor', 'js:app', 'index-page', 'watch' ]);
gulp.task('build', [ 'sass', 'js:vendor', 'js:app', 'index-page' ]);

/**
███████╗ █████╗ ███████╗███████╗
██╔════╝██╔══██╗██╔════╝██╔════╝
███████╗███████║███████╗███████╗
╚════██║██╔══██║╚════██║╚════██║
███████║██║  ██║███████║███████║
╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝
 */

gulp.task('sass', (done)=> {

    gulp.src('./src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('./public/styles'));

    return done();

});

/**
██╗   ██╗███████╗███╗   ██╗██████╗  ██████╗ ██████╗ 
██║   ██║██╔════╝████╗  ██║██╔══██╗██╔═══██╗██╔══██╗
██║   ██║█████╗  ██╔██╗ ██║██║  ██║██║   ██║██████╔╝
╚██╗ ██╔╝██╔══╝  ██║╚██╗██║██║  ██║██║   ██║██╔══██╗
 ╚████╔╝ ███████╗██║ ╚████║██████╔╝╚██████╔╝██║  ██║
  ╚═══╝  ╚══════╝╚═╝  ╚═══╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
 */

gulp.task('js:vendor', (done)=> {

    const vendorFiles = [];

    gulp.src( vendorFiles )
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./public/js'));

    return done();

});

/**
     ██╗███████╗
     ██║██╔════╝
     ██║███████╗
██   ██║╚════██║
╚█████╔╝███████║
 ╚════╝ ╚══════╝
 */

gulp.task('js:app', (done)=> {

  const appFiles = [
    './src/js/main.js'
  ];

  gulp.src( appFiles )
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./public/js'));
  
  return done();

});

/**
██╗  ██╗████████╗███╗   ███╗██╗
██║  ██║╚══██╔══╝████╗ ████║██║
███████║   ██║   ██╔████╔██║██║
██╔══██║   ██║   ██║╚██╔╝██║██║
██║  ██║   ██║   ██║ ╚═╝ ██║███████╗
╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝╚══════╝
 */
// Handlebars
gulp.task('index-page', (done)=> {

    const opts = {};
    const data = {
      mailChimp: "//etonmessy.us6.list-manage.com/subscribe/post-json?u=517dd7e140c43f159ec211a40&id=2282e1d801&c=?",
      title: 'In:Season'
    };

    gulp.src('./src/index.hbs')
        .pipe(handlebars(data, opts))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./public'));

    return done();
});

/**
██╗    ██╗ █████╗ ████████╗ ██████╗██╗  ██╗
██║    ██║██╔══██╗╚══██╔══╝██╔════╝██║  ██║
██║ █╗ ██║███████║   ██║   ██║     ███████║
██║███╗██║██╔══██║   ██║   ██║     ██╔══██║
╚███╔███╔╝██║  ██║   ██║   ╚██████╗██║  ██║
 ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝
 */

gulp.task('watch', (done)=> {
    gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.js',   ['js:app']);
    gulp.watch('./src/**/*.hbs', ['index-page']);
});
