/**
 * Created by Qiaodan on 2017/6/21.
 */



var marketMoreFn={

    showFn:function(){
        var allBar=document.getElementsByClassName('fixed_side_btn')[0];

        if(allBar.className.indexOf('showMore')>-1){

            allBar.className=allBar.className.replace('showMore','')

        }else {
            allBar.className='fixed_side_btn showMore';
        }
    },


    hideFn:function(){
        var allBar=document.getElementsByClassName('fixed_side_btn')[0];

        if(allBar.className.indexOf('showMore')>-1){

            allBar.className=allBar.className.replace('showMore','')

        }

    }

};
