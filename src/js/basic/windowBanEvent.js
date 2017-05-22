

//禁用默认浏览器事件
//禁止所有事件
var windowBanEvent = {

    bundling: function () {
        var _self = this;
        $(window).bind('click touchstart touchmove touchend ', _self.Canceling);//绑定禁止事件
    },

    unbundling: function () {
        var _self = this;
        $(window).unbind('click touchstart touchmove touchend ', _self.Canceling);//解除绑定事件

    },

    Canceling: function (evt) {

        var evt = evt || window.event; //阻止事件
        if (evt.preventDefault) {
            evt.preventDefault();
            evt.stopPropagation();
        } else {
            evt.returnValue = false;
            evt.cancelBubble = true;
        }
    },

};