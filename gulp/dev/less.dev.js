/**
 * Created by Qiaodan on 2017/5/19.
 */
/**样式翻译合并
 * 开发*/

var gulp = require('gulp'),

    less = require('gulp-less'),//less解码

    autoprefixer = require('gulp-autoprefixer'),//css兼容性

    concatDir = require('gulp-concat-dir'),//按文件夹合并

    concat = require("gulp-concat"),//文件合并

    connect = require('gulp-connect'),//服务器

    rename = require("gulp-rename");//重命名

function devLess(){
    gulp.src(['src/component/**/*.less'])

        .pipe(less())//编译less文件

        .pipe(autoprefixer({

            browsers: ['Android >= 4.0', 'IOS >=7'],//兼容设备

            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true

        }))

        .pipe(concatDir({ext: '.css'}))//根据文件夹合并

        .pipe(rename({prefix: "jf_"}))//统一加前缀

        .pipe(gulp.dest('build/css')) //将会在build/css下生成相应的.css

        .pipe(connect.reload());

    gulp.src(['src/lib/css/*.css'])//针对最基本的css，例如weui.css

        .pipe(gulp.dest('build/lib/css'))

        .pipe(connect.reload());

}


module.exports = devLess;