/**
 * Created by Qiaodan on 2017/6/12.
 */

//嘉福微信端登陆页输入控件判断

var jfWechatLogin= {


//获得焦点判断,移除报错信息;
    inputOnFocus: function (thisInputEle) {//参数一是点击的input元素

        $(thisInputEle).nextAll('.login_wronginfo').removeClass('login_wronginfo_show');//报错信息情况
    },


//失焦判断里面有没有value，判断图标颜色
    inputChange: function (changInput) {//参数一是被点击的input的当前class选择器

        var thisEleInput = $(changInput);

        if (thisEleInput.val() == "") {

            thisEleInput.next('img').removeClass('blue');

            thisEleInput.nextAll('.valiate_code').removeClass('valiate_code_show');//针对验证码输入框
        }
        else {
            thisEleInput.next('img').addClass('blue');

            thisEleInput.nextAll('.valiate_code').addClass('valiate_code_show');//针对验证码输入框

        }
    },

    //点击提交按钮，出现报错信息

    wrongTextShow: function (changInput, wrongtext) {//参数一是被点击的input的当前class选择器,参数二报错信息的具体内容

        var thisEleInput = $(changInput);

        if (thisEleInput.val() == "") {

            thisEleInput.nextAll('.login_wronginfo').addClass('login_wronginfo_show').text(wrongtext)
        }

    },

}