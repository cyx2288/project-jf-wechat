/**
 * Created by Qiaodan on 2017/8/8.
 */

// 弹出 右上角 导航 插件
//陈羽翔
//

;(function ($) {
    $.fn.jfMainMenuTabAll = function (settings) {
        //默认参数
        var defaultSetting = { //默认数值
            detail: [ //具体数据
                {
                    "name": "首页",
                    "url": "../../main.html",
                    "imgSrc": "../icon/icon_nav_home.png"
                },
            ],
            num: 1,
            //个数,
            top: 55
        };
        /*合并默认参数和用户自定义参数*/
        settings = $.extend(defaultSetting, settings);
        return this.each(function () {

            var i = settings.num; //一共有几个元素

            var de = settings.detail; //具体数据

            var top=settings.top;

            $(this).click(allMainMenuTabAll); //增加点击事件

            function allMainMenuTabAll(event) { //跳出导航的函数

                event.stopPropagation(); //防止事件冒泡

                mainMenuTabAll.run(i,de,top);

            }
        });
    }
})(jQuery);
//右上角导航结束


var mainMenuTabAll={

    run:function (i,de,top) {

        if (!$('#allMainMenuTabWechat').html()) { //如果页面上没有这个弹出元素

            mainMenuTabAll.add(i,top,de);


        } else { //如果元素在页面上，隐藏该元素

            mainMenuTabAll.remove();

        }

    },

    add:function (i,top,de) {

        var divTop = "<div id=\"allMainMenuTabWechat\"style=\"display:block; position:fixed; right:6px ; top:"+top+"px ; z-index:501; padding:3px 8px;\">"; //弹出层出现头文件

        var divBottom = "<div style=\"background:rgba(0,0,0,1); width:100%; height:100%; position:absolute; left:0; top:0 ; z-index:17;  border-radius:4px; opacity:0.8;\"><div style=\"background:rgba(0,0,0,1); width:20%; height:20%; position:absolute; left:75%; top:-5% ; z-index:17;  border-radius:1px; transform:rotate(45deg)\"></div></div></div>"; //弹出层出现尾文件


        var hr = "<hr style=\" z-index:18; position:relative; opacity:0.3; height:0px;border:0px; border-top:1px solid #999; \"/>"; //线


        var div = "";
        for (var ix1 = 0; ix1 < i; ix1++) {
            if (ix1 != 0) {
                div = div + hr;
            } //最后一个元素不加线条

            div = div + "<div style=\"word-break:keep-all;white-space:nowrap; height:25px; color:#fff; font-size:14px; padding:5px 5px; z-index:18; position:relative;\"onclick=\"location='" + de[ix1].url + "'\"><img src=\"" + de[ix1].imgSrc + "\"style=\"height:25px;width:25px;vertical-align:middle; margin-right:8px;\"/>" + de[ix1].name + "</div>"; //叠加元素

        }

        var $div = $(divTop + div + divBottom); //组合

        $('body').append($div); //添加元素

        setTimeout(
            function () {
                $(document).on('click touchmove', clickTabMain); //触发收回

                function clickTabMain(event) { //收回函数
                    if ($('#allMainMenuTabWechat').html()) { //如果页面为空
                        $('#allMainMenuTabWechat').slideUp(200, function () {
                            $(this).remove();
                        });
                        $(document).unbind("click", clickTabMain); //解除绑定
                    }
                }
            }, 100);

    },
    remove:function () {
        $('#allMainMenuTabWechat').slideUp(200, function () {
            $(this).remove()
        });
    }
}