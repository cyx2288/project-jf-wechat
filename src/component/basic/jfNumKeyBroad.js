/**
 * Created by Qiaodan on 2017/6/9.
 */



;(function ($) {
    $.fn.jfNumKeybroad = function (settings) {
        //默认参数
        var defaultSetting = { //默认数值

            hideButton: '#hide',
            //关闭按钮
            maxNum: 14,
            //最大输入位数
            fn: 0//

        };
        /*合并默认参数和用户自定义参数*/

        settings = $.extend(defaultSetting, settings);

        return this.each(function () {


            var thisInputKey = $('.jf_num_input_keyboard');//输入的目标元素

            var inputMaxNum = parseInt(settings.maxNum);//输入的最大位数

            var showButton = $(this);//让他出现的元素

            var hideButton = $(settings.hideButton);//让他隐藏的元素

            showButton.on('click', showActionSheet); //可展开的按钮

            hideButton.on('click', hideActionSheet);//可收起的按钮

            $('#actionsheet_cancel,#actionsheet_check').on('click', hideActionSheet);//可收起的按钮

            var weuiActionSheet = $('#weui_actionsheet_keyboard');//键盘

            $('#weui_actionsheet_keyboard .weui_grids_kj .weui_grid').on('touchstart', keybroadInputFun);//输入按钮

            $('#actionsheet_delete').on('touchstart', keybroadInputDeleteFun);//删除按钮

            function showActionSheet() {//弹出数字输入框
                weuiActionSheet.addClass('weui_actionsheet_toggle');
                thisInputKey.addClass('focusing')
            }

            function hideActionSheet() {//收回数字输入框
                weuiActionSheet.removeClass('weui_actionsheet_toggle');
                thisInputKey.removeClass('focusing')
            }

            function keybroadInputFun() {     //增加数字时间

                if (thisInputKey.html().length < inputMaxNum) {   //限制位数
                    //------------------------------------------------------------------------------------------------------------输入规则：输入小数点的时候，1、不能出现两个点，2、第一次输入不能出现点
                    if ($(this).attr('data-value') == '.') {
                        if (!thisInputKey.html()) { //首次输入不能是小数点
                        }
                        else if (thisInputKey.html().indexOf(".") != -1) {//只允许出现一个小数点
                        }
                        else {
                            thisInputKey.html(thisInputKey.html() + ".");    //加入该小数点
                        }
                    }

                    else// 输入小数点
                    {
                        var x1_point = thisInputKey.html().indexOf(".");   //小数点位置
                        var x1_html = thisInputKey.html().length;     //字符串长度
                        //--------------------------------------------------------------------------------------------------------输入规则：小数点后最多输入两位
                        if (x1_html - x1_point <= 2 || x1_point == -1) {
                            //----------------------------------------------------------------------------------------------------输入规则：如果输入时第一位为0，默认覆盖该值，小数点不可覆盖
                            if (thisInputKey.html() == '0') {
                                thisInputKey.html('')
                            }
                            thisInputKey.html(thisInputKey.html() + $(this).attr('data-value'));//正常输入
                        }
                    }
                }
                ;
                if (settings.fn) {

                    settings.fn();//执行动态脚本

                }

            }

            function keybroadInputDeleteFun() {  //删除事件
                var s = thisInputKey.html();
                s = s.substring(0, s.length - 1);//删除最后一位
                thisInputKey.html(s);

                if (settings.fn) {

                    settings.fn();//执行动态脚本

                }
            };


        });


    }
})(jQuery);
//键盘模块结束