/**
 * Created by ZHUANGYI on 2017/6/22.
 */
var jfOrderTab = {

    switchTab: function () {

        var navTab = document.getElementById('orderTab').getElementsByClassName('tab');

        var orderList = document.getElementsByClassName('shop_order_list');

        for (var i = 0; i < navTab.length; i++) {

            navTab[i].index = i;

            navTab[i].addEventListener('click', function () {

                for (var j = 0; j < navTab.length; j++) {

                    orderList[j].className = orderList[j].className.replace(' show', '');

                }
                orderList[this.index].className += ' show'
            })
        }
    },


//------点击切换class

    clickTabChange: function (fatherEle, changeClass, className) {


        var allEle = fatherEle.getElementsByClassName(className);


        for (var i = 0; i < allEle.length; i++) {

            allEle[i].addEventListener('click', function () {

                fatherEle.getElementsByClassName(changeClass)[0].className = fatherEle.getElementsByClassName(changeClass)[0].className.replace(changeClass, '');

                this.className += ' ' + changeClass;

            }, false);

        }


    },


};

var jfProductDetails = {


    //------ 安卓系统滑动到一定位置固定tab

    slidePositionTab: function () {


        if (!browser.os.iOS) {  //判断机型

            var thisNavTab = document.getElementById('NavTab');

            var thisNavTabEmpty = document.getElementById('NavTabEmpty');


            function scrcoll() {

                if (thisNavTabEmpty.getBoundingClientRect().top <= 0) { //元素到页面顶端的位置

                    thisNavTab.style.position = 'fixed';

                    thisNavTab.style.top = '45px';

                    thisNavTab.style.zIndex = '100'

                }

                else {

                    thisNavTab.style.cssText = "";

                }
            }

            scrcoll();
        }

    },

    //------点击切换class

    clickTabChange: function (fatherEle, changeClass, className) {


        var allEle = fatherEle.getElementsByClassName(className);


        for (var i = 0; i < allEle.length; i++) {

            allEle[i].addEventListener('click', function () {

                fatherEle.getElementsByClassName(changeClass)[0].className = fatherEle.getElementsByClassName(changeClass)[0].className.replace(changeClass, '');

                this.className += ' ' + changeClass;

            }, false);

        }


    },



    //------tab点击切换页面

    tabScrollChange: function () {

        window.addEventListener('scroll', function () {


            var thisNavTab = document.getElementById('NavTab');

            var topTabHeigt = document.getElementsByClassName('product_nav_contain')[0];

            var a = thisNavTab.offsetHeight + topTabHeigt.offsetHeight;

            var parameterBlockDis = document.getElementsByClassName('product_images_parameter')[0];                         //参数规格到页面顶部的距离

            var serviceBlockDis = document.getElementsByClassName('product_images_service')[0];                             //售后到页面顶部的距离


            var imgBlockDis = document.getElementsByClassName('product_images')[0];


            if (imgBlockDis.getBoundingClientRect().top > thisNavTab.offsetHeight) {                                       //超出部分大于45 = 商品


                slideTabChoose(document.getElementsByClassName('content')[0], 'nav_tab', 0);

            }

            else if (imgBlockDis.getBoundingClientRect().top <= thisNavTab.offsetHeight) {                                //img模块小于等于45 = 图文


                slideTabChoose(document.getElementsByClassName('content')[0], 'nav_tab', 1);


                function titleTabChange() {                                                                                //图文&参数&售后切换


                    if (serviceBlockDis.getBoundingClientRect().top - a <= 0) {                                             //参数模块到页面顶部的距离 a为两个导航的和


                        slideTabChoose(document.getElementById('NavTab'), 'tab', 2);

                    }
                    else if (parameterBlockDis.getBoundingClientRect().top - a <= 0) {


                        slideTabChoose(document.getElementById('NavTab'), 'tab', 1);

                    }
                    else {

                        slideTabChoose(document.getElementById('NavTab'), 'tab', 0);
                    }
                }

                titleTabChange();

            }
            function slideTabChoose(element, childClassName, num) {                                                    //选择切换tab

                if (element.getElementsByClassName('choose_tab')[0]) {


                    element.getElementsByClassName('choose_tab')[0].className = element.getElementsByClassName('choose_tab')[0].className.replace('choose_tab', '');

                }

                element.getElementsByClassName(childClassName)[num].className += ' choose_tab';

            }


        });


    },




    //------弹出框点穿问题 0904更新
    clickThrough:function (fatherEle,hasScrollEle) {

        var thisScrollEle = document.getElementById(fatherEle).getElementsByClassName(hasScrollEle);

        //var thisVolum = document.getElementById('product_prompt_buy').getElementsByClassName('sku_volume_purchased')[0];

        var popTop = document.getElementsByClassName('pop_top')[0];

        var thisAddress = document.getElementById('jd_address_select').getElementsByClassName('top_address')[0];

        var startY, endY, distance;//开始距离、移动距离

        /*        for (var i=0;i<thisScrollEle.length;i++){

                    if(thisScrollEle[i].clientHeight < thisScrollEle[i].offsetHeight-4){

                        thisScrollEle[i].addEventListener('touchstart', touchStartEle, false);

                        thisScrollEle[i].addEventListener('touchmove', reachEdge, false);

                    }

                    else {

                        thisScrollEle[i].addEventListener('touchmove,touchstart',windowBanEvent.Canceling,false);
                    }

                }*/
        for(var i=0;i<thisScrollEle.length;i++){



            thisScrollEle[i].addEventListener('touchstart', touchStartEle, false);

            thisScrollEle[i].addEventListener('touchmove', reachEdge, false);

        }




        if(thisAddress){

            thisAddress.addEventListener('touchmove,touchstart',windowBanEvent.Canceling,false);

        }

        popTop.addEventListener('touchmove',windowBanEvent.Canceling,false);

        //thisScrollEle.addEventListener('touchmove', reachEdge, false);


        function touchStartEle(e) {

            //touchstart 获取位置startY

            startY = e.touches[0].pageY;

        }


        function reachEdge(event) {

            var _this = this;

            var eleScrollHeight = _this.scrollTop;//获取滚动条的位置 206

            var eleHeight = _this.scrollHeight;//元素实际高度 506

            var containerHeight = _this.offsetHeight;//容器高度 300


            //touchmove 获取位置 endY

            endY = event.touches[0].pageY;

            //两者之减的距离用来判断是向上活动还是向下滑动
            distance = startY - endY;

            //此时touchmove的值等于touchstart的值 循环
            endY = startY;


            //滚动条到达底部

            if (Math.abs(parseFloat(eleHeight) - parseFloat(eleScrollHeight + containerHeight)) <= 2) {


                //如果距离为正数 则向上滑动是 禁止浏览器事件

                if (distance > 0) {

                    event.preventDefault();


                }


            }

            else if (Math.abs(parseFloat(eleScrollHeight)) == 0) {

                //如果距离为负数 则向下滑动

                if (distance < 0) {

                    event.preventDefault();

                }


            }

        }


    },






};




