/**
 * Created by Qiaodan on 2017/5/19.
 */


var gulp = require('gulp'),

    ejs = require('gulp-ejs'),//ejs模板

    cheerio = require('gulp-cheerio'),//批量更换html中的引用

    connect = require('gulp-connect'),//服务器

    rename = require("gulp-rename");//重命名

var bom = require('gulp-bom');//解决UTF-8文件是采用无BOM

function devEjs(){
    gulp.src('src/view/*/**.{ejs,html}')

        .pipe(ejs())

    //增加媒体查询，通用样式文件
        .pipe(cheerio(function ($) {

            var addHtml = "\n<meta charset='UTF-8'>\n";

            addHtml += "<meta name='viewport' content='width=device-width,initial-scale=1,user-scalable=0,minimum-scale=1, maximum-scale=1'>\n";

            addHtml += "<meta name='apple-mobile-web-app-capable' content='yes' />\n";

            addHtml += "<meta name='apple-mobile-web-app-status-bar-style' content='black' />\n";

            addHtml += "<meta name='format-detection' content='telephone=no, email=no' />\n";

           // addHtml += "<link rel='stylesheet'  href='../../lib/css/swiper_3.3.1.min.css'/>\n<link rel='stylesheet'  href='../../lib/css/weui.min.css'/>\n";//最基础样式文件

            addHtml += "<link rel='stylesheet'  href='../../css/jf_basic.css'/>\n";


            $('head').prepend(addHtml);



        }))

    //顺序增加脚本文件
    .pipe(cheerio(function($){
        var addJsMain = '\n<script src="../../lib/js/jquery-3.0.0.min.js"></script>\n<script src="../../lib/js/fastclick.js"></script>\n<script src="../../js/jf_basic.js"></script>\n';//主要的脚本文件

        var addJsHtml="";//保存用的业务脚本

        var addJsRun="<script>\n";//运行的脚本

        var addJsHtmlHead="<script src='";

        var addJSHtmlBottom = "'></script>\n";

        $('script').each(function(index,ele){

            if($(this).attr('src')){

                addJsHtml+=addJsHtmlHead+$(this).attr('src')+addJSHtmlBottom;

            }else {
                addJsRun += $(this).html() + '\n';
            }

        })

        addJsRun += "\n</script>\n";

        $('script').remove();

        $('body').append(addJsMain);

        $('body').append(addJsHtml);

        $('body').append(addJsRun);

    }))

        .pipe(rename({
            extname:".html"
        }))
        .pipe(gulp.dest('build/html'))//输出到bulid文件夹

         .pipe(bom())//不乱码




        .pipe(connect.reload())



    //首页导入
    gulp.src('src/*.html')
        .pipe(gulp.dest('build'))

        .pipe(connect.reload())

}

module.exports=devEjs;
