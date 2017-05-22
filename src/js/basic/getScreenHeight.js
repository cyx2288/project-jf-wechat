
//读取屏幕高度
;(function ($) {
    $.fn.windowHeight = function (settings) {
        //默认参数
        var defaultSetting = { //默认数值
            fixHeight: '238',

        };

        /*合并默认参数和用户自定义参数*/
        settings = $.extend(defaultSetting, settings);
        return this.each(function () {

            var getHeightEle = this;
            var fixHeight = settings.fixHeight;


            function regularHeight() {


                var regularHeight = $(window).height() - fixHeight;


                $(getHeightEle).css('height', regularHeight)


            }


            regularHeight();


        });
    }

})(jQuery);