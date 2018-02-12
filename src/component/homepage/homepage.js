/**
 * Created by Qiaodan on 2017/9/19.
 */


/*商品查看更多*/

var viewMorePro={

    showMore:function(){

        var thisMoveBar=document.getElementsByClassName('jf_product');

        var firstMove=1;

        var thisFirstPoint;//记录滚动条到达底部时，手指的位置；

        var thisLastPoint;

        var thisScroll;

        for(var i=0;i<thisMoveBar.length;i++){

            thisMoveBar[i].addEventListener("touchstart",touchStartFn,false);

            thisMoveBar[i].addEventListener("touchmove",touchMoveFn,false);

            thisMoveBar[i].addEventListener("touchend",touchEndFn,false);
        }





        function touchStartFn(){

            firstMove=1;//初始化
        }

        function touchMoveFn(e){

            var evt=e||window.event;

            var thisWindowWidth=window.innerWidth;//屏幕宽度

            var thisMovescroll=this.scrollLeft;//滚动条移动的距离

            var thisMoveWidth=this.scrollWidth;//div的长度

            thisScroll=parseFloat(thisMoveWidth)-parseFloat(thisWindowWidth+thisMovescroll);

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

                    var thisHref=this.previousElementSibling.getElementsByTagName('a');

                    window.location.href = thisHref.href;

                }

            }
        }

    }

};


var moveCount=0;

var newLazyLoad={

    init:function(details){

        var _this=this;

        if(!details){//如果details未输入，则防止报错
            details={};
        }

        _this.thisDisBottom=details.thisDisBottom||30;

        if(moveCount==0||moveCount==5){//降频
            _this.showPic();
            moveCount=0
        }

        moveCount++;
    },

    showPic:function(){

        var _this=this;

        var thisWindowHeight = window.innerHeight;//屏幕可视窗口高度

        var allLazyPar=document.getElementsByClassName('normal_product');

        for(var i =0;i<allLazyPar.length;i++){

            var thisDisTop=allLazyPar[i].getBoundingClientRect().top;

            if(thisDisTop>0&&parseFloat(thisDisTop)-parseFloat(thisWindowHeight)<=_this.thisDisBottom){//到达触发距离，并且元素位于屏幕下方

                var thislazyImg=allLazyPar[i].getElementsByClassName('lazypic');

                for(var j=0;j<thislazyImg.length;j++){

                    var thisImgSrc = thislazyImg[j].getAttribute('data-src');//获取当前元素的地址

                    thislazyImg[j].setAttribute('src', thisImgSrc);//替换图片地址

                }


            }

        }
    }
}

//首页生活缴费遮罩层

document.getElementsByClassName('h5_button')[0].addEventListener('click',function () {

    document.getElementsByClassName('living_payment_block')[0].className = 'living_payment_block living_payment_none';

},false)
