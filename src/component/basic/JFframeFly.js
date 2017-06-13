
/*侧拉页面
 * 2017/3/14
 * 谯丹*/

var jfFrameFly={

    FlyShow:function(details){

        var _this = this;

        _this.showButton=details.showButton||0;//点击会出现侧拉页面的按钮，ID选择器

        _this.flyTime = details.flyTime || '0.3s';//侧拉飞入平滑过度时间

        _this.flyEleArea = details.flyEleArea || 0;//侧拉飞入的元素class选择器

        _this.hideFn = details.hideFn || 0;//关闭时发生的事件

        _this.otherHideButton = details.otherHideButton || 0;//其他关闭的按钮,CLass选择器

        _this.hasIframe=details.hasIframe||false;// 是否需要有iframe导入，class选择器

        _this.iframeName=details.iframeName||0;//iframe的class选择器

        _this.hideButton = details.hideButton || 0;//关闭的按钮,ID选择器

        _this.InitEleArea=details.InitEleArea||0;//初始页面，class选择器



        var thisFlyFrame=document.getElementsByClassName(_this.flyEleArea)[0];//出现侧拉页面

        var thisHideButton = document.getElementById(_this.hideButton);//关闭的元素

        var thisOtherHideButton=thisFlyFrame.getElementsByClassName( _this.otherHideButton)[0];//其他关闭的元素

        var thisShowButton=document.getElementById(_this.showButton);//点击的目标元素

        var thisInitEleArea=document.getElementsByClassName(_this.InitEleArea)[0];//初始页面

        _this.run=function(){

            var thisFlyWidth = window.innerWidth;//当前浏览区的宽度

            var thisFlyHeight = window.innerHeight;//当前浏览器的高度

            thisFlyFrame.style.display = "block";

            setTimeout(function(){
                thisFlyFrame.style.position = "absolute";
                thisFlyFrame.style.left = "0";
                thisFlyFrame.style.top = "0";
                thisFlyFrame.style.width = thisFlyWidth + "px";
                thisFlyFrame.style.height = thisFlyHeight + "px";

                thisFlyFrame.style.transform = "translate3d(0,0,0)";
                thisFlyFrame.style.webkitTransform = "translate3d(0,0,0)";
                thisFlyFrame.style.transition = "" + _this.flyTime + " transform";
                thisFlyFrame.style.webkitTransition = "" + _this.flyTime + " transform";


                if(_this.hasIframe){

                    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
                        var t = setTimeout(vipIframe, 100)
                    }, false); //页面转动时 重新设置宽于高



                    vipIframe();//iframe出现


                    function vipIframe(){

                        var thisIframe=thisFlyFrame.getElementsByClassName( _this.iframeName)[0];

                        thisIframe.style.width = thisFlyWidth + "px";//设置iframe的宽度

                        thisIframe.style.height = thisFlyHeight + "px";//iframe的宽度

                        thisFlyFrame.style.overflow="auto";

                    }

                    thisHideButton=window.frames[ _this.iframeName].document.getElementById(_this.hideButton);



                }


                if(thisHideButton){

                    thisHideButton.onclick=function(){
                        _this.stop()
                    };
                }


            },10);

            setTimeout(function(){
                thisInitEleArea.style.display="none";//初始页面隐藏
            },500)


        };

        _this.stop=function(){

            thisFlyFrame.addEventListener('webkitTransitionEnd', pageHide, false);
            thisFlyFrame.addEventListener('transitionend', pageHide, false); //绑定过渡事件

            thisInitEleArea.style.display="block";

            thisFlyFrame.style.transform = "translate3d(100%,0,0)";
            thisFlyFrame.style.webkitTransform = "translate3d(100%,0,0)";

            //页面隐藏
            function pageHide() {

                thisFlyFrame.style.display = "none";
                thisFlyFrame.style.position = "";
                thisFlyFrame.style.left = "";
                thisFlyFrame.style.top = "";
                thisFlyFrame.style.width ="";
                thisFlyFrame.style.height = "";

                thisFlyFrame.style.transform = "";
                thisFlyFrame.style.webkitTransform = "";
                thisFlyFrame.style.transition = "";
                thisFlyFrame.style.webkitTransition = "" ;

                if(_this.hasIframe){

                    var thisIframe=thisFlyFrame.getElementsByClassName( _this.iframeName)[0];

                    thisIframe.style.width = "";

                    thisIframe.style.height = "";
                }


                thisFlyFrame.removeEventListener('webkitTransitionEnd', pageHide, false);
                thisFlyFrame.removeEventListener('transitionend', pageHide, false); //解除过渡事件
            }

            if (_this.hideFn) {
                _this.hideFn(); //执行 关闭时加入的函数参数
            };

        };


        /*目标按钮点击出现*/
        thisShowButton.onclick=function(){

            _this.run();
        };

        if(thisOtherHideButton){//其他关闭按钮

            thisOtherHideButton.addEventListener("click",function(){

                _this.stop()
            },false)

        }

    }



};

/*侧拉页面结束*/