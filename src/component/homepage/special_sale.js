/**
 * Created by Qiaodan on 2017/9/11.
 */

//专享抢购

/*
var viewMorePro={

    showMore:function(){

        var _this = this;

        var thisMoveBar=document.getElementsByClassName('sale_product')[0];

        var firstMove=1;

        var thisFirstPoint;//记录滚动条到达底部时，手指的位置；

        var thisLastPoint;

        var thisScroll;

        thisMoveBar.addEventListener("touchstart",touchStartFn,false);

        thisMoveBar.addEventListener("touchmove",touchMoveFn,false);

        thisMoveBar.addEventListener("touchend",touchEndFn,false);



        function touchStartFn(){

            firstMove=1;//初始化
        }

        function touchMoveFn(e){

            var evt=event||window.event;

            var thisWindowWidth=window.innerWidth;//屏幕宽度

            var thisMovescroll=thisMoveBar.scrollLeft;//滚动条移动的距离

            var thisMoveWidth=thisMoveBar.scrollWidth;//div的长度

            thisScroll=parseFloat(thisMoveWidth)-parseFloat(thisWindowWidth+thisMovescroll)

            if(firstMove&&thisScroll<=5){//当滚动条滑动到底部

                thisFirstPoint=evt.touches[0].screenX;

                firstMove=0;//自锁一次
            };

            thisLastPoint=evt.touches[0].screenX;

        }


        function touchEndFn(){

            if(thisFirstPoint){

                var thisMoveDis=thisLastPoint-thisFirstPoint;

                if(Math.abs(thisMoveDis)>15&&thisScroll<=5){

                    var thisHref=document.getElementsByClassName('show_more')[0];

                    window.location.href = thisHref.href;


                }

            }
        }

    }

};*/
