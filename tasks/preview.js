var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('preview', () => {
    connect.server({
        port: 8000,
        root: './'
    });
});
