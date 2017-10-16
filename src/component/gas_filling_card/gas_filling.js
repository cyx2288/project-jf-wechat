/**
 * Created by jjf on 2017/9/25.
 */


/*tab切换*/
function TravelTabChange(num){

    var tabChangeContent=document.getElementsByClassName('card_tab_all')[0];//tab主体内容

    var tabChangeBar=document.getElementsByClassName('navigation_tab')[0].getElementsByTagName('div');//tab选项

    var thisWindowWidth=tabChangeContent.offsetWidth/2;

    var needTranslateX=-parseFloat(num)*thisWindowWidth;

    tabChangeContent.style.transform="translate3d("+needTranslateX+"px,0,0)";

    tabChangeContent.style.webkitTransform="translate3d("+needTranslateX+"px,0,0)";

    document.getElementsByClassName('show')[0].className="";

    tabChangeBar[num].className="show";

}

//报错
function showErrorText(ele,text,num){

    var patern=/[0-9]/;

    var thiscardNum=ele.value;

    var showError=ele.nextElementSibling;

    if(thiscardNum){

        showError.style.display="block";

        showError.innerHTML=""+text+""

    }
}




//出现温馨提示
function showWarmTips(){

    //焦点状态，报错信息删除
    document.getElementsByClassName('card_text')[0].addEventListener('focus',function(){

        var thiscardNum=this.value;

        var showError=document.getElementsByClassName('show_error')[0];

        if(showError.style.display=='block'){

            showError.style.display='none';
        }

        var warmTips=document.getElementsByClassName('card_hint_text')[0];//输入提示

        warmTips.className=warmTips.className+' tip_show';

    },false)



    //焦点状态，报错信息删除
    document.getElementsByClassName('card_text')[1].addEventListener('focus',function(){

        var thiscardNum=this.value;

        var showError=document.getElementsByClassName('show_error')[1];

        if(showError.style.display=='block'){

            showError.style.display='none';
        }

        var warmTips=document.getElementsByClassName('card_hint_text')[1];//输入提示

        warmTips.className=warmTips.className+' tip_show';

    },false)
}