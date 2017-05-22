/**
 * Created by Qiaodan on 2017/5/19.
 */
/**脚本合并
 * 开发*/

var gulp = require('gulp'),

    concatDir = require('gulp-concat-dir'),//按文件夹合并

    connect = require('gulp-connect'),//服务器

    concat = require("gulp-concat"),//文件合并

    rename = require("gulp-rename");//重命名

function devJs(){

    //主要依赖模块
    gulp.src(['src/js/basic/*.js','src/js/require/*.js','src/component/basic/*.js'])//按照顺序添加

        .pipe(concat('jf_basic.js'))//合并

        .pipe(gulp.dest('build/js'))//在bulid/js下生成文件

        .pipe(connect.reload());


    //单独业务模块
    gulp.src(['src/component/**/*.js','!src/component/basic/*.js'])//排除主要依赖模块的js

        .pipe(concatDir({ext: '.js'}))//根据文件夹合并

        .pipe(rename({prefix: "jf_"}))//统一加前缀

        .pipe(gulp.dest('build/js'))

         .pipe(connect.reload());


    gulp.src(['src/lib/js/*.js']) //最基本的脚本文件

        .pipe(gulp.dest('build/lib/js'))

        .pipe(connect.reload());


    gulp.src(['src/json/*']) //该任务针对的文件7

        .pipe(gulp.dest('build/json'))

        .pipe(connect.reload());

}


module.exports = devJs;