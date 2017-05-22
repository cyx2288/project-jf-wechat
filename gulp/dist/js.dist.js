/**js打包
 * 交付*/

var gulp = require('gulp'),

    uglify=require('gulp-uglify'),

    rename = require("gulp-rename");//重命名


function jsDist() {

    gulp.src(['build/js/*.js'])

        .pipe(uglify())

        .pipe(rename({suffix: '.min'}))

        .pipe(gulp.dest('dist/js'));

    gulp.src(['build/lib/js/*.js'])

        .pipe(gulp.dest('dist/lib/js'));

    gulp.src(['build/json/*']) //该任务针对的文件7

        .pipe(gulp.dest('dist/json'))

}

module.exports = jsDist;
