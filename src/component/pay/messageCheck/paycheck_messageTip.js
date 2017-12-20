
//收银台页面短信验证以及侧拉页面JS
//验证码倒计时


//增加active事件
document.addEventListener('touchstart',function(){},false);


    var InterValObj; //timer变量，控制时间
    var count = 60; //间隔函数，1秒执行
    var curCount;//当前剩余秒数

    function sendMessage() {



        curCount = count;

        //设置button效果，开始计
        $("#btnSendCode").attr("disabled", "true");
        $("#btnSendCode").css({'color':'#ababab','border':"solid 1px #ddd"}).val("重新发送" + curCount + "s");
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


//step 选择
$('.zhuangyi_pay_shoppingcart label.weui_cell.weui_check_label.weui_cell_zy').on("click",function(){
    var ClickBoxId='#'+$(this).children("div:last-child").children("input").attr("id");
    $(".aui-radio").prop("checked",false);
    $(ClickBoxId).prop("checked",true);
});

//收银台页面JS结束