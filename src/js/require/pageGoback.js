var jfSwitch={
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
    }
}