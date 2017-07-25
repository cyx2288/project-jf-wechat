/**
 * Created by Qiaodan on 2017/6/22.
 */

/*买入卖出页面加减金额*/
function changeValue() {


    var thisValue=document.getElementsByClassName('inputele')[0].value;


    if (this.className.indexOf('reduce') > -1) {

        thisValue=parseFloat(thisValue)-0.01;

        if(thisValue<=0.01){//最小值为0.01

            thisValue=0.01;

        }

        document.getElementsByClassName('inputele')[0].value= thisValue.toFixed(2)


    }
    else {

        thisValue=parseFloat(thisValue)+0.01;

        if(thisValue>=10.00){//最大值为10

            thisValue=10.00
        }

        document.getElementsByClassName('inputele')[0].value=thisValue.toFixed(2);

    }


}



