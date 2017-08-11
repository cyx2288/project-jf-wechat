/**
 * Created by Qiaodan on 2017/8/8.
 */
//平行滑动位置 插件
;(function ($) {
    $.fn.moveBoxHorizontal = function (settings) {
        //默认参数
        var defaultSetting = { //默认数值
            changeEle: '.financial_management_current .financial_box',      //需要水平移动的模块
            changeColor: 'option_seleted'                 //切换className
        };

        /*合并默认参数和用户自定义参数*/
        settings = $.extend(defaultSetting, settings);
        return this.each(function () {


            var changeEle = settings.changeEle;    //需要水平移动的模块
            var seletedColor = settings.changeColor;   //切换className

            $(this).on('click', financial_change);      //绑定点击事件


            function financial_change() {


                var windowWidth = $(window).width();          //屏幕的宽度
                var dataNum = $(this).attr('data-num');             //取'data-num'的值
                var distanceSize = windowWidth * dataNum;

                $(this).addClass(seletedColor).siblings().removeClass(seletedColor);
                //点击变色                          //出去这个其他都不变色


                $(changeEle).css({
                    'transform': 'translate3d(-' + distanceSize + 'px,0,0)',//移动屏幕宽度位置
                    '-webkit-transform': 'translate3d(-' + distanceSize + 'px,0,0)',
                    'transition': 'transform 0.2s',
                    '-webkit-transition':'transform 0.2s',

                })


            }


        });
    }

})(jQuery);