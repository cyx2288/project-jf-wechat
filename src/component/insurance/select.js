var allSelectEle=document.getElementsByTagName('select');
for(var i=0;i<allSelectEle.length;i++){
    allSelectEle[i].addEventListener("change",function(){
        this.style.color="#4a4a4a"
    },false);

    allSelectEle[i].addEventListener("focus",function(){
       // this.getElementsByClassName('showoptionstips')[0].style.display="none";
    },false);

}
