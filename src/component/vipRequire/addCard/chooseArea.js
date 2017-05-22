/**
 * Created by Qiaodan on 2017/4/17.
 */


//-------------------------------/*下拉选择银行卡以及地区选择开始*/

function selectAreaBank(){


    /*
     * LArea城市选择控件
     *
     *
     */
    window.LArea = (function () {
        var MobileArea = function () {
            this.gearArea;
            this.data;
            this.index = 0;
            this.value = [0, 0, 0];
            this.type = '1';
            this.returnNum;                                                                                               //是否选择过地址 判断
        };
        MobileArea.prototype = {
            init: function (params) {
                this.returnValue = 0;                                                                                     //初始未使用
                this.params = params;
                this.trigger = document.querySelector(params.trigger);
                if (params.valueTo) {
                    this.valueTo = document.querySelector(params.valueTo);
                }
                this.keys = params.keys;
                this.type = params.type || 1;
                switch (this.type) {
                    case 1:
                    case 2:
                        break;
                    default:
                        throw new Error('错误提示: 没有这种数据源类型');
                        break;
                }
                this.bindEvent();
            },
            getData: function (callback) {
                var _self = this;
                if (typeof _self.params.data == "object") {
                    _self.data = _self.params.data;
                    callback();
                } else {
                    var xhr = new XMLHttpRequest();
                    xhr.open('get', _self.params.data);
                    xhr.onload = function (e) {
                        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
                            var responseData = JSON.parse(xhr.responseText);
                            _self.data = responseData.data;
                            if (callback) {
                                callback()
                            }
                            ;
                        }
                    }
                    xhr.send();
                }
            },
            bindEvent: function () {
                var _self = this;
                //呼出插件
                function popupArea(e) {
                    _self.gearArea = document.createElement("div");
                    _self.gearArea.className = "gearArea";
                    _self.gearArea.innerHTML = '<div class="area_ctrl slideInUp">' +
                        '<div class="area_btn_box">' +
                        '<div class="area_btn larea_cancel">取消</div>' +
                        '<div class="area_btn larea_finish">确定</div>' +
                        '</div>' +
                        '<div class="area_roll_mask">' +
                        '<div class="area_roll">' +
                        '<div>' +
                        '<div class="gear area_province" data-areatype="area_province"></div>' +
                        '<div class="area_grid">' +
                        '</div>' +
                        '</div>' +
                        '<div>' +
                        '<div class="gear area_city" data-areatype="area_city"></div>' +
                        '<div class="area_grid">' +
                        '</div>' +
                        '</div>' +
                        '<div>' +
                        '<div class="gear area_county" data-areatype="area_county"></div>' +
                        '<div class="area_grid">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    document.body.appendChild(_self.gearArea);
                    areaCtrlInit();
                    var larea_cancel = _self.gearArea.querySelector(".larea_cancel");
                    larea_cancel.addEventListener('click', function (e) {
                        _self.close(e);
                    });
                    larea_cancel.addEventListener('touchstart', function (e) {
                        _self.close(e);
                    });
                    var larea_finish = _self.gearArea.querySelector(".larea_finish");
                    larea_finish.addEventListener('click', function (e) {
                        _self.finish(e);
                    });
                    var larea_finish = _self.gearArea.querySelector(".larea_finish");
                    larea_finish.addEventListener('touchstart', function (e) {
                        _self.finish(e);
                    });
                    var area_province = _self.gearArea.querySelector(".area_province");
                    var area_city = _self.gearArea.querySelector(".area_city");
                    var area_county = _self.gearArea.querySelector(".area_county");
                    /*整体元素向下移动*/

                    var $inputAdress = $('#input_city_touch');                    //输入匡位置
                    var offSetTop = $inputAdress.offset().top;                    //元素到文档顶部位置
                    var windowHeight = $(window).height();                          //屏幕高度
                    var scrollTop = $(document).scrollTop();                        //滚动条位置


                    var topPosition = -(offSetTop - scrollTop - (windowHeight - 130) / 2);      // 最终位置=  0- (输入框到文档顶部位置 - 滚动条位置 -（屏幕高度 - 弹出的上拉匡的高度/2）/2)
                    if(topPosition>0){

                        topPosition=-topPosition
                    }

                    $('.add_bank_card').css({
                        'transition': '.3s',
                        '-webkit-transition':'.3s',
                        'transform': 'translateY(' + topPosition + 'px)',
                        '-webkit-transform': 'translateY(' + topPosition + 'px)',

                    });
                    /*整体元素向下移动结束*/


                    area_province.addEventListener('touchstart', gearTouchStart);
                    area_city.addEventListener('touchstart', gearTouchStart);
                    area_county.addEventListener('touchstart', gearTouchStart);
                    area_province.addEventListener('touchmove', gearTouchMove);
                    area_city.addEventListener('touchmove', gearTouchMove);
                    area_county.addEventListener('touchmove', gearTouchMove);
                    area_province.addEventListener('touchend', gearTouchEnd);
                    area_city.addEventListener('touchend', gearTouchEnd);
                    area_county.addEventListener('touchend', gearTouchEnd);
                }

                //初始化插件默认值
                function areaCtrlInit() {
                    _self.gearArea.querySelector(".area_province").setAttribute("val", _self.value[0]);
                    _self.gearArea.querySelector(".area_city").setAttribute("val", _self.value[1]);
                    _self.gearArea.querySelector(".area_county").setAttribute("val", _self.value[2]);

                    switch (_self.type) {
                        case 1:
                            _self.setGearTooth(_self.data);
                            break;
                        case 2:
                            _self.setGearTooth(_self.data[0]);
                            break;
                    }
                }

                //触摸开始
                function gearTouchStart(e) {
                    e.preventDefault();
                    var target = e.target;
                    while (true) {
                        if (!target.classList.contains("gear")) {
                            target = target.parentElement;
                        } else {
                            break
                        }
                    }
                    clearInterval(target["int_" + target.id]);
                    target["old_" + target.id] = e.targetTouches[0].screenY;
                    target["o_t_" + target.id] = (new Date()).getTime();
                    var top = target.getAttribute('top');
                    if (top) {
                        target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
                    } else {
                        target["o_d_" + target.id] = 0;
                    }
                    target.style.webkitTransitionDuration = target.style.transitionDuration = '0ms';
                }

                //手指移动
                function gearTouchMove(e) {
                    e.preventDefault();
                    var target = e.target;
                    while (true) {
                        if (!target.classList.contains("gear")) {
                            target = target.parentElement;
                        } else {
                            break
                        }
                    }
                    target["new_" + target.id] = e.targetTouches[0].screenY;
                    target["n_t_" + target.id] = (new Date()).getTime();
                    var f = (target["new_" + target.id] - target["old_" + target.id]) * 9 / window.innerHeight;
                    target["pos_" + target.id] = target["o_d_" + target.id] + f;
                    target.style["-webkit-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
                    target.setAttribute('top', target["pos_" + target.id] + 'em');
                    if (e.targetTouches[0].screenY < 1) {
                        gearTouchEnd(e);
                    }
                    ;
                }

                //离开屏幕
                function gearTouchEnd(e) {
                    e.preventDefault();
                    var target = e.target;
                    while (true) {
                        if (!target.classList.contains("gear")) {
                            target = target.parentElement;
                        } else {
                            break;
                        }
                    }
                    var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
                    if (Math.abs(flag) <= 0.2) {
                        target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
                    } else {
                        if (Math.abs(flag) <= 0.5) {
                            target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
                        } else {
                            target["spd_" + target.id] = flag / 2;
                        }
                    }
                    if (!target["pos_" + target.id]) {
                        target["pos_" + target.id] = 0;
                    }
                    rollGear(target);
                }

                //缓动效果
                function rollGear(target) {
                    var d = 0;
                    var stopGear = false;

                    function setDuration() {
                        target.style.webkitTransitionDuration = target.style.transitionDuration = '200ms';
                        stopGear = true;
                    }

                    clearInterval(target["int_" + target.id]);
                    target["int_" + target.id] = setInterval(function () {
                        var pos = target["pos_" + target.id];
                        var speed = target["spd_" + target.id] * Math.exp(-0.03 * d);
                        pos += speed;
                        if (Math.abs(speed) > 0.1) {
                        } else {
                            var b = Math.round(pos / 2) * 2;
                            pos = b;
                            setDuration();
                        }
                        if (pos > 0) {
                            pos = 0;
                            setDuration();
                        }
                        var minTop = -(target.dataset.len - 1) * 2;
                        if (pos < minTop) {
                            pos = minTop;
                            setDuration();
                        }
                        if (stopGear) {
                            var gearVal = Math.abs(pos) / 2;
                            setGear(target, gearVal);
                            clearInterval(target["int_" + target.id]);
                        }
                        target["pos_" + target.id] = pos;
                        target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'em,0)';
                        target.setAttribute('top', pos + 'em');
                        d++;
                    }, 10);
                }

                //控制插件滚动后停留的值
                function setGear(target, val) {
                    val = Math.round(val);
                    target.setAttribute("val", val);
                    switch (_self.type) {
                        case 1:
                            _self.setGearTooth(_self.data);
                            break;
                        case 2:
                            switch (target.dataset['areatype']) {
                                case 'area_province':
                                    _self.setGearTooth(_self.data[0]);
                                    break;
                                case 'area_city':
                                    var ref = target.childNodes[val].getAttribute('ref');
                                    var childData = [];
                                    var nextData = _self.data[2];
                                    for (var i in nextData) {
                                        if (i == ref) {
                                            childData = nextData[i];
                                            break;
                                        }
                                    }
                                    ;
                                    _self.index = 2;
                                    _self.setGearTooth(childData);
                                    break;
                            }
                    }

                }

                _self.getData(function () {
                    _self.trigger.addEventListener('click', popupArea);
                });
            },
            //重置节点个数
            setGearTooth: function (data) {
                var _self = this;
                var item = data || [];
                var l = item.length;
                var gearChild = _self.gearArea.querySelectorAll(".gear");
                var gearVal = gearChild[_self.index].getAttribute('val');
                var maxVal = l - 1;
                if (gearVal > maxVal) {
                    gearVal = maxVal;
                }
                gearChild[_self.index].setAttribute('data-len', l);
                if (l > 0) {
                    var id = item[gearVal][this.keys['id']];
                    var childData;
                    switch (_self.type) {
                        case 1:
                            childData = item[gearVal].child
                            break;
                        case 2:
                            var nextData = _self.data[_self.index + 1]
                            for (var i in nextData) {
                                if (i == id) {
                                    childData = nextData[i];
                                    break;
                                }
                            }
                            ;
                            break;
                    }
                    var itemStr = "";
                    for (var i = 0; i < l; i++) {
                        itemStr += "<div class='tooth'  ref='" + item[i][this.keys['id']] + "'>" + item[i][this.keys['name']] + "</div>";
                    }
                    gearChild[_self.index].innerHTML = itemStr;
                    gearChild[_self.index].style["-webkit-transform"] = 'translate3d(0,' + (-gearVal * 2) + 'em,0)';
                    gearChild[_self.index].setAttribute('top', -gearVal * 2 + 'em');
                    gearChild[_self.index].setAttribute('val', gearVal);
                    _self.index++;
                    if (_self.index > 2) {
                        _self.index = 0;
                        return;
                    }
                    _self.setGearTooth(childData);
                } else {
                    gearChild[_self.index].innerHTML = "<div class='tooth'></div>";
                    gearChild[_self.index].setAttribute('val', 0);
                    if (_self.index == 1) {
                        gearChild[2].innerHTML = "<div class='tooth'></div>";
                        gearChild[2].setAttribute('val', 0);
                    }
                    _self.index = 0;
                }
            },
            finish: function (e) {
                var _self = this;
                var area_province = _self.gearArea.querySelector(".area_province");
                var area_city = _self.gearArea.querySelector(".area_city");
                var area_county = _self.gearArea.querySelector(".area_county");
                var provinceVal = parseInt(area_province.getAttribute("val"));
                var provinceText = area_province.childNodes[provinceVal].textContent;
                var provinceCode = area_province.childNodes[provinceVal].getAttribute('ref');
                var cityVal = parseInt(area_city.getAttribute("val"));
                var cityText = area_city.childNodes[cityVal].textContent;
                var cityCode = area_city.childNodes[cityVal].getAttribute('ref');
                var countyVal = parseInt(area_county.getAttribute("val"));
                var countyText = area_county.childNodes[countyVal].textContent;
                var countyCode = area_county.childNodes[countyVal].getAttribute('ref');
                _self.trigger.value = provinceText + ((cityText) ? (',' + cityText) : ('')) + ((countyText) ? (',' + countyText) : (''));
                _self.value = [provinceVal, cityVal, countyVal];
                if (this.valueTo) {
                    this.valueTo.value = provinceCode + ((cityCode) ? (',' + cityCode) : ('')) + ((countyCode) ? (',' + countyCode) : (''));
                }
                _self.close(e);

                _self.returnValue = 1;                                                                                       //使用后打开

                // exchangeButton();                                                                                            //判断是否打开按钮

            },
            close: function (e) {
                e.preventDefault();
                var _self = this;
                var evt = new CustomEvent('input');
                _self.trigger.dispatchEvent(evt);
                document.body.removeChild(_self.gearArea);
                /*还原*/
                $('.add_bank_card').css({
                    'transform': 'translateY(' + 0 + 'px)',
                    '-webkit-transform':'translateY(' + 0 + 'px)'
                });

            }
        };
        return MobileArea;
    })();


//城市选择结束





//增加active事件
    document.addEventListener('touchstart', function () {
    }, false);

    //第一次导入


//-----------------------------------------------------------------------------------------------------------------------导入地址选择数据
    selectOptionInput('#city_pc_select select:eq(0)', LAreaData);


    function selectOptionInput(thisEle, thisData) {

        var thisOptionEle;
        var CityLength = thisData.length;

        deleteNextSelect(thisEle);

        for (var i = 0; i < CityLength; i++) {

            var thisCity = thisData[i].name;

            thisOptionEle =
                '<option data-num="'
                + i +
                '" value="'
                + thisCity +
                '">'
                + thisCity +
                '</option>';

            $(thisEle).append(thisOptionEle);
        }

    }

//删除后一个select

    function deleteNextSelect(thisEle) {
        var jLenght = $(thisEle).children('option').length;
        for (var j = 0; j < jLenght; j++) {

            if ($(thisEle).children('option').eq(1).attr('data-num')) {
                $(thisEle).children('option').eq(1).remove();
            }
        }
        if ($(thisEle).next()) {
            for (var j = 0; j < $(thisEle).next().children('option').length; j++) {

                if ($(thisEle).next().children('option').eq(1).attr('data-num')) {
                    $(thisEle).next().children('option').eq(1).remove();
                }
            }
        }
    }

//------------------------------------------------------------------------------------------------------------------------select选中触发事件
    $('#city_pc_select select').on('mousedown', function (e) {
        if (1 == e.which) {//只允许左击
            showSelect(this);

        }
        if ($(this).attr('size') == 5) {
            $(this).removeClass('initial');//-------------改变颜色
        }
    });


//------------------------------------------------------------------------------------------------------------------------展开select
    function showSelect(thisEle) {


        var $this = $(thisEle);

        $this.siblings().each(function (index, e) {
            hideSelest($(this));
        });


        var changeI = $this.attr('size');

        if (!changeI) {
            $this.css('height', '12em');
            $this.attr('size', 5);
            $this.parents('.two_input_line').css('z-index', '5');
            $this.parents('.contain').css('overflow', 'visible');
        }
        else {
            setTimeout(
                function () {
                    hideSelest($this)
                },
                100)
        }
    }

//------------------------------------------------------------------------------------------------------------------------隐藏select

    function hideSelest($this) {
        if ($this.attr('size') == 5) {
            $this.removeAttr('size');
            $this[0].style.height = '';
            $this.parents('.two_input_line')[0].style.zIndex = '';
            $this.parents('.contain')[0].style.overflow = '';
            showNextSelect($this);
        }
    }

//------------------------------------------------------------------------------------------------------------------------增加后面一项的option

    function showNextSelect($this) {
        if ($this.index() == 0) {//选择城市
            if ($this.val().indexOf("请选择") < 0) {
                var thisNum = $this.index() + 1;
                var thisCityNum = cityNum($this.val());
                selectOptionInput('#city_pc_select select:eq(' + thisNum + ')', LAreaData[thisCityNum].child);
                $this.attr('data-num', thisCityNum);
            }
            citySelect = 0;
            // exchangeButton();
        }

        else if ($this.index() == 1) {//选择地区

            if ($this.val().indexOf("请选择") >= 0) {
                citySelect = 0;
                //  exchangeButton();
            }
            else {
                var thisNum = $this.index() + 1;
                var thisAreaNum = cityNum($this.val());
                if (LAreaData[$this.prev().attr('data-num')].child[thisAreaNum].child) {
                    selectOptionInput('#city_pc_select select:eq(' + thisNum + ')', LAreaData[$this.prev().attr('data-num')].child[thisAreaNum].child);
                    citySelect = 0;
                    //  exchangeButton();
                }
                else {
                    var thisNum = $this.index() + 1;
                    var text_city = $('#city_pc_select select:eq(0)').val() + ',' + $('#city_pc_select select:eq(1)').val();
                    $('#input_city_touch').val(text_city);
                    citySelect = 1;
                    //  exchangeButton();
                    deleteNextSelect('#city_pc_select select:eq(' + thisNum + ')');
                }
                $this.attr('data-num', thisAreaNum);
            }

        }
        else if($this.val().indexOf('请选择')<0) {//选择具体地方
            var text_city = $('#city_pc_select select:eq(0)').val() + ',' + $('#city_pc_select select:eq(1)').val() + ',' + $('#city_pc_select select:eq(2)').val();
            $('#input_city_touch').val(text_city);
            citySelect = 1;
            //  exchangeButton();
        }


        function cityNum(thisValue) {
            for (var i = 0; i < $this.children('option').length; i++) {
                if (thisValue == $this.children('option')[i].value) {
                    break
                }
            }
            return i - 1;
        }

    }


    var bankCardNum = 0;                                                                                                  //是否输入好银行卡号
    var bankSelect = 0;                                                                                                   //是否输入银行
    var citySelect = 0;
    var windowHeight = $(window).height();                                                                               //屏幕高度


    $('#input_num').bind('keypress', keyPress);

    function keyPress() {
        var keyCode = event.keyCode;
        if ((keyCode >= 48 && keyCode <= 57)) {
            event.returnValue = true;
        }
        else {
            event.returnValue = false;
        }
        exchangeButton()
    }


    // 说明使用过地址选择 未使用过为0
    var area = new LArea();
    area.init({
        'trigger': '#input_city_touch',                                                                                  //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
        'keys': {id: 'id', name: 'name'},                                                                                    //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
        'type': 1,                                                                                                        //数据源类型
        'data': LAreaData                                                                                                 //数据源
    });

    $('#input_city_touch').on('focus', function () {                                                                          //获取焦点后失去焦点，避免误输入
        $(this).blur()
    });




//==---------------------------------------------------------------------------------------------------------------------导入银行
    selectOptionBanks();
    function selectOptionBanks() {
        var i = 0;
        for (var key in banks) {
            var thisOptionEle;
            thisOptionEle =
                '<option data-num="'
                + i +
                '" value="'
                + key +
                '">'
                + key +
                '</option>';

            $('#select_bank').append(thisOptionEle);
            i++;
        }
    }

}

//-------------------------------/*下拉选择银行卡以及地区选择结束*/
