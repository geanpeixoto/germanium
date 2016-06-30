var gulp = require('gulp');
var superview = require('gulp-superviewsjs');

gulp.task('compile:superview', () => {
    gulp.src('example/**/*.template.html')
        .pipe(superview({
            mode: 'cjs'
        }))
        .pipe(gulp.dest('dist'))
});
