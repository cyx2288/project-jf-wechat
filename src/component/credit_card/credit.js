/**
 * Created by Qiaodan on 2017/11/15.
 */


var creditFn={

    showInitNum:function(num){

        var _this=this;

        var thisInitHtml="";

        for(var i=0;i<num.length;i++){

            thisInitHtml+='<span>'+num[i]+'</span>'
        };

        document.getElementById('creditsavekeyNum').innerHTML=thisInitHtml;

        document.getElementById('credit_key_input').value=num;

    },

    valiateNextBtn:function(){

        var _this=this;

        var thisSaveNum=document.getElementById('credit_key_input');//input元素

        var thisNextBtn=document.getElementsByClassName('credit_card_button')[0];//下一步按钮

        var thisDeleteBtn = document.getElementsByClassName('num_delete')[0];//删除按钮


        if(!thisSaveNum.value ==""){


            thisDeleteBtn.style.display = 'block';

            thisNextBtn.removeAttribute("disabled")

        }else {

            thisDeleteBtn.style.display = 'none';

            thisNextBtn.setAttribute("disabled",true)
        }
    },

    forbidZero:function(e){

        var evt=e||window.event;

        var thisTargetEle=evt.srcElement||evt.target;

        if(thisTargetEle.getAttribute('data-value')=='.'&&document.getElementById('creditsavekeyNum').getElementsByTagName('span').length>1){//当前点击的是.

            deleteEle()
        }

        //如果当前第一次输入0
        else if(thisTargetEle.getAttribute('data-value')=='0'&&document.getElementById('creditsavekeyNum').innerText=="0"){

            deleteEle()
        }


        function deleteEle(){

            var thisPointEle=document.getElementById('creditsavekeyNum').getElementsByClassName('focusing')[0];

            var thisPreFocusing=document.getElementById('creditsavekeyNum').getElementsByClassName('focusing')[0].previousElementSibling;

            if(thisPointEle.parentNode){

                thisPointEle.parentNode.removeChild(thisPointEle);//删除当前点点元素
            }

            if(thisPreFocusing){//点点元素的上一位元素添加光标

                thisPreFocusing.className='focusing';
            }else {
                document.getElementById('creditsavekeyNum').className="keyNumshow focusing"
            }

        }


        document.getElementById('credit_key_input').value=document.getElementById('creditsavekeyNum').innerText;

        document.getElementById('creditsavekeyNum').setAttribute('data-money',document.getElementById('creditsavekeyNum').innerText)

    }
}





//弹出框

$('.credit_add_help').on("click", function (e) {

    var e = event || window.event;

    jfShowTips.dialogShow({

        "mainText": "友情提示",
        "minText": "为保证资金安全，只能添加本人名下的银行卡",

        "noCheck": false,
        "noCancel": true,
        "checkBtnText": "知道了",
        "checkFn": function () {
            jfShowTips.dialogRemove()
        }
    });

    e.stopPropagation();
    e.preventDefault()
})






