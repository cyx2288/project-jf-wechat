/**
 * Created by Qiaodan on 2017/6/21.
 */

var handmove={

    canmove:{

        'move':true

    },
    init:function(){
        //判断是否是手机晃动事件
        if (window.DeviceOrientationEvent) {

            window.addEventListener('deviceorientation', this.mobileMove.bind(this), false);

        }
    },
    mobileMove:function(event){

        var event=event||window.event;

        var delG = event.gamma;    // gamma轴偏转角(绕y轴旋转的角度)(x的移动距离)

        if(delG&&this.canmove.move){

            this.gamma=event.gamma;

            this.canmove.move=false

        }

        if(delG!=null){

            var thisProgressBar=document.getElementsByClassName('change_bar')[0];//进度条

            var thisHourGlass=document.getElementsByClassName('market_banner')[0];

            var thisMoveDistance=(delG-this.gamma)/3;//获取移动距离；

            var thisEleWidth=thisProgressBar.offsetWidth;

            var thisWindowWidth=window.innerWidth;

            //进度条变化
            if(thisEleWidth+thisMoveDistance/4<=thisWindowWidth){


                if(Math.abs(delG-this.gamma)<=60){

                    thisProgressBar.style.width=thisEleWidth+thisMoveDistance/4+'px';

                }else {
                    thisProgressBar.style.width=thisEleWidth+thisMoveDistance/8+'px';

                }

            }

            //沙漏变化

            if(thisEleWidth<thisWindowWidth/2){

                thisHourGlass.className="market_banner";

            }else {
                thisHourGlass.className="market_banner change"
            }

        }

    },

}
