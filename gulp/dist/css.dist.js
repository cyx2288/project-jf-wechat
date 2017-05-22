/**css打包
 * 交付*/

var gulp = require('gulp'),

    clean=require('gulp-clean-css'),

    minifyCss = require("gulp-minify-css"),//css文件压缩

    concat = require("gulp-concat"),//文件合并

    rename = require("gulp-rename");//重命名



function cssDist() {

    gulp.src(['build/css/*.css'])

        //.pipe(concat('component.css'))

        .pipe(clean())

        .pipe(minifyCss())//压缩css

        .pipe(rename({suffix: '.min'}))

        .pipe(gulp.dest('dist/css'));

    gulp.src(['build/lib/css/*.css'])

        .pipe(clean())

        .pipe(gulp.dest('dist/lib/css'));

}

module.exports = cssDist;
