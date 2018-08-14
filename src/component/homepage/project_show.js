
var giftDetails = {


    //滚动条滑动到指定位置 tab变化
    scrollChangeDetails: function (thisEleBox) {

        //滚动切换
        var thisScrollTop = thisEleBox.scrollTop;

        var thisDocumentHeight = thisEleBox.scrollHeight;//获取当前文档的高度 2242

        var thisWindowHeight = thisEleBox.offsetHeight;//屏幕可视窗口高度 667

        var navContent = document.getElementsByClassName('details_nav_content')[0];//导航盒子

        var thisNavDistance = navContent.offsetHeight;//nav高度42

        var thisEleTop1 = document.getElementsByClassName('gift_details_images')[0].getBoundingClientRect().top;//1元素到页面高度

        var thisEleTop2 = document.getElementsByClassName('gift_specification_details')[0].getBoundingClientRect().top; //2元素到页面高度

        //固定tab 仅限安卓
        giftDetails.slidePositionTab();

        //滚动条在一定位置出现
        showTopBox();

        //如果距离大于0 两者都不高亮
        if(thisEleTop1 - thisNavDistance > 0) {

            //判断有没有高亮 有的话全部清除
            if(navContent.getElementsByClassName('selected')[0]){

                navContent.getElementsByClassName('selected')[0].className = 'product_details';
            }

        }

        //如果到该元素页面的高度为负数的话 该元素已经通过nav 礼品详情高亮

        if(thisEleTop1 - thisNavDistance <= 0) {

            slideTabChoose(navContent,0)
        }

        //产品详情高亮
        if(thisEleTop2 - thisNavDistance <= 0) {

            slideTabChoose(navContent,1)
        }

        //选择切换tab

        function slideTabChoose(element,num) {


            if (element.getElementsByClassName('selected')[0]) {


                element.getElementsByClassName('selected')[0].className = 'product_details';

            }

            element.getElementsByClassName('product_details')[num].className += ' selected';

        }


        //滚动条到一定位置 显示置顶按钮
        function showTopBox() {


            if (Math.abs(parseFloat(thisDocumentHeight) - parseFloat(thisScrollTop + thisWindowHeight)) >= 300) {

                //console.log('出现')
                document.getElementsByClassName('top_box')[0].className = 'top_box'

            }

            else {


                document.getElementsByClassName('top_box')[0].className = 'top_box show';
                //console.log('消失')

            }


        }

    },


//滑动到达指定位置方法
    scrollMove: function (scrollTo, time) {

        //var scrollFrom = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        var scrollFrom = document.getElementsByClassName('description_box_cover')[0].pageYOffset || document.getElementsByClassName('description_box_cover')[0].scrollTop;

        var count = 0;

        var every = 10;

        //到元素的距离
        scrollTo = parseInt(scrollTo);

        time /= every;

        var interval = setInterval(function () {

            count++;

            document.getElementsByClassName('description_box_cover')[0].scrollTop = document.getElementsByClassName('description_box_cover')[0].scrollTop = (scrollTo - scrollFrom) / time * count + scrollFrom;

            if (count >= time) {

                clearInterval(interval);

            }
        }, every);

    },

}