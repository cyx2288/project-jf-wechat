/**
 * Created by Qiaodan on 2017/11/15.
 */


var newCashFn={

    showInitNum:function(num){

        var _this=this;

        var thisInitHtml="";

        for(var i=0;i<num.length;i++){

            thisInitHtml+='<span>'+num[i]+'</span>'
        };

        document.getElementById('savekeyNum').innerHTML=thisInitHtml;

        document.getElementById('key_input').value=num;

        _this.valiateNextBtn()

    },

    valiateNextBtn:function(){

        var _this=this;

        var thisSaveNum=document.getElementById('key_input');//input元素


        var thisNextBtn=document.getElementsByClassName('buy_check_btn')[0];//下一步按钮

        if(!thisSaveNum.value==""){

            thisNextBtn.removeAttribute("disabled")
        }else {

            thisNextBtn.setAttribute("disabled",true)
        }
    },

    forbidZero:function(e){

        var evt=e||window.event;

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
}
