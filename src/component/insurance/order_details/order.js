

var orderStatuChange={


    editFn:function () {


        var editBtn=document.getElementsByClassName('order_edit');

        var allInput=document.getElementsByClassName('edit_insured_input');

        var deleteBtn=document.getElementsByClassName('delete_btn');

        var deleteInfo=document.getElementsByClassName('delete_person_information');


        //编辑
        for(var i =0;i<editBtn.length;i++){

            editBtn[i].addEventListener('click',function () {

                editBtn[0].style.display='none';

                editBtn[1].style.display='none';

                document.getElementsByClassName('add_people')[0].style.display='block';

                for(var j=0;j<allInput.length;j++){

                    allInput[j].removeAttribute('readonly')

                };

                for(var j=0;j<deleteBtn.length;j++){

                    deleteInfo[j].style.width='90%';

                    deleteBtn[j].style.display='block';

                };

                document.getElementsByClassName('move_btn')[0].className=document.getElementsByClassName('move_btn')[0].className.replace('move_btn','')

                document.getElementById('cancle_btn').className=document.getElementById('cancle_btn').className+' move_btn';

            },false)

        };



        //保存

        document.getElementById('save_btn').addEventListener('click',function () {

            document.getElementsByClassName('move_btn')[0].className=document.getElementsByClassName('move_btn')[0].className.replace('move_btn','')

            this.className=this.className+' move_btn'

            document.getElementsByClassName('order_edit')[0].style.display='block';

            document.getElementsByClassName('order_edit')[1].style.display='block';

            document.getElementsByClassName('add_people')[0].style.display='none';

            for(var j=0;j<allInput.length;j++){

                allInput[j].setAttribute('readonly','readonly')

            };

            for(var j=0;j<deleteBtn.length;j++){

                deleteInfo[j].style.width='100%';

                deleteBtn[j].style.display='none';

            };

        },false)




    }




}