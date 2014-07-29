var gulp = require('gulp'),
    config = require('./config'),
    server = require('./app'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    streamqueue = require('streamqueue');

gulp.task('clean', function() {
    console.log('clean finished');
});

gulp.task('default', ['clean'], function() {
    gulp.start('watch');
});

gulp.task('build', [
    'styles',
    'scripts'
]);

gulp.task('watch', ['build'], function() {
    gulp.watch(config.paths.app.scss + '/*', ['styles']);
    gulp.watch(config.paths.app.js + '/*.js', ['scripts', 'lint']);
    // gulp.watch('./views/**/*.jade', ['inject']);
});

gulp.task('styles', function() {

    return streamqueue({
            objectMode: true
        },
        gulp.src(config.paths.lib.css),
        gulp.src(config.paths.app.scss + '/*.scss')
        .pipe(sass({
            includePaths: ['./public/scss']
        }))
    )
        .pipe(concat('style.css'))
        .pipe(gulp.dest(config.paths.app.css));

});

gulp.task('scripts', function() {
    console.log('scripts finished');


});