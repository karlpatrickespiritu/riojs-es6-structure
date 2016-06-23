'use strict';

import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import livereload from 'gulp-livereload';
import riotify from 'riotify';
import plumber from 'gulp-plumber';

gulp.task('build', () => {
    return browserify({
            entries: './src/js/app.js',
            debug: true
        })
        .transform("babelify", { presets: ["es2015"] })
        .transform(riotify)
        .bundle()
        .pipe(source('app.min.js'))
        .pipe(
            plumber({
                errorHandler: function (error) {
                    console.log(error.message);
                    this.emit('end');
                }
            })
        )
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(livereload());
});

gulp.task('watch', ['build'], function () {
    livereload.listen();
    gulp.watch('./src/js/*.js', ['build']);
    gulp.watch('./src/tags/*.js', ['build']);
});

gulp.task('default', ['watch']);