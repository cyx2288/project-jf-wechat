/**
 * Created by Qiaodan on 2017/9/8.
 */


//单页应用通用模块
//陈
var jfSwitch = {


    //返回上一个页面
    goBack: function () {

        var thisurl = window.location.href;//获取当前整个链接

        if (browser.os.android || browser.supplier.wechat) {//判断设备 微信返回键 以及安卓退格键

            var thisurldel = window.location.hash;//#后面的内容

            var thisnewurl = thisurl.replace(thisurldel, '');//去除#后面的内容

            if(thisurldel){//判断当前#后面的内容是否存在

                window.history.go(-1);//先返回一次，然后在判断

                changeUrl(thisnewurl);
            }
            else
            {

                window.history.go(-1);
            }

            function changeUrl(thisnewurl) {

                var thisnewurlChange = window.location.href;//再次获取当前的url地址

                if (thisnewurlChange.indexOf(thisnewurl) > -1) {//如果当前这个链接存在

                    setTimeout(function () {

                        window.history.go(-1);

                        changeUrl(thisnewurl);

                    }, 0)
                }

            }
        }
        else {
            window.history.go(-1)
        }
    },

    //--------------------------------------------------------------------------------------------------------------------设置模块的高度
    sectionSet: function () {
        var _self = this;
        $('section.container_section').windowHeight({
            'fixHeight': 45
        });
        //---------------------------------------------------------------------------------------------------------------安卓设备 物理退格键  或者微信返回键
        if (browser.os.android || browser.supplier.wechat) {

            location.href = "#" + 1;

            setTimeout(function () {

                window.addEventListener('hashchange', pageHashChange, false);

                function pageHashChange() {
                    var hashCode = location.hash;
                    var _id = hashCode.substr(1);//去掉#，获取后面带的参数
                    divchange(_id);

                }

                //div切换触发
                function divchange(_id) {
                    _self.sectionBack(_id);
                    _self.tabBack(_id);
                }
            }, 100)
        }

    },

    //-------------------------------------------------------------------------------------------------------------------单页切入方法

    sectionTabChange: function (x) {
        var _self = this;
        _self.sectionChange(x);
        _self.tabChange(x);
        if (browser.os.android || browser.supplier.wechat) {//安卓设备 物理退格键  或者微信返回键
            location.href = "#" + x;
        }


    },

    //-------------------------------------------------------------------------------------------------------------------单页退出方法
    sectionTabBack: function (x) {
        var _self = this;
        _self.sectionBack(x);
        _self.tabBack(x);
        if (browser.os.android || browser.supplier.wechat) {//安卓设备 物理退格键  或者微信返回键
            location.href = "#" + x;

        }

    },


    /*section模块*/
    //--------------------------------------------------------------------------------------------------------------------切换section页 右进左出 参数为需要打开的页面标注位置 例如1、3、10

    sectionChange: function (thisPageNum) {
        var _self = this;


        var screenWidth = $(window).width();

        $('section.container_section .change_section').each(function (index, e) {//遍历所有section
            //打开需要打开的section
            _self.sectionChangeIn($(this), thisPageNum, 'transtion_section', 'transtion_other_section', 1);

            $(this).width(screenWidth);//兼容ios

        })
    },
    //-------------------------------------------------------------------------------------------------------------------回退section页 左进右出 参数为需要打开的页面标注位置 例如1、3、10
    sectionBack: function (thisPageNum) {
        var _self = this;

        var screenWidth = $(window).width();

        $('section.container_section .change_section').each(function (index, e) {//遍历所有section
            //打开需要打开的section
            _self.sectionChangeIn($(this), thisPageNum, 'transtion_other_section', 'transtion_section', 2);

            $(this).width(screenWidth);//兼容ios

        })
    },

    //-------------------------------------------------------------------------------------------------------------------此函数为提高代码重用性而使用。参数为元素，切换的标注位置，切进class，切出class
    sectionChangeIn: function ($this, thisPageNum, changeClass1, changeClass2, type) {

        //打开目标section
        if ((browser.androidVersion && browser.androidVersion < 5)||(browser.os.iOS && browser.IosVersion.charAt(0) < 9)) {     //如果安卓系统低于5，简单操作
            if ($this.attr('data-page') == thisPageNum) {//找到需要打开的那个section
                $this.addClass('show_section').removeClass('hide_section');
            }

            else if ($this.hasClass('show_section')) {//查找已经打开的的tab
                $this.removeClass('show_section').addClass('hide_section');


            }
        }


        else {

            if ($this.attr('data-page') == thisPageNum) {//找到需要打开的那个section


                $this.removeClass('hide_section').addClass(changeClass1);//移除并等待执行切入过渡
                setTimeout(
                    function () {
                        $this.removeClass(changeClass1).bind('transitionend', changeTranstionThis).bind('webkitTransitionEnd', changeTranstionThis);//延迟后执行切入过渡效果
                        windowBanEvent.bundling();//绑定阻止浏览器默认事件
                    }
                    , 5//因为有延迟，所以不会执行下一步的判断hasclass的操作
                );

                function changeTranstionThis() {//监听过渡完成时并加入class：show_section
                    $this.unbind('transitionend', changeTranstionThis).unbind('webkitTransitionEnd', changeTranstionThis).addClass('show_section');
                    windowBanEvent.unbundling();//解绑阻止浏览器默认事件


                    setTimeout(function () {//兼容ios 导航页会宽度瞬间不定

                        $('section.container_section .change_section').each(function (index, e) {
                            this.style.width = '';
                        });

                        $('nav.Top_navigation .change_tab').each(function (index, e) {
                            this.style.width = '';
                        });

                    }, 100)

                }

            }

            //关闭已经打开的section
            else if ($this.hasClass('show_section')) {//查找已经打开的的tab
                $this.removeClass('show_section').addClass(changeClass2).bind('transitionend', changeTranstionTab).bind('webkitTransitionEnd', changeTranstionTab);//移除并等待执行切出过渡

                function changeTranstionTab() {//监听过渡后的事件
                    $this.addClass('hide_section').removeClass(changeClass2).unbind('transitionend', changeTranstionTab).unbind('webkitTransitionEnd', changeTranstionTab);//过度后移除执行过渡的class，并标记class：hide_section


                }
            }
        }


    },


    /*section模块结束*/


    /*tab模块*/

    //--------------------------------------------------------------------------------------------------------------------切换tab页 右进左出 参数为需要打开的页面标注位置 例如1、3、10

    tabChange: function (thisPageNum) {
        var _self = this;

        var screenWidth = $(window).width();

        $('nav.Top_navigation .change_tab').each(function (index, e) {//遍历所有tab
            //打开需要打开的tab
            _self.tabChangeIn($(this), thisPageNum, 'transtion_tab', 'transtion_other_tab');

            $(this).width(screenWidth);//兼容ios

        })


    },
    //-------------------------------------------------------------------------------------------------------------------回退tab页 左进右出 参数为需要打开的页面标注位置 例如1、3、10
    tabBack: function (thisPageNum) {
        var _self = this;

        var screenWidth = $(window).width();

        $('nav.Top_navigation .change_tab').each(function (index, e) {//遍历所有tab
            //打开需要打开的tab
            _self.tabChangeIn($(this), thisPageNum, 'transtion_other_tab', 'transtion_tab');

            $(this).width(screenWidth);//兼容ios

        })
    },

    //-------------------------------------------------------------------------------------------------------------------此函数为提高代码重用性而使用。参数为元素，切换的标注位置，切进class，切出class
    tabChangeIn: function ($this, thisPageNum, changeClass1, changeClass2) {


        if ((browser.androidVersion && browser.androidVersion < 5)||(browser.os.iOS && browser.IosVersion.charAt(0) < 9)) {//如果安卓系统低于5，简单操作
            if ($this.attr('data-page') == thisPageNum) {//找到需要打开的那个tab

                $this.removeClass('hide_tab').addClass('show_tab')
            }
            else if ($this.hasClass('show_tab')) {//查找已经打开的的tab
                $this.addClass('hide_tab').removeClass('show_tab')
            }

        }

        else {


            //打开目标tab
            if ($this.attr('data-page') == thisPageNum) {//找到需要打开的那个tab
                $this.removeClass('hide_tab').addClass(changeClass1);//移除并等待执行切入过渡
                setTimeout(
                    function () {
                        $this.removeClass(changeClass1).addClass('show_tab');//延迟后执行切入过渡效果，并加入class：show_tab
                    }
                    , 5//因为有延迟，所以不会执行下一步的判断hasclass的操作
                );
            }

            //关闭已经打开的tab
            else if ($this.hasClass('show_tab')) {//查找已经打开的的tab
                $this.removeClass('show_tab').addClass(changeClass2).bind('transitionend', changeTranstionTab).bind('webkitTransitionEnd', changeTranstionTab);//移除并等待执行切出过渡

                function changeTranstionTab() {//监听过渡后的事件
                    $this.addClass('hide_tab').removeClass(changeClass2).unbind('transitionend', changeTranstionTab).unbind('webkitTransitionEnd', changeTranstionTab);//过度后移除执行过渡的class，并标记class：hide_tab

                }
            }
        }

    }

    /*tab模块结束*/


};
//单页应用结束
