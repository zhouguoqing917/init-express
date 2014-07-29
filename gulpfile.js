var gulp = require('gulp'),
    livereloadport = 35729,
    refresh = require('gulp-livereload'),
    app = require('./app');

app.use(refresh({
    port: livereloadport
}));

gulp.task('default', function() {
    console.log(app);
});