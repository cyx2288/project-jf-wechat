/**
 * Created by Qiaodan on 2017/9/26.
 */


var couponTabChange={

    moveTab:function(){

        var clickEle=document.getElementsByClassName('coupon_label')[0].getElementsByClassName('label_part');

        var allTabEle=document.getElementsByClassName('all_coupon_tabs')[0];


        for(var i=0;i< clickEle.length;i++){

            clickEle[i].addEventListener('click',tabMoveFn,false);

        }

        function tabMoveFn(e){

            document.getElementsByClassName('show')[0].className= document.getElementsByClassName('show')[0].className.replace('show',"");

            this.className=this.className+" show";

            var thisIndex=getRightIndex();

            var thisWindowWidth=window.innerWidth;

            var moveDis=-thisWindowWidth*thisIndex;

            var allMessageList = document.getElementsByClassName('couponcheck');

            var allcheckBox = document.getElementsByClassName('coupon_box');

            allTabEle.style.transform='translate3d('+moveDis+'px,0,0)';

            document.getElementsByClassName('tab_content')[0].style.transform="translate3d(0,100%,0)";

            if(document.getElementById('preferentialTransfer')){

                document.getElementById('preferentialTransfer').innerHTML = '转赠优惠券';
            }



            for (var i = 0; i < allcheckBox.length; i++) {

                allMessageList[i].className = "couponcheck";

            }

            var allCheckBox = document.getElementsByClassName('aui-radio');

            for (var j = 0; j < allCheckBox.length; j++) {

                allCheckBox[j].checked = false
            }

        }
        function getRightIndex(){
            for(var j=0;j< clickEle.length;j++){

                if(clickEle[j].className.indexOf('show')>-1){

                    return j
                }
            }
        }




    },

    //点击编辑按钮任意切换
    showCheckBox:function(){

        var allMessageList=document.getElementsByClassName('couponcheck');

        var allcheckBox=document.getElementsByClassName('coupon_box');

        if(this.innerHTML.indexOf('转赠优惠券')>-1){

            for(var i=0;i<allcheckBox.length;i++){

                allMessageList[i].className="couponcheck coupon_show";

            }

            document.getElementsByClassName('tab_content')[0].style.cssText = "transform:translateY(0);transform:translate3d(0,0,0)";

            //document.getElementsByClassName('tab_content')[0].style.transform="translate3d(0,0,0)";

            this.innerHTML="取消转赠";


        }else if(this.innerHTML.indexOf('取消转赠')>-1) {



            this.innerHTML="转赠优惠券";

            for(var i=0;i<allcheckBox.length;i++){

                allMessageList[i].className="couponcheck";

            }

            var allCheckBox=document.getElementsByClassName('aui-radio');

            for(var j=0;j<allCheckBox.length;j++){

                allCheckBox[j].checked=false
            }

            document.getElementsByClassName('tab_content')[0].style.cssText = "transform:translateY(100%);transform:translate3d(0,100%,0)";

            //document.getElementsByClassName('tab_content')[0].style.transform="translate3d(0,100%,0)";

        }
    },

    //去选
    checkALL:function (){ //全选

        var allsingleBox=document.getElementsByClassName('singlecheck');

        if(this.checked==true){

            for(var i=0;i<allsingleBox.length;i++){

                allsingleBox[i].checked=true;

            }

        }else {

            for(var i=0;i<allsingleBox.length;i++){

                allsingleBox[i].checked=false;

            }
        }

    },

    judgeSingleBox:function(){//判断当前box是否全部选中
        var allsingleBox=document.getElementsByClassName('singlecheck');

        for(var i=0;i<allsingleBox.length;i++){

            if(!allsingleBox[i].checked){

                return false;//没有选中
            }
        }

        return true;//有选中
    },

    judegNocheck:function(){//判断当前是否一个都没有选择
        var allsingleBox=document.getElementsByClassName('singlecheck');

        for(var i=0;i<allsingleBox.length;i++){

            if(allsingleBox[i].checked){

                return true
            }
        }

        return false;
    },

    singeCheck:function(messagecheck){//单选（反选）

        var allsingleBox=document.getElementsByClassName(messagecheck);

        for(var i=0;i<allsingleBox.length;i++){

            allsingleBox[i].addEventListener('click',function(){

                var thischoosebox=this.getElementsByTagName('input')[0];

                if(thischoosebox.checked){
                    thischoosebox.checked=false
                }else {
                    thischoosebox.checked=true;
                }

                var checkAllBox=document.getElementsByClassName('checkallbox')[0];

                var thisbalanceBox=couponTabChange.judgeSingleBox();

                if(thisbalanceBox){

                    checkAllBox.checked=true;
                }else {
                    checkAllBox.checked=false;
                }
            },false)

        }


    },

    //编辑状态下无法点击链接
    noclick:function(){

        //删除状态a标签无法点击
        var thisHrefEle=document.getElementsByClassName('coupon_plate');

        for(var i=0;i<thisHrefEle.length;i++){

            thisHrefEle[i].addEventListener('click',function(e){

                var evt=e||window.event;

                if(document.getElementById('preferentialTransfer').innerHTML.indexOf('取消转赠')>-1){

                    evt.preventDefault();
                }

            },false)

        }

    },

    //
    ruleHref:function (thisHref) {

        document.getElementsByClassName('rule_block')[0].addEventListener('click',function (e) {

            var evt=e||window.event;

            evt.preventDefault();

            evt.stopPropagation();

            window.location.href = thisHref;

        },false)
    }




}
