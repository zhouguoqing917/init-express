var gulp = require('gulp'),
    config = require('./config'),
    server = require('./app'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    streamqueue = require('streamqueue'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload');

server.set('env', 'development');
console.log(server.get('env'));

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
    gulp.watch(config.paths.app.js + '/*.js', ['scripts']);
    gulp
        .src([
            config.paths.app.css + '/**.*',
            config.paths.app.js + '/**/*',
            config.paths.app.views + '/**/*.jade'
        ])
        .pipe(watch())
        .pipe(livereload());
});

gulp.task('styles', function() {

    return streamqueue({
            objectMode: true
        },
        gulp.src(config.paths.lib.css),
        gulp.src(config.paths.app.scss + '/*.scss')
        .pipe(sass({
            includePaths: ['./' + config.paths.app.scss]
        }))
    )
        .pipe(concat('style.css'))
        .pipe(autoprefixer(
            'last 2 version',
            'safari 5',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
        ))
        .pipe(gulp.dest(config.paths.app.css));

});

gulp.task('scripts', function() {
    gulp.src(config.paths.lib.js)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(config.paths.app.js));

    gulp.src(config.paths.app.js)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.paths.app.js));

});

gulp.task('lint', function() {
    gulp.src(config.paths.app.js + '/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish));
});