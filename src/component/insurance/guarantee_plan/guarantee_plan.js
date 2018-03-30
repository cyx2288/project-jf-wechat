//点击保项展开，收起
var hideDetail= {

    blockDetail:function () {

        var clickThings = document.getElementsByClassName('all_plan_things');

        var closeDetail = document.getElementsByClassName('none_things_detail');

        for (var i=0;i<clickThings.length;i++) {

            clickThings[i].addEventListener('click',function () {

                var thisEle=this;

                var rightIndex = test();
                console.log(rightIndex);

                function test() {

                    for (var j=0;j<clickThings.length;j++) {

                        if (thisEle==clickThings[j]) {

                            return j;
                        }

                    }

                }


                if (document.getElementsByClassName('block_things_detail')[0]) { //自己有这个样式的时候显示

                    if (closeDetail[rightIndex].className.indexOf('block_things_detail')>-1){

                        document.getElementsByClassName('block_things_detail')[0].className=document.getElementsByClassName('block_things_detail')[0].className.replace('block_things_detail','');//自己移除这个样式不显示

                    }else {

                        document.getElementsByClassName('block_things_detail')[0].className=document.getElementsByClassName('block_things_detail')[0].className.replace('block_things_detail','');//移除自己这个样式不显示

                        closeDetail[rightIndex].className = 'none_things_detail block_things_detail';//当前点击的事件增加这个样式显示

                    }


                }else {

                    closeDetail[rightIndex].className = 'none_things_detail block_things_detail';//加载时没有的时候，自己增加这个样式显示

                }

            },false)

        }

    }

}