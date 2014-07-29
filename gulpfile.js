var gulp = require('gulp'),
    config = require('./config'),
    server = require('./app'),
    refresh = require('gulp-livereload'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    size = require('gulp-size'),
    autoprefixer = require('gulp-autoprefixer'),
    streamqueue = require('streamqueue'),
    lrserver = require('tiny-lr')(),
    livereloadport = config.livereloadport,
    serverport = config.serverport;

// server.use(refresh({
//     port: livereloadport
// }));

server.use(refresh({
    port: livereloadport
}), function() {

    // TypeError: Router.use() requires callback function but got a [object Object]

});

gulp.task('clean', function() {
    console.log('clean finished');
});

gulp.task('default', ['clean'], function() {
    gulp.start('watch');
});

gulp.task('serve', [
    'styles',
    'scripts'
], function() {
    lrserver.listen(livereloadport);
    console.log('serve finished');

});

gulp.task('watch', ['serve'], function() {
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
        // .pipe(size({
        //     showFiles: true
        // }))
        // .pipe(autoprefixer(
        //     'last 2 version',
        //     'safari 5',
        //     'ie 8',
        //     'ie 9',
        //     'opera 12.1',
        //     'ios 6',
        //     'android 4'
        // ))
        .pipe(gulp.dest(config.paths.app.css));
        // .pipe(size({
        //     showFiles: true
        // }))
        // .pipe(refresh(lrserver));
});

gulp.task('scripts', function() {

    // gulp.src(config.paths.lib.js)
    //     .pipe(changed(config.dest))
    //     .pipe(concat('libs.js'))
    //     .pipe(cond(live, size({
    //         showFiles: true
    //     })))
    //     .pipe(gulp.dest(config.paths.app.js))
    //     .pipe(refresh(lrserver));

    // gulp.src(config.paths.app.js)
    //     .pipe(changed(config.paths.lib.js))
    //     .pipe(gulp.dest(config.dest))
    //     .pipe(refresh(lrserver));
    console.log('scripts finished');


});