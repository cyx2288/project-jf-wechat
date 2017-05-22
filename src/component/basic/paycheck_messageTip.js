
//收银台页面短信验证以及侧拉页面JS
//验证码倒计时

void function(){

    var InterValObj; //timer变量，控制时间
    var count = 60; //间隔函数，1秒执行
    var curCount;//当前剩余秒数

    function sendMessage() {



        curCount = count;

        //设置button效果，开始计
        $("#btnSendCode").attr("disabled", "true");
        $("#btnSendCode").css('color','#ababab').val("重新发送" + curCount + "s");
        InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
    };
//timer处理函数
    function SetRemainTime() {
        if (curCount == 0) {
            window.clearInterval(InterValObj);//停止计时器
            $("#btnSendCode").removeAttr("disabled");//启用按钮
            $("#btnSendCode").css('color','#10A6E2').val("获取验证码");//结束后重心获取验证码
        }
        else {
            curCount--;
            $("#btnSendCode").val("重新发送" + curCount + "s");
        }
    }


    sendMessage();
    $('#btnSendCode').on('click',sendMessage)


    function x1(i){

        $('.input_0926').attr('maxlength',i);//取到input组件输入最长字符

        $('.input_0926').on('keyup',function(){
            var numLength=$('.input_0926').val().length;//读取数字长度
            if(numLength==i){//如果i等于最长字数，激活确认支付
                $('.zhuangyi_pay_shoppingcart .weui_btn').removeClass('btn_gray_0926').addClass('btn_blue_0718');
            }
            else{//如果没有到则按钮变灰色

                $('.zhuangyi_pay_shoppingcart .weui_btn').removeClass('btn_blue_0718').addClass('btn_gray_0926');
            }
        });


    }


    //输入六位验证码激活确认支付按钮

    x1(6);//可修改maxlength数值

}();

(function ($) {
    $.fn.jfFrameFly = function (settings) {
        //默认参数
        var defaultSetting = { //默认数值
            topDistance: 0,
            //距离上部距离
            hideButton: '',
            //可以收回的按钮  参数为选择器
            flyStyle: 'right',
            //飞入方式   参数：top bottom left right
            timeDelay: '300',

            //飞入延迟时间
            isStopTouch: true,

            isHorizonNo: false,

            isFlyIn: false
            //飞入时是不是有平滑过渡（没有飞出）
        };
        /*合并默认参数和用户自定义参数*/

        settings = $.extend(defaultSetting, settings);

        return this.each(function () {


            var $thisFly = $(this);      //弹出元素
            var thisTopDistance = 0;   //上方距离

            var $thisHideButton = $(settings.hideButton);     //收起元素
            var flyStyle = settings.flyStyle;          //哪边进入

            var timeDelay = settings.timeDelay;//平滑过渡速度

            var isFlyIn = settings.isFlyIn;   //是否飞入时平滑过渡

            var isStopTouch = settings.isStopTouch;
            var isHorizonNo = settings.isHorizonNo;


            var xDistance = 0;       //x轴距离
            var yDistance = 0;       //y轴距离
            var thisWidth = $(window).width();      //预设元素宽度
            var thisHeight = $(window).height() - thisTopDistance;  //预设元素高度


            var xDistanceFlyIn = 0;            //预设飞入x距离
            var yDistanceFlyIn = 0;            //预设飞入y距离


            if (flyStyle == 'right') {      //右边划入
                xDistance = thisWidth;
                yDistance = 0;
            }
            else if (flyStyle == 'left') { //左边划入
                xDistance = 0 - thisWidth;
                yDistance = 0;
            }
            else if (flyStyle == 'top') { //上边划入
                xDistance = 0;
                yDistance = 0 - thisHeight;
            }
            else if (flyStyle == 'bottom') {  //下边划入
                xDistance = 0;
                yDistance = thisHeight;
            }


            if (!isFlyIn) {     //如果飞入不需要
                xDistanceFlyIn = 0;
                yDistanceFlyIn = 0;
            }
            else                  //如果需要
            {
                xDistanceFlyIn = xDistance;
                yDistanceFlyIn = yDistance;

            }

            mainFrameShow();                            //使用方法

            function mainFrameShow() {                  //出现方法
                $thisFly.unbind("transitionend")         //对平滑过渡预设
                    .unbind("webkitTransitionEnd")
                    .css({                           //对划入模块预设
                        'display': 'block',
                        'position': 'absolute',
                        'top': thisTopDistance,
                        'width': thisWidth,
                        'height': thisHeight,
                        'transition': timeDelay + 'ms transform',
                        '-webkit-transition': timeDelay + 'ms transform',

                        'transform': 'translate3d(' + xDistanceFlyIn + 'px,' + yDistanceFlyIn + 'px,0px)',

                        '-webkit-transform': 'translate3d(' + xDistanceFlyIn + 'px,' + yDistanceFlyIn + 'px,0px)'
                    });

                if (isStopTouch) {
                    $(window).bind('touchmove', windowBanEvent.Canceling);//绑定禁止事件
                }
                setTimeout(showFly, 0);             //延迟 平滑过渡
                function showFly() {
                    $thisFly.css({
                        'transform':'translate3d(' + 0 + 'px,' + 0 + 'px,0px)',//飞入位置 设定

                        '-webkit-transform':'translate3d(' + 0 + 'px,' + 0 + 'px,0px)'

                    });

                    if (isHorizonNo) {
                        $('html', 'body').addClass('ovfHiden_x');
                    }

                    $thisHideButton.one('click', function () {        //增加一次点击事件监听
                        if (isStopTouch) {
                            $(window).unbind('touchmove', windowBanEvent.Canceling);//绑定禁止事件
                        }
                        $thisFly.css({
                                'transform': 'translate3d(' + xDistance + 'px,' + yDistance + 'px,0px)', //划出
                                '-webkit-transform':'translate3d(' + xDistance + 'px,' + yDistance + 'px,0px)'

                            })
                            .on("transitionend", hidethis)
                            .on("webkitTransitionEnd", hidethis);       //平滑过渡后隐藏元素

                        function hidethis() {
                            var thisStyle = this.style;                 //更改style值

                            if (isHorizonNo) {
                                $('html', 'body').removeClass('ovfHiden_x');
                            }

                            $(this).unbind("transitionend", hidethis)
                                .unbind("webkitTransitionEnd", hidethis);          //取消过度后的监听
                            thisStyle.position = '';
                            thisStyle.display = '';
                            thisStyle.top = '';
                            thisStyle.width = '';
                            thisStyle.transition = '';
                            thisStyle.webkitTransition = '';
                            thisStyle.height = '';
                            thisStyle.transform = '';   //删除style属性
                            thisStyle.webkitTransform = '';
                        }


                    })

                }


            }


        });
    }
})(jQuery);
//滑入模块结束

//收银台页面JS结束