/**
 * Created by Qiaodan on 2017/8/18.
 */

/*tab切换*/
function TravelTabChange(num){

    var tabChangeContent=document.getElementsByClassName('section_value')[0];//tab主体内容

    var tabTips=document.getElementsByClassName('tab_tips')[0];//提示箭头

    var tabChangeBar=document.getElementsByClassName('section_tab')[0].getElementsByTagName('div');//tab选项

    var thisWindowWidth=tabChangeContent.offsetWidth/2;

    var needTranslateX=-parseFloat(num)*thisWindowWidth;

    tabChangeContent.style.transform="translate3d("+needTranslateX+"px,0,0)";

    tabChangeContent.style.webkitTransform="translate3d("+needTranslateX+"px,0,0)";

    document.getElementsByClassName('show')[0].className="";

    tabChangeBar[num].className="show";

}

//充值流程box
function showStepBox(){

    document.getElementsByClassName('import_text')[0].addEventListener('click',function(){

        document.getElementsByClassName('charge_step_box')[0].style.display="block";

        setTimeout(function(){
            document.getElementsByClassName('charge_step_box')[0].className="charge_step_box show"
        },10)

    },false)


    document.getElementsByClassName('sure')[0].addEventListener('click',function(){

        document.getElementsByClassName('charge_step_box')[0].className="charge_step_box";

        setTimeout(function(){

            document.getElementsByClassName('charge_step_box')[0].style.display="none";
        },100)

    },false)
}


/*select自动输入*/
function chooseCard(){

    var thisSelectEle=document.getElementsByClassName('number_choose')[0];

    var showCardEle=document.getElementsByClassName('number_text')[0];

    thisSelectEle.addEventListener('change',function(){

        var thisChooseCard=thisSelectEle.value;

        showCardEle.value=thisChooseCard;

    },false)



}

//报错
function showErrorText(ele,text){

    var patern=/[0-9]/;

    var thiscardNum=ele.value;

    var showError=document.getElementsByClassName('show_error')[0];

    if(thiscardNum){

        showError.style.display="block";

        showError.innerHTML=""+text+""

    }
}


