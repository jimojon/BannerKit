'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const pngquant = require('imagemin-pngquant');

gulp.task('img', function() {
    return gulp.src(['src/*/*.png', 'src/*/*.jpg'])
        .pipe(
            imagemin(
                [pngquant({quality:'50-100'}), imagemin.jpegtran()],
                {progressive: true}
        ))
  	    .pipe(gulp.dest('bin/'));
});

gulp.task('css', function()
{
    return gulp.src('src/*/styles.css')
      .pipe(autoprefixer({
          browsers: ['last 10 versions'],
          cascade: false
      }))
      .pipe(cleanCSS())
      .pipe(gulp.dest('bin/'));
});

gulp.task('html', function()
{
    return gulp.src('src/*/index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('bin/'));
});

gulp.task('watch', function()
{
    gulp.watch('src/*/*', ['css', 'img', 'html']);
});