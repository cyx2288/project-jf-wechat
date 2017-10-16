/**
 * Created by Qiaodan on 2016/11/3.
 */

//初始页面调用键盘

function showActionSheet() {
    var weuiActionsheet = $('#weui_actionsheet_keyboard');
    weuiActionsheet.addClass('weui_actionsheet_toggle');
        //添加光标
    $("div .jf_num_input_keyboard").addClass("focusing")
}

//关闭键盘
function  hideActionSheet(){

    var weuiActionsheet = $('#weui_actionsheet_keyboard');
    weuiActionsheet.hide(10,function(){

        var _this=$(this);
        _this.removeClass('weui_actionsheet_toggle');
        setTimeout(function(){
            _this.show()
        });
            //移除光标
        $("div .jf_num_input_keyboard").removeClass("focusing")
    });

}

//还款页面初始金额显示
function returnmoney(){

    var currentreturn=parseInt($("#current_returnmoney").find("span").text());

    $(".IOU_moneyreturn_fade").text(currentreturn);
}

//返回上一个页面
function returnpage(){
    window.history.go(-1);
    return false
}


//输入金额判断规则
function MoneyRule(moneyinput,buttonId,InputMinNum,InputMaxNum){//参数一是输入金额的div选择器,参数二是激活按钮的ID选择器，参数三输入最小金额，参数四是最大金额

    var Moneyvalue=$(moneyinput);

    if(parseFloat(Moneyvalue.text()) > parseFloat(InputMinNum) && parseFloat(Moneyvalue.text()) < parseFloat(InputMaxNum)){//按钮激活规则，示例金额大于500小于50000时，激活按钮

        $("div .IOU_finish").addClass("IOU_finish_show").css("margin-top","10px");
        $(buttonId).css({border: "solid 1px #10a6e1",color:"#10a6e1"}).removeAttr("disabled");
        $("div .IOU_interests").css({borderBottom:"solid 1px #ddd",color:"#4a4a4a"}).addClass("IOU_interestshide");
    }
    else{
        $("div .IOU_finish").removeClass("IOU_finish_show").css("margin-top","0");
       $(buttonId).css({border: "solid 1px #DDDDDD",color:"#DDDDDD"}).attr("disabled","true");
        $("div .IOU_interests").css({borderBottom:"none"}).removeClass("IOU_interestshide");
    }

 }


//安卓端物理退格键关闭键盘
function hideKeyBoard(){

    if (browser.os.android || browser.supplier.wechat) {//判断设备

        //window.onhashchange=IouHashChange;

        window.addEventListener('hashchange',IouHashChange,false);

        function IouHashChange(){

            var hashCode = window.location.hash;//获取锚点

            var numId = hashCode.substr(1);//去掉#，获取#后面的数字

            var num=2;//出现键盘的页面

            if(parseInt(numId)!==parseInt(num)){//当锚点发生变化，

                hideActionSheet();//键盘收回

            }

        }

    }
}




