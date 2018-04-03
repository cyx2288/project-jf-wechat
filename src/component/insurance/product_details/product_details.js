//产品介绍，理赔说明，常见问题切换
var showText= {

    textDetails:function () {

        var clickElement = document.getElementsByClassName('problem_bar_part');

        var closeElement = document.getElementsByClassName('pull_things');

        for (var i=0;i<clickElement.length;i++) {

            clickElement[i].addEventListener('click',function () {

                var thisEle=this;

                var rightIndex = test();

                function test() {

                    for (var j=0;j<clickElement.length;j++) {

                        if (thisEle==clickElement[j]) {

                            return j;
                        }

                    }

                }

                //点击时，文字变颜色
                if (document.getElementsByClassName('font_color_blue')[0]) {

                    if (thisEle.className.indexOf('font_color_blue')>-1) {

                    }else {

                        document.getElementsByClassName('font_color_blue')[0].className=document.getElementsByClassName('font_color_blue')[0].className.replace('font_color_blue','');//移除自己这个样式不显示

                        thisEle.className = 'problem_bar_part font_color_blue';//当前点击的事件增加这个样式显示

                    }

                }else {

                    thisEle.className = 'problem_bar_part font_color_blue';//当前点击的事件增加这个样式显示

                }

                //点击时，切换内容
                if (document.getElementsByClassName('show')[0]) { //自己有这个样式的时候显示

                    if (closeElement[rightIndex].className.indexOf('show')>-1){


                    }else {

                        document.getElementsByClassName('show')[0].className=document.getElementsByClassName('show')[0].className.replace('show','');//移除自己这个样式不显示

                        closeElement[rightIndex].className = 'pull_things show';//当前点击的事件增加这个样式显示

                    }


                }else {

                    closeElement[rightIndex].className = 'pull_things show';//加载时没有的时候，自己增加这个样式显示

                }


            },false)

        }

    }

}