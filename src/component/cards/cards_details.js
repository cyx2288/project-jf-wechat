/**
 * Created by Qiaodan on 2017/7/19.
 */


/*页面上下移动*/
var productTranslatePage = {

    init: function (details) {
        var _this = this;

        if (!details) {//如果details未输入，则防止报错
            details = {};
        }

        _this.topScreen = details.topScreen || 'cards_page_top';

        _this.bottomScreen = details.bottomScreen || 'cards_page_bottom';

        _this.moveDistanceY = 0;//y方向移動的距離

        _this.changeDistance = 60;//变化的距离

        _this.noScroll = false;//当前是否移动

        _this.firstScreen = document.getElementsByClassName(_this.topScreen)[0];//第一屏

        _this.secondScreen = document.getElementsByClassName(_this.bottomScreen)[0];//第二屏

        _this.firstScreenMain = _this.firstScreen.getElementsByClassName('top_main')[0];

        _this.secondScreenMain = _this.secondScreen.getElementsByClassName('bottom_main')[0];


        _this.moveEvent();


    },


    //绑定滚动事件
    moveEvent: function () {

        var _this = this;

        var MainBody = document.getElementsByClassName('cards_details')[0];

        var thisWindowHeight = window.innerHeight;

        var firstTouchesClientY;//初次点击的位置Y坐标

        var moveTouchesClientY;//移动一段距离后，停止点的位置(Y)


        //变量为true，可以移动，变量为false，不可移动，强制性的。
        var thisCanShow = true;

//循环变量
        var thisInterVal;

        var thisMoveHeight = thisWindowHeight - 100;

        var startScroll=0;


        var pastMoveDis

        var getBottom=true;

        MainBody.addEventListener('touchstart', moveStart, false);

        MainBody.addEventListener('touchmove', getMoveDis, false);

        MainBody.addEventListener('touchend', moveEndFn, false);


        //初始触摸移动
        function moveStart(event) {

            var evt = event ? event : window.event;

            firstTouchesClientY = parseFloat(evt.touches[0].pageY);

            _this.firstScreen.className = "" + _this.topScreen + "";

            _this.secondScreen.className = "" + _this.bottomScreen + "";

            getBottom=true;//初始化

            if( _this.secondScreen.style.opacity=="1"){

                startScroll= _this.secondScreen.scrollTop;

                if(!thisCanShow){

                    clearInterval(thisInterVal);

                    thisCanShow=true;//初始化

                }

            }

        }

        //获取移动中的距离
        function getMoveDis(event) {
            var evt = event ? event : window.event;

            moveTouchesClientY = parseFloat(evt.targetTouches[0].pageY);//末尾位置(Y);

            _this.moveDistanceY = (moveTouchesClientY - firstTouchesClientY) / 3;//Y軸方向最终移动的距离（第一根手指）;

            var firstScreenHeight = _this.firstScreenMain.offsetHeight;

            var thisWindowHeight = window.innerHeight;

            var firstDis=_this.firstScreenMain.getBoundingClientRect().bottom;

            if (_this.firstScreen.style.opacity == "1") {

                if (firstDis<=thisWindowHeight-55 && _this.moveDistanceY < 0) {//向上滑动(第一屏滚动条已经到达底部)

                    moveTouchesClientY = parseFloat(evt.targetTouches[0].pageY);//末尾位置(Y);

                    if(getBottom){

                        pastMoveDis=  moveTouchesClientY;//缓存到达底部时，手指触摸位置

                        getBottom=false
                    }

                    _this.moveDistanceY = (moveTouchesClientY - pastMoveDis) / 3;//Y軸方向最终移动的距离（第一根手指）;

                    evt.preventDefault();//阻止浏览器的默认行为

                    evt.stopPropagation();

                    _this.transformFn( _this.firstScreen,_this.moveDistanceY+'px');

                }
            } else {

                if (_this.secondScreen.scrollTop == "0" && _this.moveDistanceY > 0) {//向下滑动，第二屏的滚动条为0，即到达顶部


                    if(getBottom){

                        pastMoveDis=  moveTouchesClientY;//缓存到达底部时，手指触摸位置

                        getBottom=false
                    }

                    _this.moveDistanceY = (moveTouchesClientY - pastMoveDis) / 3;//Y軸方向最终移动的距离（第一根手指）;

                    evt.preventDefault();//阻止浏览器的默认行为

                    evt.stopPropagation();

                    var thisMoveDistance = _this.moveDistanceY - thisWindowHeight+100;

                    _this.transformFn( _this.secondScreen,thisMoveDistance+'px');
                }

            }
        }

        //触摸完毕，页面移动
        function moveEndFn(event) {

            var evt = event ? event : window.event;

            var thisTargetImg = evt.srcElement || evt.target;

            if (_this.secondScreen.style.opacity == "1") {

                var firstScrollTop =_this.secondScreen.scrollTop;

                var lastScrollTop = 0;

                var endTouchesY=evt.changedTouches[0].pageY;

                setTimeout(function(){

                    lastScrollTop = _this.secondScreen.scrollTop;

                    var thisDistaceY= _this.secondScreen.getBoundingClientRect().bottom;

                    /*本次放开手后的移动速度*/
                    var canShow = Math.abs(lastScrollTop-firstScrollTop);

                    if(Math.abs(lastScrollTop-startScroll)<1&&canShow<1){//排除滚动条为0,排除滚动条到达底部

                       if(((_this.secondScreen.scrollTop + thisWindowHeight) >= _this.secondScreenMain.offsetHeight||_this.secondScreen.scrollTop==0)&&Math.abs(endTouchesY-firstTouchesClientY)>20){//排除滚动条到达底部
                            thisCanShow = false
                        }

                       showScaleEle(thisTargetImg);

                        if((_this.secondScreen.scrollTop + thisWindowHeight) >= _this.secondScreenMain.offsetHeight){//滚动条滑到页面底部
                            thisCanShow = false
                        }else {

                            thisCanShow = true
                        }

                    }


                    else {

                        thisInterVal = setInterval(timerOutFn,100);

                    }

                },10);

            };



            /*循环执行判断函数*/
            function timerOutFn(){

                var firstScrollTop =_this.secondScreen.scrollTop;

                var lastScrollTop = 0;

                setTimeout(function(){

                    lastScrollTop = _this.secondScreen.scrollTop;

                    /*本次放开手后的移动速度*/
                    var canShow = Math.abs(lastScrollTop- firstScrollTop);

                    if(canShow<1){

                        clearInterval(thisInterVal);

                        thisCanShow = true;

                    }

                    else {

                        thisCanShow = false;

                    }

                },50);

            }


            function showScaleEle(ele) {

                if(thisCanShow) {

                    var thisScaleEle = document.getElementsByClassName('jd_banner_touch')[0].getElementsByTagName('img')[0];

                    var thisImgSrc = ele.getAttribute('src');//获取点击图片的SRC

                    if(thisImgSrc){
                        thisScaleEle.setAttribute('src', thisImgSrc);

                        document.getElementsByClassName('product_show_content')[0].style.display = "block";

                        document.getElementsByTagName("body")[0].style.overflow = "hidden";//页面禁止滚动

                        document.getElementsByTagName("html")[0].style.overflow = "hidden";//页面禁止滚动
                    }



                }


            }

            _this.endTranslateFn(_this.moveDistanceY);//页面上下切换

        }


    },


    //页面滚动
    endTranslateFn: function (thisDistance) {

        var _this = this;

        var firstScreenHeight = _this.firstScreenMain.offsetHeight;

        var thisWindowHeight = window.innerHeight;

        var thisMoveHeight = thisWindowHeight-100;

        _this.firstScreen.className = "" + _this.topScreen + " change";

        _this.secondScreen.className = "" + _this.bottomScreen + " change";

        if ((_this.firstScreen.scrollTop + thisWindowHeight) >= firstScreenHeight && thisDistance < 0 &&_this.firstScreen.style.opacity=="1") {//如果是在第一屏，触发(第一屏滚动条已经到达底部)

            if (Math.abs(thisDistance) > _this.changeDistance) {

                _this.transformFn(_this.firstScreen,-thisMoveHeight+'px');

                _this.firstScreen.style.opacity = "0";

                setTimeout(function(){

                    _this.secondScreen.style.opacity = "1";

                    _this.secondScreen.scrollTop=45;

                    _this.transformFn(_this.secondScreen,-thisMoveHeight+'px');

                },100)


            } else {

                _this.transformFn(_this.secondScreen,0);

                _this.transformFn(_this.firstScreen,0);
            }


        } else if (_this.secondScreen.scrollTop <= 0 && thisDistance > 0 && _this.secondScreen.style.opacity=="1") {//如果是在第二屏触发(第二屏滚动条为0 )

            if (Math.abs(thisDistance) > _this.changeDistance) {

                _this.secondScreen.style.opacity = "0";

                _this.transformFn( _this.secondScreen,0);

                setTimeout(function () {

                    _this.transformFn(_this.firstScreen,0);

                    _this.firstScreen.style.opacity = "1";
                }, 100)


            } else {

                _this.transformFn(_this.secondScreen,-thisMoveHeight+'px');

            }

        }

    },


    //页面变化
    transformFn:function(ele,num){

        var _this=this;

       ele.style.transform="translate3d(0,"+num+",0)";

        ele.style.webkitTransform="translate3d(0,"+num+",0)";

    }


};


/*图片缩放*/
function initBannerTouch(details) {


    var leftFn = details.leftFn;

    var rightFn = details.rightFn;


    //需要加监听的元素
    var moveEle = document.getElementsByClassName("jd_banner_touch");

    for (var i = 0; i < moveEle.length; i++) {

        moveEle[i].addEventListener('touchstart', imgTouchStart, false);

        moveEle[i].addEventListener('touchmove', imgTouchMove, false);

        moveEle[i].addEventListener('touchend', imgTouchEnd, false);

        moveEle[i].addEventListener('click', backToPage, false);

    }


    /*储存是否需要更新第一次的位置*/
    var isSaveDistance = true;

    //存储上一次距离
    var firstDistance = 0;

    /*缓存最新的距离*/
    var lastDistance = 0;

    /*上一次的放大缩小比例*/
    var pastProportion = 1;

    /*保存最新的移动参考位置*/
    var lastPalace = [0, 0];

    /*缓存第一次移动参考位置*/
    var firstPalace = [0, 0];

    /*保存每次元素真正偏移位置*/
    var lastPositionTransform = [0, 0];

    /*上一次的偏移位置*/
    var pastPositionTransform = [0, 0];

    /*保存移动方式*/
    var howMove = 0;


    /*缓存本次比例*/
    var proportion = 1;


    function imgTouchStart(evt) {

        /*删除所有变换*/
        while (this.className.indexOf('move') != -1) {

            this.className = this.className.replace('move', '')

        }

        /*去除ios抖动*/
        /* if(browser.os.iOS && this.className.indexOf('ios')==-1){

         this.className+=' ios'

         }*/

        if (pastProportion != 1 || proportion != 1) {

            evt.preventDefault();
            evt.stopPropagation();

        }


        /*初始化放大缩小倍数
         * */
        pastProportion = 1;

        proportion = 1;


        /*自锁打开*/
        isSaveDistance = true;

        /*初始化移动方式*/
        howMove = 0;

        pastPositionTransform = [0, 0];


    }


    //放大缩小事件
    function imgTouchMove(evt) {

        if (evt.touches.length == 1 && (howMove == 1 || howMove == 0) && this.getAttribute('data-proportio') && this.getAttribute('data-proportio') != 1) {

            howMove = 1;
            /*单个就保存一个的位置*/
            lastPalace = [evt.touches[0].pageX, evt.touches[0].pageY];

            /*判断是否是第一次一个手指，是的话就缓存该位置*/
            if (isSaveDistance) {

                /*自锁*/
                isSaveDistance = false;

                /*保存第一次居中位置*/
                firstPalace = lastPalace;

                /*如果有上次改变值，则作为乘积，缓存*/
                if (this.getAttribute('data-proportio')) {

                    proportion = pastProportion = this.getAttribute('data-proportio');

                    /*上一次x轴偏移*/
                    pastPositionTransform[0] = parseInt(this.getAttribute('data-left'));

                    /*上一次y轴偏移*/
                    pastPositionTransform[1] = parseInt(this.getAttribute('data-top'))

                }

            }

            lastPositionTransform = [

                (lastPalace[0] - firstPalace[0]) / proportion + pastPositionTransform[0],

                (lastPalace[1] - firstPalace[1]) / proportion + pastPositionTransform[1]

            ];

            /*变化*/


            changeTransform(this, proportion, lastPositionTransform[0], lastPositionTransform[1]);


            //test1(lastPositionTransform[0]);

            //test2(proportion)

            /*禁止浏览器默认事件*/
            evt.preventDefault();

            evt.stopPropagation()


        }

        /*多于两个手指打开*/
        else if (evt.touches.length == 2 && (howMove == 2 || howMove == 0)) {

            howMove = 2;

            var touchsX = [evt.touches[0].pageX, evt.touches[1].pageX];

            var touchsY = [evt.touches[0].pageY, evt.touches[1].pageY];

            /*保存最新的触摸中间点位置*/
            lastPalace = [(touchsX[0] + touchsX[1]) / 2, (touchsY[0] + touchsY[1]) / 2];

            /*控制放大缩小*/
            /*两手指间的距离*/
            lastDistance = Math.sqrt(
                Math.pow(touchsX[0] - touchsX[1], 2),

                Math.pow(touchsY[0] - touchsY[1], 2)
            );

            /*判断是否是第一次出现两个手指，是的话就缓存该位置*/
            if (isSaveDistance && lastDistance > 0) {

                /*自锁*/
                isSaveDistance = false;

                /*保存第一次位置*/
                firstDistance = lastDistance;

                /*保存第一次居中位置*/
                firstPalace = lastPalace;

                /*如果有上次改变值，则作为乘积，缓存*/
                if (this.getAttribute('data-proportio')) {

                    /*查找上一次的缩放比例*/
                    pastProportion = this.getAttribute('data-proportio');

                    /*上一次x轴偏移*/
                    pastPositionTransform[0] = parseInt(this.getAttribute('data-left'));

                    /*上一次y轴偏移*/
                    pastPositionTransform[1] = parseInt(this.getAttribute('data-top'))

                }

            }

            /*比例=(第一次次距离+增量*比例)/第一次次距离*乘积*/
            proportion = (firstDistance + (lastDistance - firstDistance) / 3 * 2) / firstDistance * pastProportion;

            /*比例控制*/
            proportion = (function (num) {

                /*安卓没有弹性收回*/
                if (browser.os.iOS) {
                    /*大于1 减弱*/
                    if (num < 1) {

                        num = 1 - (1 - num ) / 2;

                    }

                    else if (num > 3.5) {

                        num = 2.833;

                    }

                    /*大于2.5 减弱*/
                    else if (num > 2.5) {

                        num = 2.5 + (num - 2.5 ) / 3;

                    }


                    return num
                }

                else {

                    return controlNum(num)

                }

            })(proportion);

            /*储存上一次比例*/
            this.setAttribute('data-proportio', proportion);

            //test1(proportion);

            /*保存上一次位置=（本次位置-第一次位置）/放大缩小系数*/
            lastPositionTransform = [

                (lastPalace[0] - firstPalace[0]) / proportion + pastPositionTransform[0],

                (lastPalace[1] - firstPalace[1]) / proportion + pastPositionTransform[1]

            ];


            /*变化*/
            changeTransform(this, proportion, lastPositionTransform[0], lastPositionTransform[1]);

            //test1(lastPositionTransform[0]);

            //test2(proportion)

            /*禁止浏览器默认事件*/
            evt.preventDefault();

            evt.stopPropagation()


        }

    }


    /*触摸结束方法*/
    function imgTouchEnd(evt) {

        var _this = this;

        /*最后的数据进行调整*/
        proportion = controlNum(proportion);

        lastPositionTransform[0] = controlTransformX(lastPositionTransform[0], _this);

        lastPositionTransform[1] = controlTransformY(lastPositionTransform[1], _this);

        /*变化函数*/
        change(_this, proportion, lastPositionTransform[0], lastPositionTransform[1]);

        function change(ele, num, positionLeft, positionTop) {

            changeTransform(ele, num, positionLeft, positionTop);

            _this.setAttribute('data-proportio', num);

            _this.setAttribute('data-left', positionLeft);

            _this.setAttribute('data-top', positionTop);

            _this.className += ' move'

        }

    }

    function backToPage(evt) {

        //当前缩放为1，并且没有移动，点击返回
        if (proportion == 1 && pastProportion == 1 && evt.type == 'click') {

            document.getElementsByClassName('product_show_content')[0].style.display = "none";

            document.getElementsByTagName("body")[0].style.overflow = "";//页面可以滚动
            document.getElementsByTagName("html")[0].style.overflow = "";//页面可以滚动

        }

    }

    /*处理数字方法*/
    function controlNum(num) {

        if (num < 1) {

            return 1

        }

        /*小于2.5收回*/
        else if (num > 2.5) {

            return 2.5

        }

        return num

    }

    /*x轴*/
    function controlTransformX(num, ele) {

        var offsetWidth = document.documentElement.clientWidth;

        /*实际元素高度*/
        var thisWidth = ele.clientWidth * controlNum(proportion);


        /*整体居中*/
        if (offsetWidth >= thisWidth) {

            return 0

        }

        else {

            var distance = ele.getBoundingClientRect().left;

            /*左边没有贴合*/
            if (distance > 0) {


                if (distance > offsetWidth / 3) {


                    leftFn();


                }

                return (thisWidth - offsetWidth) / 2 / proportion

            }

            /*右边没有贴合*/
            else if (offsetWidth - (thisWidth + distance) > 0) {


                if (offsetWidth - (thisWidth + distance) > offsetWidth / 3) {

                    rightFn();


                }

                return -(thisWidth - offsetWidth) / 2 / proportion

            }


            else {

                return num

            }

        }


    }


    //y轴回正
    function controlTransformY(num, ele) {

        /*页高*/
        var offsetHeight = document.documentElement.clientHeight;

        /*实际元素高度*/
        var thisHeight = ele.clientHeight * controlNum(proportion);


        /*整体居中*/
        if (offsetHeight >= thisHeight) {

            return 0

        }

        else {

            var distance = ele.getBoundingClientRect().top;

            /*上部没有贴合*/
            if (distance > 0) {

                return (thisHeight - offsetHeight) / 2 / proportion

            }

            /*下部没有贴合*/
            else if (offsetHeight - (thisHeight + distance) > 0) {

                return -(thisHeight - offsetHeight) / 2 / proportion

            }

            else {

                return num

            }

        }

    }

    /*通用放大缩小方法*/
    function changeTransform(ele, proportionNum, transformLeft, transformTop) {


        var thisTransformDetail = "scale3d(" + proportionNum + "," + proportionNum + ",1) translate3d(" + transformLeft + "px, " + transformTop + "px , 0)";

        ele.style.transform = thisTransformDetail;

        ele.style.webkitTransform = thisTransformDetail;


    }

}


initBannerTouch({

    leftFn: function () {

        // _this.movePosition(1);//(向右滑动)

    },

    rightFn: function (e) {

        //   _this.movePosition(-1);//(向左滑动)

    }

})




