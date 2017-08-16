/**
 * Created by Qiaodan on 2017/8/14.
 */




var messageCenter={

    //点击编辑按钮任意切换
    showCheckBox:function(){

        var allMessageList=document.getElementsByClassName('messagecheck');

        var allcheckBox=document.getElementsByClassName('box');

        if(this.innerHTML.indexOf('编辑')>-1){

            for(var i=0;i<allcheckBox.length;i++){

                allMessageList[i].className="messagecheck show";

            }

            document.getElementsByClassName('tab_content')[0].style.transform="translate3d(0,0,0)";

            this.innerHTML="完成";


        }else {

            this.innerHTML="编辑";

            for(var i=0;i<allcheckBox.length;i++){

                allMessageList[i].className="messagecheck";

            }

            document.getElementsByClassName('tab_content')[0].style.transform="translate3d(0,100%,0)";

        }
    },


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

                var thisbalanceBox=messageCenter.judgeSingleBox();

                if(thisbalanceBox){

                    checkAllBox.checked=true;
                }else {
                    checkAllBox.checked=false;
                }
            },false)

        }


    },

    deleteMessageList:function(){//删除消息通知

        var allsingleBox=document.getElementsByClassName('singlecheck');

        var thisbalanceBox=messageCenter.judegNocheck();

        if(!thisbalanceBox){//如果一个都没选择

            jfShowTips.toastShow({"text":"请选择需要删除的消息"})

        }else {

            for(var i=0;i<allsingleBox.length;i++){

                if(allsingleBox[i].checked){
                    var thisSelectBox=allsingleBox[i];

                    getRightParent(thisSelectBox);

                }
            }

        };


        //选中box正确的父元素
        function getRightParent(checkEle){

            var allsingleBox=checkEle;

            for(var i=0;i<100;i++){

                var thisParentEle=allsingleBox.parentNode;

                if(thisParentEle.className.indexOf('message_list')>-1){

                    thisParentEle.style.transform="translate3d(-100%,0,0)";

                    thisParentEle.style.webkitTransform="translate3d(-100%,0,0)";

                    setTimeout(function(){

                        if(thisParentEle.parentNode){

                            thisParentEle.parentNode.removeChild(thisParentEle);//删除当前元素

                        }

                    },300);

                    break

                }else {

                    allsingleBox=allsingleBox.parentNode;
                }

            }

        }

    },

    cancelMessageTips:function(clickEle,deleteEle){//取消消息提示数字(c)

        var thisClickEle=document.getElementsByClassName(clickEle)[0];

        var thishref=thisClickEle.getAttribute('data-href');

        if(deleteEle){
            var thisMessageTips=thisClickEle.getElementsByClassName(deleteEle)[0];

            if(thisMessageTips.parentNode){

                thisMessageTips.parentNode.removeChild(thisMessageTips);//删除该元素
            }
        }

        setTimeout(function(){

            thisClickEle.href=thisClickEle.getAttribute('data-href');

            window.location.href=thishref;

        },100)





    },

    noclick:function(){

        //删除状态a标签无法点击
        var thisHrefEle=document.getElementsByClassName('message_text');

        for(var i=0;i<thisHrefEle.length;i++){

            thisHrefEle[i].addEventListener('click',function(e){

                var evt=e||window.event;

                if(document.getElementsByClassName('edit')[0].innerHTML.indexOf('完成')>-1){

                    evt.preventDefault();
                }

            },false)

        }

    }


}









