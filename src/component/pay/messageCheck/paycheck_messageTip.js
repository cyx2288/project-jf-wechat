
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

        var thisMessageBtn= document.getElementById('btnSendCode');

        //thisMessageBtn.setAttribute('disabled','disabled');
        thisMessageBtn.disabled=true;

        thisMessageBtn.style.color='#ababab';

        thisMessageBtn.style.border='solid 1px #ddd';

        thisMessageBtn.innerHTML='重新发送'+curCount+'s';

        InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
    };
//timer处理函数
    function SetRemainTime() {

        var thisMessageBtn= document.getElementById('btnSendCode');

        if (curCount == 0) {
            window.clearInterval(InterValObj);//停止计时器

            //thisMessageBtn.setAttribute('disabled',false);
            thisMessageBtn.disabled=false;

            thisMessageBtn.style.color='#10A6E2';

            thisMessageBtn.innerHTML="获取验证码";

        }
        else {
            curCount--;

            thisMessageBtn.innerHTML='重新发送'+curCount+'s';


        }
    }

document.getElementById('btnSendCode').addEventListener('click',function () {

    sendMessage();

},false);


    function maxlengthFn(i) {

        var thisInputEle = document.getElementsByClassName('input_0926')[0]

        thisInputEle.setAttribute('maxlength', i);

        thisInputEle.addEventListener('keyup', function () {

            var numLength = thisInputEle.value.length;

            console.log(numLength)

            if (numLength == i) {

               // document.getElementsByClassName('weui_btn')[0].className = document.getElementsByClassName('weui_btn')[0].className.replace('btn_gray_0926', '');

                document.getElementsByClassName('weui_btn')[0].className = 'weui_btn btn_blue_0718';

            } else {

               // document.getElementsByClassName('weui_btn')[0].className = document.getElementsByClassName('weui_btn')[0].className.replace('btn_blue_0718', '');

                document.getElementsByClassName('weui_btn')[0].className = 'weui_btn btn_gray_0926'
            }


        }, false)

    }

    //输入六位验证码激活确认支付按钮

        maxlengthFn(6);//可修改maxlength数值


var allPayCheck=document.getElementsByClassName('weui_cells_checkbox')[0].getElementsByClassName('weui_check_label');

for(var i=0;i<allPayCheck.length;i++){

    allPayCheck[i].addEventListener('click',function (e) {


        var allInputEle=document.getElementsByClassName('aui-radio');

        for(var i=0;i<allInputEle.length;i++){

            allInputEle[i].checked=false
        }


        this.getElementsByTagName('input')[0].checked=true;



    },false)
}





//收银台页面JS结束