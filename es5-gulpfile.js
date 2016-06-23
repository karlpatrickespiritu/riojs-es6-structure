var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var livereload  = require('gulp-livereload');
var riotify  = require('riotify');
var plumber = require('gulp-plumber');


gulp.task('build', function () {
    // app.js is your main JS file with all your module inclusions
    return browserify({entries: './src/js/app.js', debug: true})
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
});

gulp.task('default', ['watch']);