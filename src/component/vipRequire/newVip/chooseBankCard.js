/**
 * Created by Qiaodan on 2017/4/17.
 */
function selectBnakCard(thisEle){//当前点击的元素

    var bankName=thisEle.getElementsByClassName('bank_name')[0].innerHTML;//当前银行卡的名字

    var thisChooseBankNum=thisEle.getElementsByClassName('card_lastnum')[0].innerHTML;//银行卡最后几位数字

    var thisChooseBankLogo=thisEle.getElementsByClassName('bank_logo')[0].src;//获取银行logo

    var thisShowbank=document.getElementById('bank_select');//显示列表

    var thisShowSelected=document.getElementsByClassName('weui_choose')[0];//已选标志

    if(thisShowSelected.parentNode){

        thisShowSelected.parentNode.removeChild(thisShowSelected);//删除其他已选标志
    }

    var creatSelectNode=document.createElement('div');//当前点击元素增加医院标志

    creatSelectNode.setAttribute('class','weui_choose');

    creatSelectNode.innerHTML="已选";


    thisEle.insertBefore(creatSelectNode,thisEle.getElementsByClassName('weui_cross')[0]);

    thisShowbank.getElementsByClassName('choose_bank_name')[0].innerHTML=bankName.substr(2);//截取后的银行简称

    thisShowbank.getElementsByClassName('choose_bank_num')[0].innerHTML="[*"+thisChooseBankNum+"]";

    thisShowbank.getElementsByClassName('choose_bank_logo')[0].getElementsByTagName('img')[0].src=thisChooseBankLogo
}