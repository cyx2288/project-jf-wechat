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
function showErrorText(ele,text){

    var patern=/[0-9]/;

    var thiscardNum=ele.value;

    var showError=document.getElementsByClassName('show_error')[0];

    if(thiscardNum){

        showError.style.display="block";

        showError.innerHTML=""+text+""

    }
}