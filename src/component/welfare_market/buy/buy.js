/**
 * Created by Qiaodan on 2017/6/22.
 */

/*买入卖出页面加减金额*/
function changeValue(ele) {

    var thisValue=document.getElementsByClassName('inputele')[0].value;

    var thisMaxPrice=document.getElementsByClassName('inputele')[0].getAttribute('max-price');

    if (ele.className.indexOf('reduce') > -1) {

        thisValue=parseFloat(thisValue)-0.001;

        if(thisValue<=0.001){//最小值为0.01

            thisValue=0.001;
        }

        document.getElementsByClassName('add')[0].style.opacity="0.7";

        document.getElementsByClassName('inputele')[0].value= parseFloat(thisValue).toFixed(3);


    }
    else if(ele.className.indexOf('add') > -1){

        thisValue=parseFloat(thisValue)+0.001;

        if(thisValue>=thisMaxPrice){//最大值

            thisValue=thisMaxPrice;

            ele.style.opacity="0.2";

            jfShowTips.toastShow({"text":"最高限价¥"+thisMaxPrice+""})
        }else {
            ele.style.opacity="0.7"
        }

        document.getElementsByClassName('inputele')[0].value=parseFloat(thisValue).toFixed(3);

    }
    else {

        var patern=/[0-9\.]/;

        if(!patern.test(thisValue)){

            jfShowTips.toastShow({"text":"格式错误，请从新输入"})
        }

      if(thisValue>=thisMaxPrice){//最大值为10

            thisValue=thisMaxPrice;

            document.getElementsByClassName('add')[0].style.opacity="0.1";

            document.getElementsByClassName('inputele')[0].value=parseFloat(thisValue).toFixed(3);

        }else {
            document.getElementsByClassName('add')[0].style.opacity="0.7";
        }


        ValiateNextBtn();//判断下一步是否可以点击

    }


}


/*禁止输入小数点*/
function forbidZero(event){

    var evt=event||window.event;

    var thisTargetEle=evt.srcElement||evt.target;

    if(thisTargetEle.getAttribute('data-value')=='.'&&document.getElementById('savekeyNum').getElementsByTagName('span').length>1){//当前点击的是.

        deleteEle()
    }

    //如果当前第一次输入0
     else if(thisTargetEle.getAttribute('data-value')=='0'&&document.getElementById('savekeyNum').innerText=="0"){

         deleteEle()
     }


    function deleteEle(){

        var thisPointEle=document.getElementById('savekeyNum').getElementsByClassName('focusing')[0];

        var thisPreFocusing=document.getElementById('savekeyNum').getElementsByClassName('focusing')[0].previousElementSibling;

        if(thisPointEle.parentNode){

            thisPointEle.parentNode.removeChild(thisPointEle);//删除当前点点元素
        }

        if(thisPreFocusing){//点点元素的上一位元素添加光标

            thisPreFocusing.className='focusing';
        }else {
            document.getElementById('savekeyNum').className="keyNumshow focusing"
        }

    }


    document.getElementById('key_input').value=document.getElementById('savekeyNum').innerText;

    document.getElementById('savekeyNum').setAttribute('data-money',document.getElementById('savekeyNum').innerText)

}

/*获取显示金额总价*/
function getTotalMoney(e){

    forbidZero(e);//禁止输入0

    var totalPriceBox=document.getElementsByClassName('market_total_price')[0];

    var showMoneyBox=document.getElementsByClassName('money_box')[0];//显示金额

    var thisProNum=document.getElementById('key_input').value;//买入额度

    var thisProPrice=document.getElementsByClassName('inputele')[0].value;//买入单价

    var buyPage=document.getElementsByClassName('market_buy_page')[0];//判断是否是买入页面

    var totalPrice;

    if(thisProNum&&thisProPrice){

        totalPrice=parseFloat(thisProNum)*parseFloat(thisProPrice);//总价

        if(!buyPage){
            totalPriceBox.style.height="80px"
        }else {
            totalPriceBox.style.height="45px"
        }



    }else {
        totalPrice=0.00;

        if(!buyPage){
            totalPriceBox.style.height="0"
        }else {
            totalPriceBox.style.height="0"
        }


    }

    totalPrice=totalPrice.toString();

    if(totalPrice.indexOf('.')>-1){//如果存在小数点
        totalPrice=totalPrice.substring(0,totalPrice.indexOf('.')+3);//提取小数点位小数
    }
    showMoneyBox.innerHTML=parseFloat(totalPrice).toFixed(2);//如果只存在以为小数，默认加一位0

}

/*判断下一步按钮*/
function ValiateNextBtn(){
    var thisSaveNum=document.getElementById('key_input');//input元素

    var thischeckBox=document.getElementsByClassName('agreement_check')[0];

    var thisPrice=document.getElementsByClassName('inputele')[0].value;

    var thisNextBtn=document.getElementsByClassName('buy_check_btn')[0];//下一步按钮

    if(!thisSaveNum.value==""&&thischeckBox.checked&&!thisPrice==""){

        thisNextBtn.removeAttribute("disabled")
    }else {

        thisNextBtn.setAttribute("disabled",true)
    }
};



/*加减判断*/
function valiateMoney(){

    var eleAddEvent;

    if(browser.os.iOS){

        eleAddEvent='touchstart';
    }else {
        eleAddEvent='click';
    }


    //金额加减绑定事件
    document.getElementsByClassName('reduce')[0].addEventListener(eleAddEvent,function(){//相减

        changeValue(this);

        getTotalMoney();

    },false);

    document.getElementsByClassName('add')[0].addEventListener(eleAddEvent,function(){//相加

        changeValue(this);

        getTotalMoney();

    },false);



}


/*获取订单数据显示*/
function getOrderData(){

    var thisProNum=document.getElementById('key_input').value;//买入额度

    var thisProPrice=document.getElementsByClassName('inputele')[0].value;//买入单价

    var showMoneyBox=document.getElementsByClassName('money_box')[0].innerHTML;//显示金额(总价)


    document.getElementsByClassName('welfare_num')[0].innerHTML=thisProNum;

    document.getElementsByClassName('buy_price')[0].innerHTML='￥'+thisProPrice;

    document.getElementsByClassName('total_cost')[0].innerHTML='￥'+showMoneyBox

}










