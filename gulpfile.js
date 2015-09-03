var gulp        = require('gulp');

var autoprefix  = require('gulp-autoprefixer');
var changed     = require('gulp-changed');
var clean       = require('del');
var images      = require('gulp-imagemin');
var rename      = require('gulp-rename');
var styles      = require('gulp-sass');
var uglify      = require('gulp-uglify');

gulp.task('clean', function (cb) {  
    clean([
            'build/styles', 
            'build/scripts', 
            'build/images'
    ], cb)
});

// Styles
gulp.task('styles', function () {
    return gulp.src('src/styles/style.scss')
        .pipe(styles({outputStyle: 'compressed'}))
        .pipe(autoprefix('last 2 versions'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/styles'));
});
 
// Scripts
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/js'));
});

// Images
gulp.task('images', function() {
    return gulp.src('src/images/*')
        .pipe(changed('build/images'))
        .pipe(images())
        .pipe(gulp.dest('build/images'));
});

// Default task
gulp.task('default',  ['clean', 'styles', 'scripts', 'images']);

//watch
gulp.task('watch', function () {

    // Watch .html files
    gulp.watch('src/*.html', ['html']);

    // Watch .scss files
    gulp.watch('src/styles/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/scripts/*.js', ['scripts']);

    // Watch image files
    gulp.watch('src/images/*', ['images']);

});

