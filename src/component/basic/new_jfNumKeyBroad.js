/*数字金额键盘
 2017/3/10
 谯丹*/

var jfNumKeybroad={

    keyBroadShow:function(details){

        var _this=this;

        _this.MaxNum=details.MaxNum|| 15;//键盘可以输入的最大位数

        _this.saveInput=details.saveInput || 0;//存入键盘的值，input元素的class选择器

        _this.showNumEle=details.showNumEle || 'keyNumshow';//点击出现键盘的元素，并且存储数字，ID选择器

        _this.saveNumEle=details.saveNumEle||0;//用于显示当前金额的值的元素，用于判断光标，class选择器

        _this.hideButton=details.hideButton || 0;//其他的关闭按钮

        _this.otherHideButton=details.otherHideButton||0;//其他的关闭按钮

        _this.clearButton=details.clearButton || 'clear_button';//清除数字按钮


        /*键盘出现*/
        _this.run=function(){


            var thisKeybroadNum="";//数字输入

            for(var i=1;i<10;i++){

                thisKeybroadNum+='<a class="weui_grid" data-value='+i+'><p class="weui_grid_label">'+i+'</p></a>'
            }


            //插入html部分
            var divInner='<div class="weui_actionsheet" id="weui_actionsheet_keyboard"><div class="weui_grids weui_grids_kj">'+thisKeybroadNum+'<a class="weui_grid" data-value="."><p class="weui_grid_label"> .</p></a><a class="weui_grid weui_grid_0" data-value="0"><p class="weui_grid_label"> 0</p></a></div><div class="weui_actionsheet_check"><div class="weui_grids"><a class="weui_grid" id="actionsheet_delete"><p class="weui_grid_label"><span class="actionsheet_delete_icon"></span></p></a><a class="weui_grid" id="actionsheet_cancel"><p class="weui_grid_label"><span class="actionsheet_cancel_icon"></span></p></a><a class="weui_grid weui_grid_labelCheckAll" id="actionsheet_check"><p class="weui_grid_label weui_grid_labelCheck"> 确认</p></a></div></div></div>';

            if(!document.getElementById('jf_num_keybroad')){//如果当前页面中没有键盘，则添加元素，键盘移除，所有绑定事件取消

                addEle("div", 0, "jf_num_keybroad","jf_num_keybroad", divInner);

                setTimeout(function(){

                    document.getElementById('jf_num_keybroad').getElementsByClassName('weui_actionsheet')[0].className="weui_actionsheet"
                },10);

                setTimeout(function(){

                    document.getElementById('jf_num_keybroad').getElementsByClassName('weui_actionsheet')[0].className="weui_actionsheet weui_actionsheet_toggle"
                },30);


                var thisAllNum=document.getElementsByClassName('weui_grids_kj')[0].getElementsByClassName('weui_grid');//获取所有可输入的键盘值

                var thisInputEle=document.getElementById(_this.saveInput);//input框，存去具体金额

                var showNumEle=document.getElementById( _this.showNumEle);//显示当前输入金额的元素

                var clearButton=document.getElementsByClassName(_this.clearButton)[0];//清空数值按钮

                /*键盘数字监听，添加金额*/
                for(var i=0;i<thisAllNum.length;i++){


                    if(browser.os.android||browser.os.iOS){//判断是否是移动端
                        thisAllNum[i].addEventListener('touchstart',function(){

                            getALLNum(this);//应该输入的正确的值

                        },false)
                    }
                    else {//如果是PC端
                        thisAllNum[i].addEventListener('click',function(){

                            getALLNum(this);//应该输入的正确的值

                        },false)
                    }


                }

                /*删除事件*/
                document.getElementById('actionsheet_delete').addEventListener("touchstart",DeleteThisEle,false);//键盘上的删除键

                /*一键清空数值*/
                if(clearButton){
                    clearButton.addEventListener('click',function(){

                        showNumEle.innerHTML="";//插入元素为空

                        showNumEle.className=""+_this.saveNumEle+" focusing";//光标位于当前父元素

                        getmoneynum()

                    },false);
                }


                /*-----------------------------点击键盘首次出现,光标产生*/
                showCursor();

            }else {//点击整个DIV元素时，光标位于最后

                var showNumEle=document.getElementById( _this.showNumEle);//显示当前输入金额的元素

                if(showNumEle.getElementsByClassName('focusing')[0]){

                    showNumEle.getElementsByClassName('focusing')[0].className="";
                }

                showCursor();
            }

            /*添加元素*/
            function addEle(eleType,thisType,thisId,thisclass,htmlInner){

                var obj=document.createElement(eleType);//创建元素

                if(thisType){
                    obj.type=thisType
                }

                if(thisId){
                    obj.id=thisId
                }

                if(thisclass){
                    obj.className=thisclass
                }

                obj.innerHTML=htmlInner;

                document.body.appendChild(obj);//body中插入元素

            }


            /*-----------------------------点击键盘首次出现,光标产生*/
            function showCursor(){

                if(showNumEle.children.length>0){//当前有无金额插入

                    var thisChildlength=showNumEle.children.length;

                    showNumEle.children[thisChildlength-1].className="focusing";//光标位于最后一个子元素
                }
                else {
                    showNumEle.className=""+_this.saveNumEle+" focusing";//否则位于当前父元素
                }

            }

            /*-------------------------------------------获取正确的输入值以及插入元素*/
            function getALLNum(obj) {

                var thisInnerNum=showNumEle.innerText;//获取当前已经存在的所有值
                /*输入金额判断*/
                if (thisInnerNum.length < _this.MaxNum) {//设定输入金额的最大位数

                    var thisFocusingEle=document.getElementsByClassName('focusing')[0];

                    var thisfocusEleIndex=thisInnerNum.indexOf(thisFocusingEle.innerHTML);//获取光标元素的索引

                    var thisAllSpan=showNumEle.getElementsByTagName('span');

                    var thisdatavalue = obj.getAttribute('data-value');//当前点击的数值

                    var spanEle=document.createElement('span');//新增元素

                    spanEle.setAttribute('class','focusing');

                    if(thisInnerNum.length==0 && thisdatavalue=="."){//首位不能是小数点

                    }else if(thisInnerNum=='0' && thisdatavalue!='.'){//首位是0，第二位默认是.

                        thisdatavalue = ".";

                        insertELE()
                    }
                    else if(thisInnerNum.indexOf(".")>0 && thisdatavalue==".") {//小数点存在，不能有2个小数点

                    }else if(thisInnerNum.indexOf(".")>0 && (thisInnerNum.length-thisInnerNum.indexOf(".")>2)){//小数点后面的只能有2位数

                        for(var i=0;i<thisAllSpan.length;i++){

                            if(thisAllSpan[i]==thisFocusingEle){

                                break
                            }

                        }
                        if(i<=thisInnerNum.indexOf(".")){//判断插入的位置，如果位于光标的位置在小数点前面

                            insertELE()
                        }

                    }
                    else {
                        insertELE()
                    }

                }

                /*插入元素的方法*/
                function insertELE(){


                    spanEle.innerHTML=thisdatavalue;

                    if(showNumEle.className==""+_this.saveNumEle+" focusing"){//没有其他元素存在

                        showNumEle.className=""+_this.saveNumEle+"";

                        showNumEle.appendChild(spanEle);

                    }else {
                        showNumEle.insertBefore(spanEle,thisFocusingEle.nextElementSibling);//光标旁边插入元素

                        thisFocusingEle.className=""
                    }

                    /*插入数字后，绑定光标位置切换事件*/
                    spanEle.addEventListener("touchstart",changeFocusing,false);//点击切换光标位置

                }

                getmoneynum();//存取金额

            }

            /*-------------------------------------------------------点击任意元素切换光标位置*/
            function changeFocusing(event){

                var evt = event || window.event;

                var srcclickspan = evt.target || evt.srcElement;


                var thisOffsetLeft=srcclickspan.getBoundingClientRect().left;//当前元素距离左边屏幕的距离

                var thisTouchesClientX=parseInt(evt.touches[0].clientX);//当前点击事件距离左边屏幕的距离

                var thistouchX=thisTouchesClientX-thisOffsetLeft;//当前点击点在元素中的的位置

                var thisFocusingEle=showNumEle.getElementsByClassName('focusing')[0];//找到当前带有光标的元素,排除父元素

                if(thisFocusingEle){

                    if(thisFocusingEle.innerHTML==""){//判断是否是位于首位新插入的空元素
                        removeEle(thisFocusingEle)
                    }
                    thisFocusingEle.className="";//当前元素清除光标

                    if(thistouchX > (srcclickspan.offsetWidth / 2)){//如果点击点的距离大于该元素自身宽度的三分之一

                        srcclickspan.className="focusing";//当前元素添加光标

                    }else {

                        if(srcclickspan.previousSibling){//如果前一个元素存在，则添加光标

                            srcclickspan.previousElementSibling.className="focusing"

                        }else {//当点击的是第一位元素，并且在数字的头部，添加光标，新增元素

                            var newNode = document.createElement("span");

                            srcclickspan.parentElement.insertBefore(newNode,srcclickspan);

                            srcclickspan.parentElement.firstElementChild.className="focusing";

                        }
                    }

                    evt.stopPropagation();//阻止冒泡与默认行为,只用于目前已经有光标存在

                    evt.preventDefault()

                }



            }

            /*------------------------------------删除元素时，光标跟随移动*/
            function DeleteThisEle(){

                var thisFocusingEle=showNumEle.getElementsByClassName('focusing')[0];//找到当前带有光标的元素,排除父元素

                if(thisFocusingEle){//判断当前子元素是否还存在，存在则可以删除

                    if(thisFocusingEle.previousElementSibling){//如果上一位同胞元素存在，则添加光标

                        thisFocusingEle.previousElementSibling.className="focusing";

                    }else {//如果当前已经清楚到最后一个元素，添加元素

                        if(showNumEle.children){

                            var newNode = document.createElement("span");

                            thisFocusingEle.parentElement.insertBefore(newNode,thisFocusingEle);

                            thisFocusingEle.parentElement.firstElementChild.className="focusing";

                        }else {
                            showNumEle.className=""+_this.saveNumEle+" focusing";//否则父元素添加光标
                        }

                    }

                    removeEle(thisFocusingEle);//删除当前元素

                }

                getmoneynum()

            }

            //--------------存储整个数字金额
            function getmoneynum(){

                if(clearButton){

                    if(!showNumEle.innerText){//判断清除按钮的显示
                        clearButton.style.display="none"
                    }else {
                        clearButton.style.display="block"
                    }
                }

                if(thisInputEle){

                    thisInputEle.value=showNumEle.innerText;//设置input的值

                }

                showNumEle.setAttribute('data-money',showNumEle.innerText);//设置私有属性存储值

            }


            /*点击键盘的关闭或确认按钮，收回键盘且删除*/
            document.getElementById('actionsheet_cancel').addEventListener("click",function(){
                _this.stop()
            },false);

            document.getElementById('actionsheet_check').addEventListener("click",function(){
                _this.stop()
            },false);



            /*单页应用中，描点变化，键盘关闭*/
            window.addEventListener('hashchange',function(){
                _this.stop();
            },false)



        };


        /*键盘关闭*/
        _this.stop=function(){


            if(document.getElementById('jf_num_keybroad')){/*当前键盘存在*/

                document.getElementById('jf_num_keybroad').getElementsByClassName('weui_actionsheet')[0].className="weui_actionsheet";//键盘先收回去

                /*光标移除*/
                var thisFocusingEle=document.getElementsByClassName('focusing')[0];//找到当前带有光标的元素

                if(thisFocusingEle){

                    if(thisFocusingEle.className==""+_this.saveNumEle+" focusing"){//判断带光标的元素

                        thisFocusingEle.className=""+_this.saveNumEle+""
                    }else {
                        thisFocusingEle.className=""
                    }

                }

                setTimeout(function(){

                    removeEle(document.getElementById('jf_num_keybroad'));//删除键盘

                },300)
            }

        };


        /*删除元素*/
        function removeEle(_element){

            if(_element){

                _element.parentNode.removeChild(_element)

            }

        }


        document.getElementById(_this.showNumEle).addEventListener("click",function(evt){

            var evt = event || window.event;

            evt.stopPropagation();

            _this.run();

        });

        /*点击关闭按钮，键盘收回并且删除键盘*/

        if(_this.hideButton){//如果存在其他关闭按钮

            document.getElementsByClassName(_this.hideButton)[0].addEventListener("click",function(){

                _this.stop()

            },false)
        }

        if(_this.otherHideButton){//如果存在其他关闭按钮

            document.getElementsByClassName(_this.otherHideButton)[0].addEventListener("click",function(){

                _this.stop()

            },false)
        }





    }

};


/*键盘模块结束*/
