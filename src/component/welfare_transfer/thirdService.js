/**
 * Created by Qiaodan on 2017/6/9.
 */

//-------------第三方服务页面整合js
//谯丹 2017.1.4


var jfThirdService = {

//用于手机话费充值，流量充值页面判断电话号码以及提示信息，


//电话号码输入以及充值选型按钮是否可以点击判断

    phoneNumberValiate:function(obj,textobj,Buttonobj,righttext,wrongtext){//参数一是input的ID选择器，参数二是出现文本的class选择器，参数三是按钮选择器，参数四是输入号码正确时，提示的号码类型，参数五是输入号码错误的报错信息

        var phonetest= /^1[3|4|5|7|8][0-9]{9}$/; //验证规则

        var phoneNum=$(obj).val();

        var textshow=$(textobj);

        var buttonshow=$(Buttonobj);


        if (phonetest.test(phoneNum)){//当前输入号码满足正则表达式的要求

            textshow.text(righttext).css('color','darkgray');

            buttonshow.removeAttr('disabled')

        }
        else if(phoneNum.length==11)  //当前输入的号码以及达到11位
        {
            textshow.text(wrongtext).css('color','red');

            buttonshow.attr('disabled','true');
        }else {

            textshow.text('');

            buttonshow.attr('disabled','true')

        }

    },



//失焦事件判断电话号码提示信息

    blurValiateNumber:function(obj,textobj,Buttonobj,wrongtextone,wrongtexttwo){//参数一是input的ID选择器，参数二是出现文本的class选择器，参数三是按钮选择器，参数四是输入号码错误的报错信息，参数五是没有输入号码时的提示信息，


        var phonetest= /^1[3|4|5|7|8][0-9]{9}$/; //验证规则

        var textshow=$(textobj);

        var buttonshow=$(Buttonobj);

        if(!phonetest.test($(obj).val())){//当处于失焦状态时，如果不能满足正则表达式要求，报错

            textshow.text(wrongtextone).css('color','red');

            buttonshow.attr('disabled','true');

        }

        if($(obj).val().length=="0"){//当处于失焦状态时，如果且没有输入任何元素，提示请输入

            textshow.text(wrongtexttwo).css('color','red');
        }


    },

//关闭按钮删除号码事件
    deletePhoneNumber:function(thisEle,Buttonobj){//参数一为元素该本身，参数二是选择项

        var buttonshow=$(Buttonobj);

        setTimeout(function(){
            $(thisEle).siblings('input').val('');//清空里面的数值,同时处于焦点状态

        },0.1);

        $(thisEle).siblings('input').focus();

        $(thisEle).parent('.phonenumber').next('.phonenumber_type').text('');//同时清空提示信息

        buttonshow.attr('disabled','true');//按钮不可以点击
    },


//如果页面有两个输入框号码需要判断

    twoNumberValiate:function (objone,objtwo,Buttonobj){//参数一是第一个输入框的选择器，参数二是第二个输入框的选择器，参数三是按钮选择器

        var phonetest= /^1[3|4|5|7|8][0-9]{9}$/; //验证规则

        var phoneNumone=$(objone).val();

        var phoneNumtwo=$(objtwo).val();

        var buttonshow=$(Buttonobj);

        if(phonetest.test(phoneNumone)&&phoneNumtwo.length==19){//只有两者同时满足条件，按钮才可以点击

            buttonshow.removeAttr('disabled');
        }else {
            buttonshow.attr('disabled','true');
        }

    },


    //-------------------手机话费充值，流量充值js结束

    //中石化卡号判断
//周文斌 2017.1.4

//中石化卡号输入以及充值选型按钮是否可以点击判断

    sinopecValiate:function(obj,textobj,Buttonobj){//参数一是input的ID选择器，参数二是出现文本的class选择器，参数三是按钮选择器

        var phoneNum=$(obj).val();

        var textshow=$(textobj);

        var buttonshow=$(Buttonobj);

        if(phoneNum.length==19){  //当前输入的号码以及达到19位

            textshow.text('');

            var phonetest= /^1[3|4|5|7|8][0-9]{9}$/; //验证规则

            if(phonetest.test($('#telenumber').val())){

                buttonshow.removeAttr('disabled');
            }
            else {
                buttonshow.attr('disabled','true')
            }

        }
        else if(phoneNum.length>0)  //当前输入的号位数大于0
        {
            textshow.text('');

            buttonshow.attr('disabled','true');
        }
        else {

            textshow.text('').css('color','red');

            buttonshow.attr('disabled','true')

        }


    },

    //失焦事件判断中石化卡号提示信息
    blursinopecNumber:function(obj,textobj,Buttonobj,text1,text2){//参数一是input的ID选择器，参数二是出现文本的class选择器，参数三是按钮选择器，参数四是没有输入值的报错信息，参数五是账号错误时的报错信息

        var textshow=$(textobj);

        var buttonshow=$(Buttonobj);


        if($(obj).val().length=="0"){//当处于失焦状态时，如果且没有输入任何元素，提示请输入

            textshow.text(text1).css('color','red');
        }

        if($(obj).val().length>0 && $(obj).val().length<19){//当处于失焦状态时，如果且没有输入任何元素，提示有误

            textshow.text(text2).css('color','red');

            if($('#telenumber').val().length==11){

                buttonshow.attr('disabled','true');

            }

        }
    },


    //中石化页面，初始调用判断
    firstSinopec:function(){

        var phonetest= /^1[3|4|5|7|8][0-9]{9}$/; //验证规则

        if($('#SINOPECnumber').val().length==19 && phonetest.test($('#telenumber').val())){//页面加载完成，判断当前输入值，以及按钮是否可以点击

            $('button.price_piece').removeAttr('disabled')
        }else {
            $('button.price_piece').attr('disabled','ture')
        }

    },


    //支付宝以及福利转账页面判断
    //谯丹 2017.1.4

    zfbValiate:function(){//当3个输入框同时满足都有值，按钮可以点击

        var name=$('#name_input').val().length;//input取出长度

        var account=$('#account_input').val().length;

        var money=$('#money_amount').text();//金额输入框


        if(name>0 && account>0){//先判断2个，然后在2个的基础上在判断1个

            if(money==""){

                $('#zfb_close').attr('disabled','true').removeClass('btn_blue').addClass('btn_dark');
            }else {
                $('#zfb_close').removeAttr('disabled').removeClass('btn_dark').addClass('btn_blue');
            }

        }else {

            $('#zfb_close').attr('disabled','true').removeClass('btn_blur').addClass('btn_dark');

        }
    },


    //失焦事件判断
    blurZfbValiate:function(obj,textobj,wrongtext){////参数一是输入框的ID选择器，参数二是报错的元素的class选择器,参数三十报错信息

        var accountNum=$(obj).val();

        var textshow=$(textobj);

        if($(obj).val().length==0){

            textshow.text(wrongtext).css({"color":"red"});
        }else
        {
            textshow.text('')
        }
    },



//大众点评输入金额大小判断

    MoneyRule:function(moneyinput,buttonId){//参数一是输入金额的div选择器

        var Moneyvalue=$(moneyinput);

        if(Moneyvalue.text()==""){//判断是否空值

            $("#nextbutton").addClass("color_disabled").removeClass("color_blue").attr('disabled',"disabled");
        }
        else{

            $("#nextbutton").addClass("color_blue").removeClass("color_disabled").removeAttr('disabled');
        }
    },

//点评页面弹出框方法
    fdialogClose:function(){

        $('#detailed_popup').hide(100, function () {

            $('#detailed_popup .dialog_contain').removeClass('show');//点击关闭模态框

        });//点击关闭按钮 模态框消失

        $('#more_info_close').unbind('click', dialogClose)//点击关闭之后解绑事件


    },


    /*上拉框出现方法*/

    DragDownShow:function(mainobj,shadowobj,hideobj,distance,topDistance){//参数一是下拉框的主体元素选择器，参数二是下拉框的阴影元素选择器，参数三是关闭下拉框的元素的选择器，参数四是距离上部距离，参数五是上部隐藏距离

        var $main=$(mainobj);//主体

        var $drag=$(shadowobj);//阴影

        var $hide=$(hideobj);//隐藏按钮

        var $distance=distance;//距离上部距离

        var $topDistance=topDistance; //上部隐藏距离

        if ($main.css('display') == 'none') { //如果为隐藏，下拉框收起中

            $main.css({ //到达平滑过渡开始位置
                'transform': 'translate3d(0,' + $topDistance + ',0)',
                ' -webkit-transform':'translate3d(0,' + $topDistance + ',0)'
            });

            $('html,body').addClass('ovfHiden'); //页面禁止滚动

            $drag.show(10, function () {
                $(this).css('opacity', '.6'); //透明渐变效果
            });

            $main.show(10, function () {
                $(this).css({
                    'transform':'translate3d(0,' + $distance + ',0)',
                    ' -webkit-transform':'translate3d(0,' + $distance + ',0)'
                }); //到指定展现位置
            })
        }

        $drag.click(frameDragDownHide); //点击阴影隐藏
        $hide.click(frameDragDownHide);  //其他关闭那妞隐藏

        function frameDragDownHide() {
            if ($main.css('display') != 'none') { //如果不隐藏，下拉框在显示中

                $main.css({
                    'transform':'translate3d(0,' + $topDistance + ',0)',
                    ' -webkit-transform':'translate3d(0,' + $topDistance + ',0)'

                }); //收起到指定位置
                $drag.css('opacity', '0').on('webkitTransitionEnd', opacityChange).on('transitionend', opacityChange); //阴影透明度变化之后再发生效果

                $('html,body').removeClass('ovfHiden'); //页面可以滚动

            }

            function opacityChange() {

                $drag.hide().unbind('webkitTransitionEnd', opacityChange).unbind('transitionend', opacityChange); //取消平滑过渡后的绑定事件

            } //事件解绑


            $main.on('webkitTransitionEnd', listChange).on('transitionend', listChange); //主体的过渡事件

            function listChange() {
                $main.hide(10, function () { //取消绑定事件，回到起始0位置
                    $main.css({
                        'transform':'translate3d(0,' + 0 + ',0)',
                        ' -webkit-transform':'translate3d(0,' + 0 + ',0)'
                    }).unbind("webkitTransitionEnd", listChange).unbind("transitionend", listChange);
                });


                $drag.unbind("click", frameDragDownHide);
                $hide.unbind("click", frameDragDownHide);

            } //事件解绑

        }
    }


}


//第三方服务页面js结束