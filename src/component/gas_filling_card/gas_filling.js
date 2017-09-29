/**
 * Created by jjf on 2017/9/25.
 */


/*tab切换*/
function TravelTabChange(num,text){

    var tabChangeContent=document.getElementsByClassName('card_recharge_value')[0];//tab主体内容

    var tabTips=document.getElementsByClassName('tab_tips')[0];//提示箭头

    var tabChangeBar=document.getElementsByClassName('navigation_tab')[0].getElementsByTagName('div');//tab选项

    var thisWindowWidth=tabChangeContent.offsetWidth/2;

    var needTranslateX=-parseFloat(num)*thisWindowWidth;

    tabChangeContent.style.transform="translate3d("+needTranslateX+"px,0,0)";

    tabChangeContent.style.webkitTransform="translate3d("+needTranslateX+"px,0,0)";

    document.getElementsByClassName('tips')[0].innerHTML=""+text+"";

    document.getElementsByClassName('show')[0].className="";

    tabChangeBar[num].className="show";

}